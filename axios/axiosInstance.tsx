import axios from "axios";
import { API_URL } from "@/constants/config";
export const axiosInstance = axios.create({
  baseURL: "http://192.168.100.120:8080",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
