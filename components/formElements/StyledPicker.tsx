import React from 'react';
import {View, Text, ViewStyle, TextStyle} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {COLORS, FONTS, icons} from '../../constants';
import {useTheme} from '../../context/themeContext';
import {CachedImage} from '@georstat/react-native-image-cache';

interface StyledPickerProps {
  label: string;
  options: {label: string; value: string}[];
  value: string | number;
  onChange: (value: string) => void;
  errorMsg?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  nextInputRef?: React.RefObject<any>;
}

const StyledPicker: React.FC<StyledPickerProps> = ({
  label,
  options,
  value,
  onChange,
  errorMsg,
  containerStyle,
  labelStyle,
  nextInputRef,
}) => {
  const {mode} = useTheme();
  const activeColors = COLORS[mode];

  const inputStyle: TextStyle = {
    ...FONTS.body1,
    fontSize: moderateScale(13),
    color: activeColors.text,
  };

  const inputContainerStyle: ViewStyle = {
    height: moderateScale(50, 0.2),
    paddingHorizontal: moderateScale(15),
    paddingVertical: 0,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: activeColors.input,
    borderColor: errorMsg ? activeColors.error : 'transparent',
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, labelStyle, {color: activeColors.text}]}>
          {label}
        </Text>
        {errorMsg && (
          <Text style={[styles.errorText, {color: activeColors.error}]}>
            * mandatory
          </Text>
        )}
      </View>
      <RNPickerSelect
        onValueChange={value => {
          onChange(value);
          if (nextInputRef?.current) {
            nextInputRef.current.focus();
          }
        }}
        items={options}
        value={value}
        style={{
          inputIOS: {
            ...inputStyle,
            ...inputContainerStyle,
          },
          inputAndroid: {
            ...inputStyle,
            ...inputContainerStyle,
          },
          iconContainer: {
            top: 20,
            right: 15,
          },
        }}
        useNativeAndroidPickerStyle={false}
        Icon={() => (
          <CachedImage
            source={icons.chevron_down}
            style={styles.icon}
            imageStyle={styles.icon}
            tintColor={activeColors.black}
          />
        )}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginTop: '15@ms',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    ...(FONTS.medium5 as TextStyle),
    fontSize: moderateScale(16, 0.2),
    lineHeight: moderateScale(20, 0.2),
    marginBottom: moderateScale(5),
  },
  icon: {
    width: moderateScale(15),
    height: moderateScale(10),
    objectFit: 'contain',
  },
  errorText: {
    fontSize: moderateScale(12),
    marginBottom: moderateScale(5),
  },
});

export default StyledPicker;
