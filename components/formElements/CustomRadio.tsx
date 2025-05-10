import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import {COLORS, FONTS, icons} from '../../constants';
import {ScaledSheet} from 'react-native-size-matters';
import {useTheme} from '../../context/themeContext';
import {CachedImage} from '@georstat/react-native-image-cache';

interface RadioOption {
  label: string;
  value: string | number;
}

interface CustomRadioProps {
  options: RadioOption[];
  selectedValue: string | number;
  onSelect: (value: any) => void;
  label?: string;
  containerStyle?: ViewStyle;
  innerContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  radioOptionStyle?: ViewStyle;
  radioLabelStyle?: TextStyle;
}

const CustomRadio: React.FC<CustomRadioProps> = ({
  options,
  selectedValue,
  onSelect,
  label,
  containerStyle,
  innerContainerStyle,
  labelStyle,
  radioOptionStyle,
  radioLabelStyle,
}) => {
  const {mode} = useTheme();
  const activeColors = COLORS[mode];
  const actionRadioStyle = {
    ...Platform.select({
      ios: {
        shadowColor: activeColors.primary,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 8,
      },
    }),
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle, {color: activeColors.text}]}>
          {label}
        </Text>
      )}
      <View style={innerContainerStyle}>
        {options.map(option => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.radioOption,
              {borderColor: activeColors.primary, ...radioOptionStyle},
            ]}
            onPress={() => onSelect(option.value)}>
            <View style={[styles.radioButton]}>
              <CachedImage
                source={
                  selectedValue === option.value
                    ? icons.radio_active
                    : icons.radio_passive
                }
                style={[
                  styles.radioImage,
                  selectedValue === option.value ? actionRadioStyle : {},
                ]}
                imageStyle={[
                  styles.radioImage,
                  selectedValue === option.value ? actionRadioStyle : {},
                ]}
              />
            </View>
            <Text
              style={[
                styles.radioLabel,
                {color: activeColors.text, ...radioLabelStyle},
              ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    paddingTop: '30@ms',
    paddingBottom: '10@ms',
  },
  label: {
    ...(FONTS.medium5 as TextStyle),
    fontSize: '16@ms0.2',
    marginBottom: '5@ms',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '5@ms',
    paddingVertical: '5@ms',
  },
  radioButton: {
    height: '32@ms0.2',
    width: '32@ms0.2',
    borderRadius: '16@ms0.2',
    marginRight: '10@ms',
  },
  radioImage: {
    width: '32@ms0.2',
    height: '32@ms0.2',
    borderRadius: '16@ms0.2',
    objectFit: 'cover',
  },
  radioLabel: {
    fontSize: '16@ms0.2',
  },
});

export default CustomRadio;
