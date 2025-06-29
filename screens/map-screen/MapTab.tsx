import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import useGlobalStore from "@/stores/globalStore";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { COLORS, FONTS } from "@/constants/theme";
import { Location as LocationInterface, RegionRequest } from "@/types/global";
import { getMarkerIcon } from "@/utils/mapThemePickers";
import { useFetchLocationsCoordinates } from "@/reactQuery/locations";

type MapTabProps = {
  filter: string | string[];
  onLocationPress: (location: LocationInterface) => void;
};

export default function MapTab({ filter, onLocationPress }: MapTabProps) {
  const { t } = useTranslation();
  const { mode } = useTheme();
  const lang = useGlobalStore((s) => s.lang);
  const setUserLocation = useGlobalStore((state) => state.setUserLocation);
  const activeColors = COLORS[mode];
  const mapRef = useRef<MapView>(null);
  const [permission, setPermission] =
    useState<Location.PermissionStatus | null>(null);
  const regionChangeTimeout = useRef<NodeJS.Timeout | null>(null);
  const [userLoc, setUserLoc] = useState<Location.LocationObject | null>(null);
  const [regionRequest, setRegionRequest] = useState<RegionRequest | null>(
    null,
  );
  const [visibleLocations, setVisibleLocations] = useState<LocationInterface[]>(
    [],
  );

  // ask & store permission + current location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermission(status);
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync();
        setUserLoc(location);
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        // once we have it, animate/zoom in
        mapRef.current?.animateCamera({
          center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          zoom: 15,
        });
      }
    })();
  }, []);

  // whenever the regionRequest changes, refetch
  const { data: newLocations = [] } = useFetchLocationsCoordinates(
    lang,
    regionRequest!,
    Boolean(regionRequest),
  );

  useEffect(() => {
    if (newLocations.length) {
      setVisibleLocations((prev) => {
        const unseen = newLocations.filter(
          (location: LocationInterface) =>
            !prev.some((prevLocation) => prevLocation.id === location.id),
        );
        return [...prev, ...unseen];
      });
    }
  }, [newLocations]);

  const handleRegionChangeComplete = (r: Region) => {
    if (regionChangeTimeout.current) clearTimeout(regionChangeTimeout.current);
    regionChangeTimeout.current = setTimeout(() => {
      const halfLat = r.latitudeDelta / 2;
      const halfLng = r.longitudeDelta / 2;
      setRegionRequest({
        latMin: r.latitude - halfLat,
        latMax: r.latitude + halfLat,
        lngMin: r.longitude - halfLng,
        lngMax: r.longitude + halfLng,
      });
    }, 500); // wait 500ms of no movement before firing
  };

  // render a permission prompt if denied
  if (permission === "denied") {
    return (
      <View style={styles.permissionContainer}>
        <Text style={[styles.permissionTitle, { color: activeColors.text }]}>
          {t("general.permission_required")}
        </Text>
        <Text style={[styles.permissionText, { color: activeColors.text }]}>
          {Platform.OS === "android"
            ? t("general.location_permission_required_text")
            : t("general.location_permission_required_text_ios")}
        </Text>
        <PrimaryButton
          label={
            Platform.OS === "android"
              ? t("general.open_settings")
              : t("general.try_again")
          }
          small
          onPress={() =>
            Platform.OS === "android"
              ? Linking.openSettings()
              : Location.requestForegroundPermissionsAsync().then((r) =>
                  setPermission(r.status),
                )
          }
        />
      </View>
    );
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        showsMyLocationButton
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {visibleLocations.map((location: LocationInterface) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            image={getMarkerIcon(location.type)}
            onPress={() => onLocationPress(location)}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = ScaledSheet.create({
  mapContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: "20@ms",
  },
  map: {
    flex: 1,
    borderRadius: 10,
    paddingBottom: "15@ms",
    ...StyleSheet.absoluteFillObject,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "30@ms",
  },
  permissionTitle: {
    ...(FONTS.h1 as TextStyle),
    textAlign: "center",
    marginBottom: "20@ms",
  },
  permissionText: {
    ...(FONTS.body3 as TextStyle),
    textAlign: "center",
    marginBottom: "20@ms",
  },
});
