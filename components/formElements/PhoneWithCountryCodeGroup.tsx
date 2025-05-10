import React, {forwardRef, useEffect, useRef} from 'react';
import {View, Text, TextInputProps, TextStyle, Keyboard} from 'react-native';
import {FONTS} from '../../constants';
import {moderateScale} from 'react-native-size-matters';
import PhoneInput from 'react-native-phone-number-input';
import {CachedImage} from '@georstat/react-native-image-cache';
import icons from '../../constants/icons';

interface PhoneGroupProps extends TextInputProps {
  label: string;
  errorMsg?: string | null;
  activeColors: any;
  defaultCode?: any;
  withDarkTheme?: boolean;
  withShadow?: boolean;
  autoFocus?: boolean;
  defaultValue?: string;
  setValue: (text: string) => void;
  setFormattedValue: (text: string) => void;
  disabled?: boolean;
  disableArrowIcon?: boolean;
  onChangeCountry?: (country: any) => void;
  onChangeText?: (text: string) => void;
  onChangeFormattedText?: (text: string) => void;
  containerStyle?: {};
  textContainerStyle?: {};
  renderDropdownImage?: JSX.Element;
  textInputStyle?: {};
  codeTextStyle?: {};
  flagButtonStyle?: {};
  countryPickerButtonStyle?: {};
  layout?: 'first' | 'second';
  filterProps?: any;
  countryPickerProps?: any;
  labelStyle?: TextStyle;
  nextInputRef?: React.RefObject<any> | null;
  textInputProps?: TextInputProps;
}

const PhoneWithCountryCodeGroup = forwardRef<PhoneInput, PhoneGroupProps>(
  (
    {
      label,
      errorMsg,
      activeColors,
      defaultCode = 'HR',
      withDarkTheme = false,
      withShadow = false,
      autoFocus,
      defaultValue,
      setValue,
      setFormattedValue,
      disabled,
      disableArrowIcon,
      onChangeCountry,
      onChangeText,
      onChangeFormattedText,
      containerStyle,
      textContainerStyle,
      renderDropdownImage,
      textInputStyle,
      codeTextStyle,
      flagButtonStyle,
      countryPickerProps,
      countryPickerButtonStyle,
      layout = 'first',
      filterProps,
      labelStyle,
      nextInputRef,
      textInputProps,
      onFocus,
    },
    ref,
  ) => {
    const recentCountries = ['HR', 'GB', 'DE', 'FR', 'RS', 'SI', 'BA'];
    const modifiedCountryPickerProps = {
      ...countryPickerProps,
      preferredCountries: recentCountries,
      withFilter: true,
      filterProps: {
        // autoFocus: true,
      },
      // excludeCountries: ['TW', 'HK', 'MO'], // Exclude countries not accepted by China
      onChangeSearchText: () => {
        // Keep the recent countries at the top even after searching
        if (ref && ref.current && ref.current?.getCountryPicker) {
          const countryPicker = ref.current.getCountryPicker();
          if (countryPicker && countryPicker.setPreferredCountries) {
            countryPicker.setPreferredCountries(recentCountries);
          }
        }
      },
    };
    return (
      <View style={[containerStyle]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}>
          <Text
            style={[
              {
                ...(FONTS.body5 as TextStyle),
                color: activeColors.text,
                fontSize: moderateScale(14, 0.2),
                paddingTop: moderateScale(10),
                marginBottom: moderateScale(5),
                ...labelStyle,
              },
            ]}>
            {label}
          </Text>
          <Text
            style={[
              {
                color: activeColors.error,
                fontSize: 12,
                opacity: errorMsg === '' || errorMsg === undefined ? 0 : 1,
              },
            ]}>
            {errorMsg}
          </Text>
        </View>
        <View style={{width: '100%'}}>
          <PhoneInput
            ref={ref}
            defaultValue={defaultValue}
            defaultCode={defaultCode}
            layout={layout}
            onChangeText={text => {
              setValue(text);
            }}
            onChangeFormattedText={text => {
              setFormattedValue(text);
            }}
            onChangeCountry={country => {
              if (onChangeCountry) {
                onChangeCountry(country);
              }
            }}
            withDarkTheme={withDarkTheme}
            autoFocus={autoFocus}
            containerStyle={{
              width: '100%',
              height: moderateScale(50, 0.2),
              paddingHorizontal: moderateScale(15),
              paddingLeft: 0,
              marginTop: moderateScale(5),
              borderRadius: 6,
              backgroundColor: activeColors.input,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor:
                errorMsg === '' || errorMsg === undefined
                  ? 'transparent'
                  : activeColors.error,
              ...containerStyle,
            }}
            textContainerStyle={{
              backgroundColor: activeColors.input,
              ...textContainerStyle,
            }}
            textInputStyle={{
              color: activeColors.text,
              height: moderateScale(50, 0.2),
              ...textInputStyle,
            }}
            codeTextStyle={{
              color: activeColors.text,
              height: moderateScale(50, 0.2),
              lineHeight: moderateScale(50, 0.2),
              ...codeTextStyle,
            }}
            countryPickerButtonStyle={{
              borderRightWidth: 1,
              borderColor: activeColors.borderColor,
              ...countryPickerButtonStyle,
            }}
            countryPickerProps={modifiedCountryPickerProps}
            renderDropdownImage={
              <CachedImage
                source={icons.chevron_down}
                style={{
                  width: moderateScale(10, 0.2),
                  height: moderateScale(10, 0.2),
                  tintColor: activeColors.text,
                }}
                imageStyle={{
                  width: moderateScale(10, 0.2),
                  height: moderateScale(10, 0.2),
                  tintColor: activeColors.text,
                }}
              />
            }
            textInputProps={{
              placeholder: '',
              ...textInputProps,
            }}
          />
        </View>
      </View>
    );
  },
);

export default PhoneWithCountryCodeGroup;
