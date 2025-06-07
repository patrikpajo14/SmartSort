import * as turf from "@turf/turf";
import { Units } from "@turf/helpers";

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const from = turf.point([lon1, lat1]);
  const to = turf.point([lon2, lat2]);
  const options: { units: Units } = { units: "meters" };

  return turf.distance(from, to, options); // Distance in meters
};

export const showDistanceText = (distance: number, t: any) => {
  if (distance < 1000) {
    return `${Math.round(distance)} ${t("locations.meters_away")}`;
  } else {
    return `${(distance / 1000).toFixed(2)} ${t("locations.kilometers_away")}`;
  }
};
