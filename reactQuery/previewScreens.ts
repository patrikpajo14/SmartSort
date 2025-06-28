import { useQuery } from "@tanstack/react-query";
import { API_VERSION } from "@/constants/config";
import useProtectedRequestHeaders from "@/hooks/useProtectedRequestHeaders";

const version = API_VERSION;

const fetchHomeScreen = async (
  protectedRequestHeaders: any,
  currentLang: string,
) => {
  try {
    const res = await protectedRequestHeaders.get(`/preview/home`);

    const headers = res.headers;

    console.log("headers", headers);
    console.log("response home screen", res.data);
    if (res.data.code === 200) {
      return {
        data: res.data.data,
        headers: headers,
      };
    } else {
      return {
        data: [],
        headers: headers,
      };
    }
  } catch (error: any) {
    console.log("Error fetching dashboard:", error);
    throw error;
  }
};

export const useFetchHomeScreen = (
  currentLang: string,
  userId: string | undefined,
  isStorageLoading: boolean,
) => {
  const protectedRequestHeaders = useProtectedRequestHeaders();
  return useQuery({
    queryKey: ["home", currentLang],
    queryFn: async () => {
      return fetchHomeScreen(protectedRequestHeaders, currentLang);
    },
    enabled: !isStorageLoading,
  });
};
