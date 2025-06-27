import { useState } from "react";
import useGlobalStore from "../stores/globalStore";
import Toast from "react-native-toast-message";
import { axiosInstance } from "@/axios/axiosInstance";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "@/context/auth/authContext";

export const useLogout = () => {
  const { logoutUser } = useAuthContext();
  const serverUrl = useGlobalStore((state) => state.serverUrl);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/auth/logout`);
      console.log("LOGOUT", response.data);
      if (response.data?.code === 200) {
        delete axiosInstance.defaults.headers["Userid"];
        delete axiosInstance.defaults.headers["Authorization"];
        await logoutUser();
        Toast.show({
          type: "success",
          text1: t("general.logout_success"),
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t("form.general_error"),
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogout, isLoading };
};

export default useLogout;
