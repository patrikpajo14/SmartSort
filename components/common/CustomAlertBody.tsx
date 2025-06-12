import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { AlertType } from "@/types/global";
import { useTheme } from "@/context/ThemeContext";
import { COLORS } from "@/constants/theme";
import { Image } from "expo-image";
import icons from "@/constants/icons";

interface CustomAlertPropsProps {
  title: string;
  message?: string;
  onClose: () => void;
  type?: AlertType;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomAlertProps: React.FC<CustomAlertPropsProps> = ({
  title,
  message,
  onClose,
  type = "info",
  style,
  textStyle = {},
}) => {
  const { mode } = useTheme();
  const isDarkMode = mode === "dark";
  let activeColors = COLORS[mode];

  const getAlertStyles = (type: AlertType) => {
    switch (type) {
      case "success":
        return {
          borderColor: activeColors.success,
          backgroundColor: activeColors.successLight,
          textColor: activeColors.success,
        };
      case "error":
        return {
          borderColor: activeColors.danger,
          backgroundColor: activeColors.dangerLight,
          textColor: activeColors.danger,
        };
      case "warning":
        return {
          borderColor: activeColors.warning,
          backgroundColor: activeColors.warningLight,
          textColor: activeColors.warning,
        };
      case "info":
      default:
        return {
          borderColor: activeColors.info,
          backgroundColor: activeColors.infoLight,
          textColor: activeColors.info,
        };
    }
  };

  const alertStyles = getAlertStyles(type);

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: alertStyles.borderColor,
          backgroundColor: alertStyles.borderColor,
        },
        style,
      ]}
      pointerEvents="box-none"
    >
      <View
        style={[
          styles.inner,
          {
            backgroundColor: alertStyles.backgroundColor,
          },
        ]}
        pointerEvents="box-none"
      >
        <View style={styles.textWrap} pointerEvents="none">
          <>
            {title && (
              <Text
                style={[styles.title, { color: activeColors.text }, textStyle]}
              >
                {title}
              </Text>
            )}
            {message && (
              <Text
                style={[
                  styles.message,
                  {
                    color: isDarkMode
                      ? activeColors.textGray
                      : activeColors.textLightGray,
                  },
                ]}
              >
                {message}
              </Text>
            )}
          </>
        </View>
        <TouchableOpacity
          onPress={onClose}
          style={styles.closeButton}
          activeOpacity={0.7}
        >
          <Image
            source={icons.close}
            style={[styles.closeIcon, { opacity: isDarkMode ? 1 : 0.7 }]}
            tintColor={activeColors.textGray}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    borderWidth: 1,
    marginHorizontal: "20@ms0.2",
    borderRadius: "10@ms0.2",
  },
  inner: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: "15@ms0.2",
    paddingVertical: "3@ms0.2",
    borderRadius: "10@ms0.2",
  },
  textWrap: {
    maxWidth: "85%",
    paddingVertical: "10@ms0.2",
  },
  title: {
    fontWeight: "bold",
    fontSize: "14@ms0.2",
  },
  message: {
    fontWeight: "400",
    fontSize: "11@ms0.2",
    paddingBottom: "5@ms0.2",
  },
  closeButton: {
    paddingLeft: "10@ms0.2",
    paddingTop: "10@ms0.2",
  },
  closeIcon: {
    width: "15@ms0.2",
    height: "15@ms0.2",
  },
});

export default CustomAlertProps;
