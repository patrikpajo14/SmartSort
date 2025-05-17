import {StateCreator} from 'zustand';

export type MiscSlice = {
  latestAppVersion: string | null;
  minAppVersion: string | null;
  lastSeenUpdateVersion: string | null;
  updateCooldownDays: number;
  isAlertShowing: boolean;
  selectedEnvironment: string | null;
  setSelectedEnvironment: (env: string) => void;
  setAppVersions: (latest: string, min: string) => void;
  setLastSeenUpdateVersion: (version: string) => void;
  setAlertShowing: (isShowing: boolean) => void;
  allowBackgroundLocationNotifications: boolean;
  setAllowBackgroundLocationNotifications: (allow: boolean) => void;
  timeLeft: number;
  setTimeLeft: (time: number) => void;
  shouldTimerReset: boolean;
  setShouldTimerReset: (shouldTimerReset: boolean) => void;
};
export const createMiscSlice: StateCreator<MiscSlice> = set => ({
  latestAppVersion: null,
  minAppVersion: null,
  lastSeenUpdateVersion: null,
  updateCooldownDays: 3,
  isAlertShowing: false,
  selectedEnvironment: null,
  allowBackgroundLocationNotifications: false,
  timeLeft: 0,
  shouldTimerReset: false,
  setTimeLeft: value => set(() => ({timeLeft: value})),
  setShouldTimerReset: value => set(() => ({shouldTimerReset: value})),
  setAllowBackgroundLocationNotifications: allow =>
    set({allowBackgroundLocationNotifications: allow}),
  setSelectedEnvironment: env => set({selectedEnvironment: env}),
  setAppVersions: (latest, min) =>
    set({
      latestAppVersion: latest,
      minAppVersion: min,
    }),

  setLastSeenUpdateVersion: version => set({lastSeenUpdateVersion: version}),

  setAlertShowing: isShowing => set({isAlertShowing: isShowing}),
});
