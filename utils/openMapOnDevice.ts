import {Platform, Linking} from 'react-native';

interface OpenMapOnDeviceParams {
  fromLatitude: number | undefined;
  fromLongitude: number | undefined;
  toLatitude: number | null | undefined;
  toLongitude: number | null | undefined;
  destinationName?: string;
}

const openMapOnDevice = async ({
  fromLatitude,
  fromLongitude,
  toLatitude,
  toLongitude,
  destinationName = 'Destination',
}: OpenMapOnDeviceParams): Promise<void> => {
  const googleMapsAppURL = `geo:0,0?q=${toLatitude},${toLongitude}(${encodeURIComponent(
    destinationName,
  )})`;
  const appleMapsAppURL = `maps://?saddr=${fromLatitude},${fromLongitude}&daddr=${toLatitude},${toLongitude}&dirflg=d`;
  const googleMapsWebURL = `https://www.google.com/maps/dir/?api=1&origin=${fromLatitude},${fromLongitude}&destination=${toLatitude},${toLongitude}&travelmode=driving`;

  let appURL = Platform.OS === 'ios' ? appleMapsAppURL : googleMapsAppURL;
  let isSupported = await Linking.canOpenURL(appURL);

  if (!isSupported && Platform.OS === 'android') {
    appURL = googleMapsWebURL;
    isSupported = await Linking.canOpenURL(appURL);
  }

  if (isSupported) {
    await Linking.openURL(appURL);
  } else if (Platform.OS === 'ios') {
    isSupported = await Linking.canOpenURL(googleMapsWebURL);
    if (isSupported) {
      await Linking.openURL(googleMapsWebURL);
    } else {
      console.error('Unable to open map');
    }
  } else {
    console.error('Unable to open map');
  }
};

export default openMapOnDevice;
