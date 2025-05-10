import React, {useEffect, useRef} from 'react';
import {
  Text,
  View,
  Animated,
  Pressable,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import icons from '../../constants/icons.ts';
import {COLORS, FONTS} from '../../constants';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {useTheme} from '../../context/themeContext.tsx';

type CustomCheckboxProps = {
  text: string;
  textComponent?: any;
  onPress: () => void;
  isChecked: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  checkboxStyle?: ViewStyle;
  errorMsg?: string;
};

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  text,
  textComponent,
  onPress,
  isChecked,
  containerStyle,
  textStyle,
  checkboxStyle,
  errorMsg,
}) => {
  const {mode} = useTheme();
  let activeColors = COLORS[mode];
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, [isChecked]);
  const startAnimation = () => {
    // Simultaneous animations for scale and opacity
    Animated.parallel([
      Animated.timing(scale, {
        toValue: isChecked ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: isChecked ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animatedStyle = {
    opacity,
    transform: [
      {
        scale: scale.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        }),
      },
    ],
  };

  return (
    <View style={{marginBottom: moderateScale(20, 0.2)}}>
      <Pressable
        onPress={() => {
          onPress();
        }}
        style={[styles.container, containerStyle]}>
        <View
          style={[
            styles.checkbox,
            {
              backgroundColor: isChecked
                ? activeColors.primary
                : activeColors.lighterGray,
            },
            checkboxStyle,
          ]}>
          <Animated.Image
            source={icons.checkmark}
            resizeMode="contain"
            tintColor={activeColors.white}
            style={[
              {width: moderateScale(17), height: moderateScale(12)},
              animatedStyle,
            ]}
          />
        </View>
        <Text
          style={[styles.checkboxText, {color: activeColors.text}, textStyle]}>
          {textComponent || text}
        </Text>
      </Pressable>
      {errorMsg && (
        <Text
          style={[
            {
              paddingLeft: moderateScale(45, 0.2),
              marginTop: moderateScale(5, 0.2),
              color: activeColors.error,
              fontSize: 12,
              opacity: errorMsg === '' ? 0 : 1,
            },
          ]}>
          {errorMsg}
        </Text>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    height: '30@ms',
    width: '30@ms',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxText: {
    ...FONTS.body4,
    fontSize: '15@ms0.2',
    lineHeight: '20@ms0.7',
    marginLeft: '15@ms',
  },
});

export default CustomCheckbox;
