import React, {useState, forwardRef} from 'react';
import {
  Text,
  TextInputProps,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {FONTS} from '../../constants';
import {moderateScale} from 'react-native-size-matters';
import {CachedImage} from '@georstat/react-native-image-cache';
import {BottomSheetTextInput, BottomSheetView} from '@gorhom/bottom-sheet';

interface InputGroupForSheetProps extends TextInputProps {
  activeColors: any;
  icon?: string;
  iconStyle?: object;
  onIconClick?: () => void;
  containerStyle?: ViewStyle;
  innerContainerStyle?: ViewStyle;
  label?: string;
  labelStyle?: TextStyle;
  labelContainerStyle?: ViewStyle;
  errorLabelStyle?: TextStyle;
  appendComponent?: React.ReactNode;
  prependComponent?: React.ReactNode;
  errorMsg?: string;
  inputStyle?: TextStyle;
  readOnly?: boolean;
}

const InputGroupForSheet = forwardRef<
  typeof BottomSheetTextInput,
  InputGroupForSheetProps
>(
  (
    {
      activeColors,
      icon,
      iconStyle,
      onIconClick,
      containerStyle,
      innerContainerStyle = {},
      label,
      labelStyle = {},
      labelContainerStyle = {},
      errorLabelStyle = {},
      placeholder,
      inputStyle,
      appendComponent,
      prependComponent,
      onChange,
      secureTextEntry,
      keyboardType = 'default',
      autoComplete = 'off',
      autoCapitalize = 'none',
      textContentType = 'none',
      errorMsg = '',
      value,
      returnKeyType = 'done',
      readOnly = false,
      ...restProps
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
      <BottomSheetView
        style={[{marginBottom: moderateScale(15, 0.2)}, containerStyle]}>
        <BottomSheetView
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            ...labelContainerStyle,
          }}>
          <Text
            style={[
              {
                ...(FONTS.body5 as TextStyle),
                color: activeColors.text,
                fontSize: moderateScale(14, 0.2),
              },
              labelStyle,
            ]}>
            {label}
          </Text>
          <Text
            style={[
              {
                color: activeColors.error,
                fontSize: 12,
                opacity: errorMsg === '' ? 0 : 1,
              },
              errorLabelStyle,
            ]}>
            {errorMsg === '' ? '* mandatory' : errorMsg}
          </Text>
        </BottomSheetView>
        <BottomSheetView style={{flexDirection: 'row', alignItems: 'center'}}>
          {prependComponent}
          <BottomSheetView
            style={[
              {
                position: 'relative',
                width: icon ? '80%' : '100%',
                height: moderateScale(50, 0.2),
                paddingHorizontal: moderateScale(15),
                marginTop: moderateScale(5),
                borderBottomLeftRadius: 6,
                borderTopLeftRadius: 6,
                borderTopRightRadius: icon ? 0 : 6,
                borderBottomRightRadius: icon ? 0 : 6,
                backgroundColor: activeColors.input,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: isFocused
                  ? activeColors.primary
                  : errorMsg === ''
                  ? 'transparent'
                  : activeColors.error,
              },
              innerContainerStyle,
            ]}>
            <BottomSheetTextInput
              ref={ref as any}
              style={[
                {
                  ...(FONTS.body1 as TextStyle),
                  flex: 1,
                  color: activeColors.text,
                  fontSize: moderateScale(13),
                  opacity: readOnly ? 0.4 : 1,
                },
                inputStyle,
              ]}
              placeholder={placeholder}
              placeholderTextColor="#D2D4D5"
              secureTextEntry={secureTextEntry}
              value={value}
              keyboardType={keyboardType}
              autoComplete={autoComplete}
              autoCapitalize={autoCapitalize}
              textContentType={textContentType}
              onChangeText={(text: any) => onChange && onChange(text)}
              returnKeyType={returnKeyType}
              editable={!readOnly}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...restProps}
            />
            {appendComponent}
          </BottomSheetView>
          {icon && (
            <TouchableOpacity
              style={{
                position: 'relative',
                width: '20%',
                height: moderateScale(50, 0.2),
                paddingHorizontal: moderateScale(15),
                marginTop: moderateScale(5),
                borderBottomRightRadius: 6,
                borderTopRightRadius: 6,
                backgroundColor: activeColors.input,
                borderLeftWidth: 1,
                borderColor: activeColors.borderColor,
                borderStyle: 'solid',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={onIconClick}>
              <CachedImage
                source={icon}
                style={iconStyle}
                imageStyle={iconStyle}
              />
            </TouchableOpacity>
          )}
        </BottomSheetView>
      </BottomSheetView>
    );
  },
);

export default InputGroupForSheet;
