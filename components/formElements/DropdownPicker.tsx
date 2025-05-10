import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  ViewStyle,
  TextStyle,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {COLORS, FONTS, icons} from '../../constants';
import {ScaledSheet} from 'react-native-size-matters';
import {useTheme} from '../../context/themeContext';
import {CachedImage} from '@georstat/react-native-image-cache';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface DropdownPickerProps {
  label: string;
  options: {label: string; value: string}[];
  value: string;
  onChange: (value: string) => void;
  errorMsg?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

const DropdownPicker: React.FC<DropdownPickerProps> = ({
  label,
  options,
  value,
  onChange,
  errorMsg,
  containerStyle,
  labelStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownAnimation = useRef(new Animated.Value(0)).current;
  const {mode} = useTheme();
  const activeColors = COLORS[mode];

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
    Animated.timing(dropdownAnimation, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const selectItem = (item: {label: string; value: string}) => {
    onChange(item.value);
    toggleDropdown();
  };

  useEffect(() => {
    if (!isOpen) {
      dropdownAnimation.setValue(0);
    }
  }, [isOpen]);

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
      <TouchableOpacity
        style={[
          styles.dropdownButton,
          {
            backgroundColor: activeColors.input,
            borderColor: errorMsg ? activeColors.error : 'transparent',

            borderBottomLeftRadius: isOpen ? 0 : 6,
            borderBottomRightRadius: isOpen ? 0 : 6,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
          },
        ]}
        onPress={toggleDropdown}>
        <Text style={[styles.selectedValueText, {color: activeColors.text}]}>
          {options.find(option => option.value === value)?.label ||
            'Select an option'}
        </Text>
        <CachedImage
          source={icons.chevron_down}
          style={[
            styles.icon,
            {transform: [{rotate: isOpen ? '90deg' : '0deg'}]},
          ]}
          imageStyle={[
            styles.icon,
            {transform: [{rotate: isOpen ? '90deg' : '0deg'}]},
          ]}
          tintColor={isOpen ? activeColors.primary : activeColors.black}
        />
      </TouchableOpacity>
      {isOpen && (
        <Animated.View
          style={[styles.dropdown, {backgroundColor: activeColors.input}]}>
          <ScrollView style={styles.scrollView}>
            {options.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.option]}
                onPress={() => selectItem(item)}>
                <Text
                  style={[
                    styles.optionText,
                    {
                      color:
                        value === item.value
                          ? activeColors.primary
                          : activeColors.text,
                    },
                  ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginTop: '15@ms',
    zIndex: 1000,
  },
  label: {
    ...(FONTS.medium5 as TextStyle),
    fontSize: '16@ms0.2',
    lineHeight: '20@ms0.2',
    marginBottom: '5@ms',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '50@ms0.2',
    paddingHorizontal: '15@ms',
    borderWidth: 1,
  },
  selectedValueText: {
    ...(FONTS.body1 as TextStyle),
    fontSize: '13@ms',
  },
  icon: {
    width: '15@ms',
    height: '10@ms',
    objectFit: 'contain',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    overflow: 'hidden',
    zIndex: 1000,
  },
  scrollView: {
    maxHeight: '150@ms',
  },
  option: {
    paddingVertical: '7.5@ms',
    paddingHorizontal: '15@ms',
  },
  optionText: {
    ...(FONTS.body1 as TextStyle),
    fontSize: '13@ms',
  },
  errorText: {
    fontSize: 12,
    marginBottom: '5@ms',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default DropdownPicker;
