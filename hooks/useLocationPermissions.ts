import { useCallback, useEffect } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import {
  checkMultiple,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
  Permission,
  PermissionStatus,
  openSettings,
  check,
  request,
} from "react-native-permissions";
import { useTranslation } from "react-i18next";
import useGlobalStore from "@/stores/globalStore";

const permissionsArray: Permission[] =
  Platform.select({
    android: [
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ],
    ios: [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
  }) ?? [];

const useLocationPermissions = (): [
  boolean,
  () => Promise<void>,
  () => Promise<void>,
  () => Promise<void>,
  () => Promise<boolean>,
] => {
  const locationPermission = useGlobalStore(
    (state) => state.locationPermission,
  );
  const setLocationPermission = useGlobalStore(
    (state) => state.setLocationPermission,
  );
  const setLocationPermissionBackground = useGlobalStore(
    (state) => state.setLocationPermissionBackground,
  );
  const hasHydrated = useGlobalStore((state) => state._hasHydrated);
  const hasAskedForBackgroundPermission = useGlobalStore(
    (state) => state.hasAskedForBackgroundPermission,
  );
  const setHasAskedForBackgroundPermission = useGlobalStore(
    (state) => state.setHasAskedForBackgroundPermission,
  );
  const { t } = useTranslation();

  // console.log(
  //   'HAS ASKED FOR BACKGROUND PERMISSION',
  //   hasAskedForBackgroundPermission,
  // );

  const requestPermissions = useCallback(async (): Promise<void> => {
    const statuses: Record<Permission, PermissionStatus> =
      await requestMultiple(permissionsArray);
    const granted = Object.values(statuses).every(
      (status) => status === RESULTS.GRANTED,
    );
    setLocationPermission(granted);
    // requestForegroundServiceLocation();
    if (granted) {
      if (Platform.OS === "android") {
        const grantedBcg = await getAndroidBackgroundLocation();
        setLocationPermissionBackground(grantedBcg);
      } else if (Platform.OS === "ios") {
        // const grantedBcg = await getIOSBackgroundLocation();
        // setLocationPermissionBackground(grantedBcg);
      }
    } else {
      console.log("Not all permissions granted", statuses);
    }

    const isBlocked = Object.values(statuses).some(
      (status) => status === RESULTS.BLOCKED,
    );
    if (isBlocked) {
      Alert.alert(
        t("general.permission_blocked_title"),
        t("general.permission_blocked_text"),
        [
          { text: t("general.cancel"), style: "cancel" },
          {
            text: t("general.open_settings"),
            onPress: () => openSettings(),
          },
        ],
      );
    }
  }, [t, locationPermission, hasAskedForBackgroundPermission, hasHydrated]);

  const showAlert = useCallback((): void => {
    Alert.alert(
      t("general.permission_required"),
      t("general.permission_required_text"),
      [
        { text: t("general.cancel"), style: "cancel" },
        { text: t("general.open_permissions"), onPress: requestPermissions },
      ],
    );
  }, [
    t,
    requestPermissions,
    hasHydrated,
    hasAskedForBackgroundPermission,
    locationPermission,
  ]);

  const checkPermissions = useCallback(async (): Promise<void> => {
    const statuses: Record<Permission, PermissionStatus> =
      await checkMultiple(permissionsArray);
    const granted = Object.values(statuses).every(
      (status) => status === RESULTS.GRANTED,
    );
    console.log("GRANTED", granted);

    setLocationPermission(granted);
    if (granted) {
      if (Platform.OS === "android") {
        const grantedBcg = await getAndroidBackgroundLocation();
        setLocationPermissionBackground(grantedBcg);
      } else if (Platform.OS === "ios") {
        // const grantedBcg = await getIOSBackgroundLocation();
        // setLocationPermissionBackground(grantedBcg);
      }
    } else if (!granted) {
      // await requestPermissions();
      const isBlocked = Object.values(statuses).some(
        (status) => status === RESULTS.BLOCKED,
      );
      if (isBlocked) {
        Alert.alert(
          t("general.permission_blocked_title"),
          t("general.permission_blocked_text"),
          [
            { text: t("general.cancel"), style: "cancel" },
            {
              text: t("general.open_settings"),
              onPress: () => openSettings(),
            },
          ],
        );
      } else {
        showAlert();
      }
    }
  }, [
    showAlert,
    hasAskedForBackgroundPermission,
    hasHydrated,
    locationPermission,
  ]);

  const checkPermissionsAppState = useCallback(async (): Promise<void> => {
    const statuses: Record<Permission, PermissionStatus> =
      await checkMultiple(permissionsArray);
    const granted = Object.values(statuses).every(
      (status) => status === RESULTS.GRANTED,
    );
    setLocationPermission(granted);
    //TODO: Dodati nesto da useru kazemo da mu treba permission za background
    if (granted) {
      if (Platform.OS === "android") {
        const grantedBcg = await getAndroidBackgroundLocation();
        setLocationPermissionBackground(grantedBcg);
      } else if (Platform.OS === "ios") {
        // const grantedBcg = await getIOSBackgroundLocation();
        // setLocationPermissionBackground(grantedBcg);
      }
    } else {
      console.log("Not all permissions granted", statuses);
    }
  }, [hasHydrated, hasAskedForBackgroundPermission, locationPermission]);
  const getAndroidBackgroundLocation = async () => {
    const currentHasAsked =
      useGlobalStore.getState().hasAskedForBackgroundPermission;
    const backgroundStatus = await check(
      PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
    );

    if (backgroundStatus === RESULTS.GRANTED) {
      console.log("Background location permission is already granted");
    } else {
      console.log(
        "Background location permission is denied; requesting now...",
        backgroundStatus,
      );
      const requestBcgPermission = () => {
        setHasAskedForBackgroundPermission(true);
        if (backgroundStatus === RESULTS.BLOCKED) {
          openSettings();
        } else {
          request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
        }
      };
      if (!currentHasAsked && hasHydrated) {
        setHasAskedForBackgroundPermission(true);
        Alert.alert(
          t("Background location permission required"),
          t(
            "In order to use the app map features, friend tracking and other location-based features, you need to grant background location permission. (Always)",
          ),
          [
            {
              text: t("general.cancel"),
              style: "cancel",
              onPress: () => {
                setHasAskedForBackgroundPermission(true);
              },
            },
            {
              text: t("general.open_settings"),
              onPress: () => requestBcgPermission(),
            },
          ],
        );
      }
    }
    return backgroundStatus === RESULTS.GRANTED;
  };
  const getIOSBackgroundLocation = async () => {
    // Check LOCATION_WHEN_IN_USE first
    const whenInUseStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (whenInUseStatus !== RESULTS.GRANTED) {
      console.log(
        "Cannot request LOCATION_ALWAYS because LOCATION_WHEN_IN_USE is not granted.",
      );
      return false;
    }

    // Now check or request LOCATION_ALWAYS
    const backgroundStatus = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
    if (backgroundStatus === RESULTS.GRANTED) {
      console.log("LOCATION_ALWAYS is already granted.");
      return true;
    } else {
      console.log("Requesting LOCATION_ALWAYS...");
      const requestStatus = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
      return requestStatus === RESULTS.GRANTED;
    }
  };
  // const requestForegroundServiceLocation = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const result = await PermissionsAndroid.request(
  //         'android.permission.FOREGROUND_SERVICE_LOCATION',
  //       );
  //       if (result === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('FOREGROUND_SERVICE_LOCATION granted');
  //         return true;
  //       } else {
  //         console.warn('FOREGROUND_SERVICE_LOCATION denied');
  //         return false;
  //       }
  //     } catch (error) {
  //       console.error('Error requesting FOREGROUND_SERVICE_LOCATION:', error);
  //       return false;
  //     }
  //   }
  //   return true; // Default to true for platforms that don't need this permission
  // };

  return [
    locationPermission,
    requestPermissions,
    checkPermissions,
    checkPermissionsAppState,
    getAndroidBackgroundLocation,
  ];
};

export default useLocationPermissions;
