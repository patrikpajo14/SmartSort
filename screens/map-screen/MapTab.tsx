import { StyleSheet, View } from "react-native";
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
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 45.815,
          longitude: 15.9819,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onMapReady={() => console.log("Map ready")}
        onMapLoaded={() => console.log("Map loaded")}
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
    borderRadius: 10,
    paddingBottom: "15@ms",
    ...StyleSheet.absoluteFillObject,
  },
});
export default MapTab;
