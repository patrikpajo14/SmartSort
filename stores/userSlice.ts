import {StateCreator} from 'zustand';

export type UserSlice = {
  locationPermission: boolean;
  setLocationPermission: (value: boolean) => void;
  locationPermissionBackground: boolean;
  setLocationPermissionBackground: (value: boolean) => void;
  hasAskedForBackgroundPermission: boolean;
  setHasAskedForBackgroundPermission: (value: boolean) => void;
};

export const createUserSlice: StateCreator<UserSlice> = set => ({
  locationPermission: false,
  setLocationPermission: value => set({locationPermission: value}),
  locationPermissionBackground: false,
  setLocationPermissionBackground: value =>
    set({locationPermissionBackground: value}),
  hasAskedForBackgroundPermission: false,
  setHasAskedForBackgroundPermission: value =>
    set({hasAskedForBackgroundPermission: value}),
});
