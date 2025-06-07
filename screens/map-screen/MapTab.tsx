import { StyleSheet, TextStyle, View } from "react-native";
import { FONTS } from "@/constants/theme";
import { ScaledSheet } from "react-native-size-matters";
import { Location } from "@/types/global";
import MapView, { Marker } from "react-native-maps";
import { containerLocations } from "@/constants/config";
import { getMarkerIcon } from "@/utils/mapThemePickers";

type MapTabProps = {
  locations: any;
  onLocationPress: (location: Location) => void;
};
const MapTab = ({ locations, onLocationPress }: MapTabProps) => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 45.815,
          longitude: 15.9819,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
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
    borderRadius: 10,
    paddingBottom: "15@ms",
    ...StyleSheet.absoluteFillObject,
  },
});
export default MapTab;
