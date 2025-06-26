import { useEffect } from "react";
import { axiosInstance } from "@/axios/axiosInstance";
import useGlobalStore from "../stores/globalStore";
import { useAuthContext } from "@/context/auth/authContext";

const useInitializeHeaders = () => {
  const { user, session, isStorageLoading } = useAuthContext();
  const hasHydrated = useGlobalStore((state) => state._hasHydrated);
  useEffect(() => {
    const initializeHeaders = () => {
      const existingHeaders = axiosInstance.defaults.headers;

      if (user && !isStorageLoading) {
        if (!existingHeaders["Userid"]) {
          axiosInstance.defaults.headers["Userid"] = `${user.id}`;
        }
      } else {
        delete axiosInstance.defaults.headers["Userid"];
      }

      if (session && !isStorageLoading) {
        if (!existingHeaders["Authorization"]) {
          axiosInstance.defaults.headers["Authorization"] =
            `Bearer ${session.access_token}`;
        }
      } else {
        delete axiosInstance.defaults.headers["Authorization"];
      }
    };

    initializeHeaders();
  }, [user?.id, session?.access_token, hasHydrated]);
};

export default useInitializeHeaders;
