import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  View,
  Dimensions,
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

  // 1) Ask permission, center map, and set initial regionRequest
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

        const aspect =
          Dimensions.get("window").width / Dimensions.get("window").height;
        const initialRegion: Region = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05 * aspect,
        };

        mapRef.current?.animateCamera(
          { center: initialRegion, zoom: 15 },
          { duration: 500 },
        );

        const halfLat = initialRegion.latitudeDelta / 2;
        const halfLng = initialRegion.longitudeDelta / 2;
        setRegionRequest({
          latMin: initialRegion.latitude - halfLat,
          latMax: initialRegion.latitude + halfLat,
          lngMin: initialRegion.longitude - halfLng,
          lngMax: initialRegion.longitude + halfLng,
          type: Array.isArray(filter) ? filter[0] : filter,
        });
      }
    })();
  }, []);

  // 2) Fetch whenever regionRequest changes
  const { data: newLocations = [] } = useFetchLocationsCoordinates(
    lang,
    regionRequest!,
    Boolean(regionRequest),
  );

  // 3) Accumulate only *new* locations
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

  // 4) When filter changes: purge non-matching pins and re-fire query
  useEffect(() => {
    if (!regionRequest) return;
    // Purge old types
    setVisibleLocations((prev) =>
      prev.filter((location) =>
        Array.isArray(filter)
          ? filter.length === 0 || filter.includes(location.type)
          : filter === "" || location.type === filter,
      ),
    );
    // Re-issue same box but new type
    setRegionRequest((prev) => {
      if (!prev) return prev;
      return {
        latMin: prev.latMin,
        latMax: prev.latMax,
        lngMin: prev.lngMin,
        lngMax: prev.lngMax,
        type: Array.isArray(filter) ? filter[0] : filter,
      };
    });
  }, [filter]);

  // 5) Throttled region change → update regionRequest
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
        type: Array.isArray(filter) ? filter[0] : filter,
      });
    }, 500);
  };

  // 6) Denied? Show prompt
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

  // 7) Render map with your accumulated & filtered pins
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
