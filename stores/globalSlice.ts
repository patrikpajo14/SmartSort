import { API_URL } from "@/constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateCreator } from "zustand";
export type LocationData = {
  latitude: number;
  longitude: number;
};
export type GlobalSlice = {
  serverUrl: string | undefined;
  deviceId: string | null;
  deviceHashId: string | null;
  lang: string;
  privacySettings: number;
  clearAsyncStorage: () => Promise<void>;
  termsVersion: string | null;
  serverTermsVersion: string | null;
  setServerTermVersion: (value: string) => void;
  setTermVersion: (value: string) => void;
  hasAcceptedTerms: boolean;
  setHasAcceptedTerms: (value: boolean) => void;
  hasSeenWalkthrough: boolean;
  walkthroughVersion: string | null;
  setHasSeenWalkthrough: (value: boolean) => void;
  setWalkthroughVersion: (value: string) => void;
  setPrivacySettings: (value: number) => void;
  setLang: (value: string) => void;
  setDeviceId: (value: string) => void;
  setDeviceHashId: (value: string) => void;
  configuration: any;
  setConfiguration: (value: any) => void;
  userLocation: LocationData | null;
  setUserLocation: (value: LocationData) => void;
  timezone: string;
  setTimezone: (timezone: string) => void;
};
export const createGlobalSlice: StateCreator<GlobalSlice> = (set) => ({
  serverUrl: API_URL,
  deviceId: null,
  deviceHashId: null,
  draftMode: false,
  lang: "en",
  serverTermsVersion: null,
  termsVersion: null,
  hasAcceptedTerms: false,
  hasSeenWalkthrough: false,
  walkthroughVersion: null,
  privacySettings: 10,
  configuration: null,
  userLocation: null,
  timezone: "Europe/Berlin",
  incidentsCount: 0,
  notificationsCount: 0,
  setTimezone: (value) => set(() => ({ timezone: value })),
  setUserLocation: (value) => set(() => ({ userLocation: value })),
  setConfiguration: (value) => set(() => ({ configuration: value })),
  setDeviceId: (value) => set(() => ({ deviceId: value })),
  setDeviceHashId: (value) => set(() => ({ deviceHashId: value })),
  setHasSeenWalkthrough: (value) => set(() => ({ hasSeenWalkthrough: value })),
  setWalkthroughVersion: (value) => set(() => ({ walkthroughVersion: value })),
  setTermVersion: (value) => set(() => ({ termsVersion: value })),
  setServerTermVersion: (value) => set(() => ({ serverTermsVersion: value })),
  setHasAcceptedTerms: (value) => set(() => ({ hasAcceptedTerms: value })),
  setPrivacySettings: (value) => set(() => ({ privacySettings: value })),
  setLang: (value) => set(() => ({ lang: value })),
  clearAsyncStorage: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  },
});
