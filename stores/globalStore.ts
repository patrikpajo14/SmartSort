import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createGlobalSlice, GlobalSlice } from "./globalSlice";
import { createMiscSlice, MiscSlice } from "./miscSlice";
import { createUserSlice, UserSlice } from "./userSlice";
type HydrationState = {
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};
type GlobalStore = GlobalSlice & MiscSlice & UserSlice & HydrationState;
// If you add more slices in the future, you can extend this type:
// type GlobalStore = GlobalSlice & UserSlice & SettingsSlice;

const useGlobalStore = create<GlobalStore>()(
  devtools(
    persist(
      (set, get, api) => ({
        ...createGlobalSlice(set, get, api),
        ...createMiscSlice(set, get, api),
        ...createUserSlice(set, get, api),
        _hasHydrated: false,
        setHasHydrated: (state) => {
          set({
            _hasHydrated: state,
          });
        },
      }),
      {
        name: "globalStore",
        storage: createJSONStorage(() => AsyncStorage),
        onRehydrateStorage: (state) => {
          return () => state.setHasHydrated(true);
        },
      },
    ),
  ),
);

export default useGlobalStore;
