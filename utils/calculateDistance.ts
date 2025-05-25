import * as turf from '@turf/turf';
import {Units} from '@turf/helpers';

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const from = turf.point([lon1, lat1]);
  const to = turf.point([lon2, lat2]);
  const options: {units: Units} = {units: 'meters'};

  return turf.distance(from, to, options); // Distance in meters
};
