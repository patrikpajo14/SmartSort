import React from 'react';
import {View, Image, Text, ImageSourcePropType} from 'react-native';
import {Marker} from 'react-native-maps';
import {moderateScale} from 'react-native-size-matters';
import {useTheme} from '../../../context/themeContext.tsx';
import {COLORS, icons} from '../../../constants';
import {Friend} from '../../../types/global';

type Coordinate = {
  latitude: number;
  longitude: number;
};

type CustomMarkerProps = {
  coordinate: Coordinate;
  title?: string;
  isUserLocation?: boolean;
  icon?: ImageSourcePropType;
  friend?: Friend;
  onMarkerPress?: (friend: Friend) => void;
};

const CustomMarker = React.memo(
  ({
    coordinate,
    title,
    icon,
    friend,
    isUserLocation = false,
    onMarkerPress,
  }: CustomMarkerProps): React.ReactElement | null => {
    const {mode} = useTheme();
    let activeColors = COLORS[mode];

    if (!coordinate.latitude || !coordinate.longitude) {
      return null;
    }

    const handleMarkerPress = () => {
      onMarkerPress && friend
        ? onMarkerPress(friend)
        : console.log('No marker function');
    };
    return (
      <Marker coordinate={coordinate} onPress={handleMarkerPress}>
        <View style={{position: 'relative'}}>
          <Image
            source={icon || icons.location_pin}
            style={{
              width: 50,
              height: 70,
              transform: [{scale: isUserLocation ? 1.25 : 1}],
            }}
            tintColor={
              isUserLocation ? activeColors.primary : activeColors.white
            }
            resizeMode="contain"
          />
          {title && (
            <View
              style={{
                position: 'absolute',
                top: 14,
                left: 11,
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: activeColors.input,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: moderateScale(13, 0.2),
                  color: activeColors.black,
                }}>
                {title}
              </Text>
            </View>
          )}
        </View>
      </Marker>
    );
  },
  (prevProps, nextProps) =>
    prevProps.coordinate.latitude === nextProps.coordinate.latitude &&
    prevProps.coordinate.longitude === nextProps.coordinate.longitude &&
    prevProps.title === nextProps.title &&
    prevProps.icon === nextProps.icon &&
    prevProps.isUserLocation === nextProps.isUserLocation,
);

export default CustomMarker;
