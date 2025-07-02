import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { API_VERSION } from "@/constants/config";

import { axiosInstance } from "@/axios/axiosInstance";
import { useAuthContext } from "@/context/auth/authContext";
import { RegionRequest } from "@/types/global";

const version = API_VERSION;

const fetchLocations = async (
  currentLang: string,
  page: number = 1,
  per_page: number = 5,
  type?: string,
  sort?: string,
) => {
  try {
    let url = `/locations?per_page=${per_page}&page=${page}`;
    if (type) {
      url += `&type=${type}`;
    }
    if (sort) {
      url += `&sort=${sort}`;
    }
    return await axiosInstance.get(url);
  } catch (error: any) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

export const useFetchLocations = (
  currentLang: string,
  isFocused: boolean,
  per_page: number = 5,
  type?: string,
  sort?: string,
  initialPage: number = 1,
) => {
  const { isStorageLoading } = useAuthContext();
  return useInfiniteQuery({
    queryKey: ["locations", currentLang, type, sort],
    queryFn: async ({ pageParam = initialPage }) => {
      const response = await fetchLocations(
        currentLang,
        pageParam,
        per_page,
        type,
        sort,
      );
      return response?.data?.data;
    },
    initialPageParam: initialPage,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < Math.ceil(lastPage.total / lastPage.per_page)) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled: !isStorageLoading && isFocused,
  });
};

const fetchLocationsCoordinates = async (
  currentLang: string,
  region: RegionRequest | null,
) => {
  try {
    //console.log("FETCH LOCATIONS COORDINATES", region);
    return await axiosInstance.post(`/locations/inRegion`, region);
  } catch (error: any) {
    console.error("Error fetching locations coordinates:", error);
    throw error;
  }
};

export const useFetchLocationsCoordinates = (
  currentLang: string,
  region: RegionRequest | null,
  enabled: boolean,
) => {
  const queryClient = useQueryClient();
  const { isStorageLoading } = useAuthContext();
  return useQuery({
    queryKey: ["locations-coordinates", currentLang, region],
    queryFn: async () => {
      return fetchLocationsCoordinates(currentLang, region);
    },
    select: (response) => {
      //console.log("Selected location coordinates:", response?.data);
      if (response?.data.code === 200) {
        return response.data.data;
      } else {
        queryClient.removeQueries({
          queryKey: ["locations-coordinates"],
        });
        return [];
      }
    },
    enabled: !isStorageLoading && enabled,
    staleTime: 0,
  });
};
