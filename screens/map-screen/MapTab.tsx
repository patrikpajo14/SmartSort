import {
  AppState,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import { ScaledSheet } from "react-native-size-matters";
import { Location } from "@/types/global";
import Map from "@/screens/map-screen/components/Map";
// import MapViewClustering from "react-native-map-clustering";
// import { PROVIDER_GOOGLE, Region } from "react-native-maps";
// import CustomMarker from "./components/CustomMarker.tsx";
// import { getInitials } from "../../utils/getInitials.tsx";
// import PermissionsNotGranted from "../../components/common/PermissionNotGranted.tsx";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import useLocationPermissions from "../../hooks/useLocationPermissions.ts";
// import { ScaledSheet } from "react-native-size-matters";
// import useGlobalStore from "../../stores/globalStore.ts";
// import { useFocusEffect } from "@react-navigation/native";
// import { useTheme } from "../../context/themeContext.tsx";
// import { COLORS, FONTS } from "../../constants";
// import { Friend, FriendCoordinate } from "../../types/global";
// import { useTranslation } from "react-i18next";

type MapTabProps = {
  locations: any;
  onLocationPress: (location: Location) => void;
};
const MapTab = ({ locations, onLocationPress }: MapTabProps) => {
  /*const [
    locationPermission,
    requestPermissions,
    checkPermissions,
    checkPermissionsAppState,
  ] = useLocationPermissions();
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  const [region, setRegion] = useState<Region | undefined>(undefined);
  const mapRef = useRef<any | null>(null);
  const isInitialLocationSet = useRef(false);
  const isFrozen = useRef(false);
  const userLocation = useGlobalStore((state) => state.userLocation);
  const { t } = useTranslation();
  const friendMap =
    locations?.reduce(
      (map: Record<number, Friend>, friend) => {
        if (friend?.friend_user_id !== undefined) {
          map[friend.friend_user_id] = friend;
        }
        return map;
      },
      {} as Record<number, Friend>,
    ) || {};
*/
  /*const updateLocationPermissions = async () => {
    await checkPermissionsAppState();
  };
  const checkLocationPermissions = async () => {
    await checkPermissions();
  };

  useEffect(() => {
    checkLocationPermissions();
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        isFrozen.current = false;
        setTimeout(() => {
          updateLocationPermissions();
        }, 2000);
      } else if (nextAppState === "background") {
        isFrozen.current = true;
        console.log("App is in background");
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      isFrozen.current = false;
      return () => {
        isFrozen.current = true;
      };
    }, []),
  );
  const updateLocation = useCallback(
    (newLocation: Coordinate) => {
      if (isFrozen.current) {
        return;
      }
      if (
        !isInitialLocationSet.current ||
        !region ||
        !isCoordinateWithinRegion(newLocation, region)
      ) {
        const newRegion: Region = {
          latitude: newLocation.latitude,
          longitude: newLocation.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        };
        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 1000);
        isInitialLocationSet.current = true;
      }
    },
    [region],
  );

  useEffect(() => {
    if (userLocation) {
      updateLocation(userLocation);
    }
  }, [userLocation, isFrozen.current]);
*/
  /*return (
    <>
      {locationPermission && region ? (
        <View style={styles.mapContainer}>
          <MapViewClustering
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}
            clusterColor={activeColors.primary}
            radius={50}
          >
            {userLocation && (
              <CustomMarker coordinate={userLocation} isUserLocation={true} />
            )}
            {mergedArray.map((friendCoordinate: any) => (
              <CustomMarker
                key={friendCoordinate.id}
                friend={friendCoordinate?.friend}
                coordinate={{
                  latitude: friendCoordinate.latitude,
                  longitude: friendCoordinate.longitude,
                }}
                title={getInitials(friendCoordinate?.friend?.friend_name)}
                onMarkerPress={onLocationPress}
              />
            ))}
          </MapViewClustering>
          <TouchableOpacity
            style={[
              styles.centerButton,
              { backgroundColor: activeColors.background },
            ]}
            onPress={() => {
              if (userLocation && mapRef.current) {
                const newRegion: Region = {
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                };
                setRegion(newRegion);
                mapRef.current.animateToRegion(newRegion, 500);
              }
            }}
          >
            <Text
              style={[styles.centerButtonText, { color: activeColors.text }]}
            >
              {t("locations.my_location")}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <PermissionsNotGranted onPress={requestPermissions} />
      )}
    </>
  );*/
  return (
    <View style={{ flex: 1 }}>
      <Map />
    </View>
  );
};
const styles = ScaledSheet.create({
  mapContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  centerButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  centerButtonText: {
    ...(FONTS.body1 as TextStyle),
    fontSize: "14@ms",
    padding: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default MapTab;
