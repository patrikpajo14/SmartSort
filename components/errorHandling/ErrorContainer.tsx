import React from "react";
import { Text, View, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import PrimaryButton from "@/components/ui/PrimaryButton";

type ErrorContainerProps = {
  errorMessage?: string;
  callback?: () => void;
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
  errorCode?: number;
};

const ErrorContainer = ({
  errorMessage = "Something went wrong! Please try restarting the application!",
  callback,
  titleStyle,
  messageStyle,
  errorCode,
}: ErrorContainerProps): React.ReactElement => {
  const { t } = useTranslation();
  const { mode } = useTheme();
  let activeColors = COLORS[mode];

  return (
    <View style={styles.errorContainer}>
      {errorCode !== 400 && errorCode !== 503 && (
        <Text
          style={[
            styles.errorText,
            {
              ...(FONTS.h2 as TextStyle),
              fontSize: 40,
              paddingBottom: 10,
              lineHeight: 48,
              color: activeColors.text,
            },
            titleStyle,
          ]}
        >
          {t("general.error")}
        </Text>
      )}
      <Text
        style={[styles.errorText, { color: activeColors.text }, messageStyle]}
      >
        {errorMessage}
      </Text>
      {callback && (
        <PrimaryButton
          label={t("general.retry")}
          onPress={callback}
          outerContainerStyle={{
            height: 50,
            alignItems: "center",
            borderRadius: 25,
            marginTop: 30,
            width: 150,
          }}
        />
      )}
    </View>
  );
};

type Styles = {
  errorContainer: ViewStyle;
  errorText: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 150,
    padding: 15,
  },
  errorText: {
    ...(FONTS.body1 as TextStyle),
    fontSize: 18,
    lineHeight: 30,
    textAlign: "center",
  },
});

export default ErrorContainer;
