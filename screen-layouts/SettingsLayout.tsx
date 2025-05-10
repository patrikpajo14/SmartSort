import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { MainLayoutProps } from "@/types/layoutTypes";
import { Text, TextStyle, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import { truncateText } from "@/utils/truncateText";
import { Image } from "expo-image";

const SettingsLayout: React.FC<MainLayoutProps> = ({
  title,
  returnIcon,
  returnLabel,
  returnIconStyle,
  onActionPress,
  actionIcon,
  actionText,
  actionIconStyle,
  actionDisabled,
  contentContainerStyle = {},
  children,
  onReturnPress,
}) => {
  if (!onReturnPress) {
    onReturnPress = () => router.back();
  }
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  let insets = useSafeAreaInsets();
  const truncatedTitle = truncateText(title || "", 30);
  return (
    <SafeAreaView
      style={[
        { flex: 1, backgroundColor: activeColors.background },
        contentContainerStyle,
      ]}
      edges={["left", "right"]}
    >
      <View style={styles.gradientWrapper}>
        <View style={styles.gradient}>
          <View
            style={[
              styles.container,
              contentContainerStyle,
              { paddingTop: insets.top },
            ]}
          >
            <TouchableOpacity
              onPress={onReturnPress}
              style={styles.returnButton}
            >
              <Image
                source={returnIcon}
                style={[styles.returnIcon, returnIconStyle]}
                tintColor={activeColors.text}
                contentFit={"contain"}
              />
              {returnLabel && (
                <Text
                  style={[styles.returnLabel, { color: activeColors.text }]}
                >
                  {returnLabel}
                </Text>
              )}
            </TouchableOpacity>
            {title && (
              <Text style={[styles.title, { color: activeColors.text }]}>
                {truncatedTitle}
              </Text>
            )}
            {actionIcon && onActionPress ? (
              <TouchableOpacity
                onPress={onActionPress}
                disabled={actionDisabled}
                style={styles.actionButton}
              >
                <Image
                  source={actionIcon}
                  style={[styles.actionIcon, actionIconStyle]}
                  tintColor={activeColors.text}
                  contentFit={"contain"}
                />
                {actionText && (
                  <Text
                    style={[styles.actionLabel, { color: activeColors.text }]}
                  >
                    {actionText}
                  </Text>
                )}
              </TouchableOpacity>
            ) : (
              <View style={styles.placeholder} />
            )}
          </View>
        </View>
      </View>

      {children}
    </SafeAreaView>
  );
};
const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "30@ms0.2",
  },
  returnButton: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 999,
    paddingVertical: "10@ms",
  },
  returnIcon: {
    width: "24@ms0.2",
    height: "23@ms0.2",
  },
  returnLabel: {
    ...FONTS.body1,
    fontSize: "14@ms",
    lineHeight: "16@ms",
    marginLeft: "10@ms",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 999,
    paddingVertical: "10@ms",
  },
  actionIcon: {
    width: "24@ms0.2",
    height: "23@ms0.2",
  },
  actionLabel: {
    ...FONTS.body1,
    fontSize: "14@ms",
    lineHeight: "16@ms",
    marginLeft: "10@ms",
  },
  title: {
    ...(FONTS.semiBold2 as TextStyle),
    fontSize: "18@ms0.2",
    lineHeight: "20@ms0.2",
  },

  placeholder: {
    width: "25@ms",
  },
  gradient: {
    height: moderateScale(175, 0.2),
  },
  gradientWrapper: {
    overflow: "hidden",
    borderBottomLeftRadius: moderateScale(30, 0.2),
    borderBottomRightRadius: moderateScale(30, 0.2),
    position: "relative",
  },
});
export default SettingsLayout;
