import React, {useState} from 'react';
import {Text, TextStyle, ViewStyle} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {BottomSheetTextInput, BottomSheetView} from '@gorhom/bottom-sheet';
import {FONTS} from '../../constants';

interface PhoneGroupProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  activeColors: any;
  errorMsg?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

const PhoneGroup: React.FC<PhoneGroupProps> = ({
  label,
  value,
  onChangeText,
  placeholder = 'Enter phone number',
  keyboardType = 'phone-pad',
  activeColors,
  errorMsg = '',
  containerStyle,
  inputStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <BottomSheetView style={[containerStyle]}>
      <Text
        style={[
          {
            color: activeColors.text,
            fontSize: moderateScale(14, 0.2),
            paddingBottom: moderateScale(5),
          },
        ]}>
        {label}
      </Text>
      <BottomSheetTextInput
        style={[
          {
            position: 'relative',
            width: '100%',
            height: moderateScale(50, 0.2),
            ...(FONTS.body1 as TextStyle),
            color: activeColors.text,
            fontSize: moderateScale(13),
            paddingHorizontal: moderateScale(15),
            backgroundColor: activeColors.input,
            borderWidth: 1,
            borderRadius: 6,
            borderStyle: 'solid',
            borderColor: isFocused
              ? activeColors.primary
              : errorMsg === ''
              ? 'transparent'
              : activeColors.error,
          },
          inputStyle,
        ]}
        placeholder={placeholder}
        placeholderTextColor={activeColors.lightText}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {errorMsg ? (
        <Text
          style={{
            color: activeColors.error,
            marginTop: 5,
            fontSize: 11,
            position: 'absolute',
            top: '100%',
          }}>
          {errorMsg}
        </Text>
      ) : null}
    </BottomSheetView>
  );
};

export default PhoneGroup;
