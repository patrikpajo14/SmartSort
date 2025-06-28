import { useEffect } from "react";
import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import Toast from "react-native-toast-message";
import { axiosInstance } from "@/axios/axiosInstance";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "@/context/auth/authContext";
import useRefreshToken from "@/hooks/useRefreshToken";
import useCheckExpireTokens from "@/hooks/useCheckExpireTokens";
import useGlobalStore from "@/stores/globalStore";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  headers: any;
  sent?: boolean;
}

const useProtectedRequestHeaders = (): AxiosInstance => {
  const { user, session, isStorageLoading, logoutUser } = useAuthContext();
  const refresh = useRefreshToken();
  const { isTokenExpired, isRefreshTokenExpired } = useCheckExpireTokens(
    session?.expire || "",
    session?.refresh_expire || "",
  );
  const hasHydrated = useGlobalStore((state) => state._hasHydrated);
  const { t } = useTranslation();
  let isLoggingOut = false;
  const logoutUserSafely = async () => {
    if (!isLoggingOut) {
      isLoggingOut = true;
      await logoutUser();
      isLoggingOut = false;
    }
  };
  useEffect(() => {
    if (isStorageLoading || !hasHydrated) {
      return;
    }
    const requestIntercept = axiosInstance.interceptors.request.use(
      async (
        config: CustomAxiosRequestConfig,
      ): Promise<CustomAxiosRequestConfig> => {
        if (!config.headers) {
          config.headers = {};
        }
        if (!session || !user) {
          await logoutUserSafely();
          return config;
        } else {
          if (isTokenExpired) {
            if (isRefreshTokenExpired) {
              await logoutUserSafely();
            } else {
              try {
                const regeneratedTokens = await refresh();
                if (regeneratedTokens?.access_token) {
                  config.headers["Authorization"] =
                    `Bearer ${regeneratedTokens.access_token}`;
                  config.headers["Userid"] = `${user.id}`;
                }
              } catch (error) {
                console.error("Error refreshing token:", error);
              }
            }
          }
        }

        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session.access_token}`;
          config.headers["Userid"] = `${user.id}`;
        }

        return config;
      },
      (error: any) => Promise.reject(error),
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => response,
      async (error: AxiosError): Promise<any> => {
        const prevRequest = error.config as CustomAxiosRequestConfig;
        if (user && error.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
        }
        if (user && error.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          await logoutUserSafely();
          Toast.show({
            type: "error",
            text1: t("auth.session_expired"),
            topOffset: 60,
          });
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [
    session,
    user,
    isTokenExpired,
    isRefreshTokenExpired,
    logoutUser,
    refresh,
    isStorageLoading,
    hasHydrated,
  ]);

  return axiosInstance;
};

export default useProtectedRequestHeaders;
