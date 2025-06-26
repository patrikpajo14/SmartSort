import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Location as LocationInterface } from "@/types/global";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { containerLocations } from "@/constants/config";
import { getMarkerIcon } from "@/utils/mapThemePickers";
import { useEffect, useState } from "react";
import { LocationObject } from "expo-location";
import * as Location from "expo-location";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useTranslation } from "react-i18next";
import { COLORS, FONTS } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";

type MapTabProps = {
  locations: any;
  onLocationPress: (location: LocationInterface) => void;
};
const MapTab = ({ locations, onLocationPress }: MapTabProps) => {
  const { t } = useTranslation();
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [permissionStatus, setPermissionStatus] =
    useState<Location.PermissionStatus | null>(null);

  const requestPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status);

    if (status === "granted") {
      const current = await Location.getCurrentPositionAsync({});
      setLocation(current);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  if (permissionStatus === "denied") {
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

        {Platform.OS === "android" ? (
          <PrimaryButton
            label={t("general.open_settings")}
            small={true}
            onPress={() => Linking.openSettings()}
          />
        ) : (
          <PrimaryButton
            label={t("general.try_again")}
            onPress={requestPermission}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location?.coords.latitude || 45.815,
          longitude: location?.coords.longitude || 15.9819,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {containerLocations.map((loc) => (
          <Marker
            key={loc.id}
            coordinate={{
              latitude: loc.latitude,
              longitude: loc.longitude,
            }}
            image={getMarkerIcon(loc.type)}
            onPress={() => {
              onLocationPress(loc);
            }}
          />
        ))}
      </MapView>
    </View>
  );
};
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
export default MapTab;
