import { Location } from "@/types/global";
import icons from "@/constants/icons";

export const API_URL = process.env.EXPO_PUBLIC_API_URL;
export const ROBOFLOW_API = process.env.EXPO_PUBLIC_ROBOFLOW_API;
export const ANDROID_MAP_KEY =
  process.env.EXPO_PUBLIC_ANDROID_GOOGLE_MAPS_API_KEY;
export const API_VERSION = process.env.EXPO_PUBLIC_API_VERSION;
export const API_LANG = process.env.EXPO_PUBLIC_API_LANG;
export const CURRENT_WALKTHROUGH_VERSION = "1.0.0";
export const DEV_PIN = process.env.EXPO_PUBLIC_DEV_PIN;

export const ENVIRONMENT = process.env.EXPO_PUBLIC_ENVIRONMENT ?? "";

export const CLOUDINARY_URL = process.env.EXPO_PUBLIC_CLOUDINARY_URL;
export const CLOUDINARY_CLOUD_NAME =
  process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_UPLOAD_PRESET = "expo_unsigned";
