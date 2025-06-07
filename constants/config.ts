import { Location } from "@/types/global";

export const API_URL = process.env.EXPO_PUBLIC_API_URL;
export const API_VERSION = process.env.EXPO_PUBLIC_API_VERSION;
export const API_LANG = process.env.EXPO_PUBLIC_API_LANG;
export const CURRENT_WALKTHROUGH_VERSION = "1.0.0";
export const DEV_PIN = process.env.EXPO_PUBLIC_DEV_PIN;

export const ENVIRONMENT = process.env.EXPO_PUBLIC_ENVIRONMENT ?? "";

export const DATE_FORMATS = {
  en: "MMM dd, yyyy",
  de: "dd MMM yyyy",
};

export const containerLocations: Location[] = [
  {
    id: "1",
    type: "glass",
    title: "STAKLO - SCHROTTOVA 1",
    address: "SCHROTTOVA 1, Zagreb",
    latitude: 45.8225,
    longitude: 15.9801,
    open_at: "2025-06-07 07:00:00",
    closing_at: "2025-06-07 21:00:00",
    rating: 4.5,
  },
  {
    id: "2",
    type: "plastic",
    title: "STAKLO - ALBINIJEVA 6",
    address: "ALBINIJEVA 6, Zagreb",
    latitude: 45.7701,
    longitude: 15.9992,
    open_at: "2025-06-07 06:30:00",
    closing_at: "2025-06-07 20:30:00",
    rating: 3.8,
  },
  {
    id: "3",
    type: "paper",
    title: "STAKLO - ALBINIJEVA 14",
    address: "ALBINIJEVA 14, Zagreb",
    latitude: 45.7706,
    longitude: 16.0003,
    open_at: "2025-06-07 08:00:00",
    closing_at: "2025-06-07 22:00:00",
    rating: 4.1,
  },
  {
    id: "4",
    type: "storage",
    title: "STAKLO - ALEJA A. AUGUSTINČIĆA 11",
    address: "ALEJA A. AUGUSTINČIĆA 11, Zagreb",
    latitude: 45.8305,
    longitude: 16.0165,
    open_at: "2025-06-07 05:45:00",
    closing_at: "2025-06-07 19:00:00",
    rating: 4.9,
  },
  {
    id: "5",
    type: "glass",
    title: "STAKLO - ALEJA BLAŽA JURIŠIĆA 27",
    address: "ALEJA BLAŽA JURIŠIĆA 27, Zagreb",
    latitude: 45.8452,
    longitude: 16.0381,
    open_at: "2025-06-07 09:00:00",
    closing_at: "2025-06-07 17:30:00",
    rating: 3.6,
  },
  {
    id: "6",
    type: "glass",
    title: "STAKLO - ALEJA BLAŽA JURIŠIĆA 41",
    address: "ALEJA BLAŽA JURIŠIĆA 41, Zagreb",
    latitude: 45.8467,
    longitude: 16.0405,
    open_at: "2025-06-07 07:30:00",
    closing_at: "2025-06-07 20:00:00",
    rating: 4.2,
  },
];
