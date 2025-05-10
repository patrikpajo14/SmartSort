import React, { useState, forwardRef, Ref } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  ViewStyle,
  TextStyle,
  useColorScheme,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLORS, FONTS } from "@/constants/theme";

interface FormInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  innerContainerStyle?: ViewStyle;
  label?: string;
  labelStyle?: TextStyle;
  labelContainerStyle?: ViewStyle;
  errorLabelStyle?: TextStyle;
  appendComponent?: React.ReactNode;
  prependComponent?: React.ReactNode;
  errorMsg?: string;
  nextInputRef?: Ref<TextInput>;
  inputStyle?: TextStyle;
  showMaxLength?: boolean;
  maxLength?: number;
}

const FormInput = forwardRef<TextInput, FormInputProps>(
  (
    {
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
      keyboardType = "default",
      autoComplete = "off",
      autoCapitalize = "none",
      textContentType = "none",
      errorMsg = "",
      value,
      returnKeyType = "done",
      nextInputRef,
      showMaxLength = true,
      maxLength = 150,
      ...restProps
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const colorScheme = useColorScheme();
    let activeColors = COLORS[colorScheme ?? "light"];

    return (
      <View style={[containerStyle]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            paddingTop: moderateScale(5),
            ...labelContainerStyle,
          }}
        >
          <Text
            style={[
              {
                ...(FONTS.body5 as TextStyle),
                color: activeColors.text,
                fontSize: moderateScale(16, 0.2),
                lineHeight: moderateScale(20, 0.2),
                paddingTop: moderateScale(10),
              },
              labelStyle,
            ]}
          >
            {label}
          </Text>
          {!secureTextEntry && (
            <Text
              style={[
                {
                  color: activeColors.danger,
                  fontSize: 12,
                  opacity: errorMsg === "" ? 0 : 1,
                },
                errorLabelStyle,
              ]}
            >
              {errorMsg}
            </Text>
          )}
        </View>
        <View>
          {prependComponent}
          <View
            style={[
              {
                position: "relative",
                height: moderateScale(50, 0.2),
                paddingHorizontal: moderateScale(15),
                marginTop: moderateScale(5),
                borderRadius: 6,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: isFocused
                  ? activeColors.primary
                  : errorMsg === ""
                    ? activeColors.border
                    : activeColors.danger,
              },
              innerContainerStyle,
            ]}
          >
            <TextInput
              ref={ref}
              style={[
                {
                  ...(FONTS.body1 as TextStyle),
                  flex: 1,
                  color: activeColors.text,
                  fontSize: moderateScale(13),
                },
                inputStyle,
              ]}
              placeholder={placeholder}
              maxLength={maxLength}
              placeholderTextColor={activeColors.textLightGray}
              secureTextEntry={secureTextEntry}
              value={value}
              keyboardType={keyboardType}
              autoComplete={autoComplete}
              autoCapitalize={autoCapitalize}
              textContentType={textContentType}
              onChangeText={(text: any) => onChange && onChange(text)}
              returnKeyType={returnKeyType}
              onSubmitEditing={() => {
                if (
                  nextInputRef &&
                  typeof nextInputRef !== "function" &&
                  nextInputRef.current &&
                  "focus" in nextInputRef.current
                ) {
                  nextInputRef.current.focus();
                }
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...restProps}
            />
            {secureTextEntry && (
              <Text
                style={[
                  {
                    color: activeColors.danger,
                    fontSize: 12,
                    opacity: errorMsg === "" ? 0 : 1,
                    position: "absolute",
                    right: 5,
                    bottom: 3,
                  },
                  errorLabelStyle,
                ]}
              >
                {errorMsg}
              </Text>
            )}
            {appendComponent}
          </View>
          {isFocused && showMaxLength && (
            <View
              style={{
                position: "absolute",
                right: 0,
                bottom: -22,
                backgroundColor: activeColors.primary,
                paddingHorizontal: moderateScale(5),
                paddingVertical: moderateScale(2),
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  alignSelf: "flex-end",
                  color: activeColors.white,
                  ...FONTS.body1,
                  fontSize: moderateScale(12),
                }}
              >
                {`${value?.length || 0}/${maxLength}`}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  },
);

export default FormInput;
