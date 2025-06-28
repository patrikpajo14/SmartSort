import { axiosInstance } from "@/axios/axiosInstance";
import { API_VERSION } from "@/constants/config";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/context/auth/authContext";

const version = API_VERSION;

const getALlEducation = async (currentLang: string) => {
  try {
    const response = await axiosInstance.get(`/educations`);
    if (response.data.code === 200) {
      return response.data.data;
    }
  } catch (error: any) {
    console.error("Error fetching educations:", error);
    throw error;
  }
};

const fetchSingleEducation = async (
  currentLang: string,
  id: string | undefined | null,
) => {
  try {
    const response = await axiosInstance.get(`/educations/${id}`);
    if (response.data.code === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Error fetching single education:", error);

    throw error;
  }
};

export const useFetchAllEducations = (currentLang: string) => {
  const { isStorageLoading } = useAuthContext();
  return useQuery({
    queryKey: ["educations", currentLang],
    queryFn: async () => {
      return getALlEducation(currentLang);
    },
    enabled: !isStorageLoading,
    staleTime: 0,
    gcTime: 0,
  });
};

export const useFetchSingleEducation = (
  currentLang: string,
  educationId: string | undefined | null,
) => {
  const { isStorageLoading } = useAuthContext();
  return useQuery({
    queryKey: ["single-education", currentLang, educationId],
    queryFn: async () => {
      return fetchSingleEducation(currentLang, educationId);
    },
    enabled: !!educationId && !isStorageLoading,
    staleTime: 0,
    gcTime: 0,
  });
};
