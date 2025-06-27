import { axiosInstance } from "@/axios/axiosInstance";
import { API_VERSION } from "@/constants/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RecaptchaUserBody } from "@/types/global";

const version = API_VERSION;

const updateUser = async (body: RecaptchaUserBody) => {
  try {
    return await axiosInstance.put(`/users/${body?.id}`, null, {
      params: body?.user,
    });
  } catch (error: any) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const deleteUser = async (currentLang: string, id: string) => {
  try {
    return await axiosInstance.delete(`/users/${id}`);
  } catch (error: any) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const useUpdateUser = (currentLang: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: RecaptchaUserBody) => {
      return updateUser(body);
    },
    onSuccess: async (response) => {
      if (response.data.code === 200) {
        await queryClient.invalidateQueries({
          queryKey: ["user"],
        });
      }
      return response;
    },
  });
};

export const useDeleteUsers = (currentLang: string) => {
  return useMutation({
    mutationFn: async (id: string) => {
      return deleteUser(currentLang, id);
    },
  });
};
