import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import { MainLayoutProps } from "@/types/layoutTypes";
import { Platform, TouchableOpacity, View, ViewStyle } from "react-native";
import { router } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { COLORS } from "@/constants/theme";
import { Image, ImageBackground } from "expo-image";

interface EducationLayoutProps extends MainLayoutProps {
  image?: string;
  imageStyles?: any;
  backgroundStyles?: ViewStyle;
}

const EducationLayout: React.FC<EducationLayoutProps> = ({
  returnIcon,
  returnIconStyle,
  contentContainerStyle = {},
  children,
  onReturnPress,
  image = require("@/assets/images/recycle-world.png"),
  imageStyles,
  actionIcon,
  actionIconStyle,
  onActionPress,
  backgroundStyles,
}) => {
  if (!onReturnPress) {
    onReturnPress = () => router.back();
  }
  const { mode } = useTheme();
  const isDarkMode = mode === "dark";
  let activeColors = COLORS[mode];
  let insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: activeColors.background,
          paddingTop: Platform.OS === "android" ? 20 : 0,
        },
        contentContainerStyle,
      ]}
      edges={["left", "right"]}
    >
      <View style={[styles.gradientWrapper, backgroundStyles]}>
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
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onActionPress}
              style={styles.actionButton}
            >
              <Image
                source={actionIcon}
                style={[styles.actionIcon, actionIconStyle]}
                tintColor={activeColors.text}
                contentFit={"contain"}
              />
            </TouchableOpacity>
          </View>
          <ImageBackground
            style={[styles.image, { opacity: isDarkMode ? 0.4 : 1 }]}
            source={require("@/assets/images/scan-page-bg.png")}
            contentFit="cover"
            contentPosition={"top"}
          />
          <View style={styles.mainImageWrapper}>
            <Image
              source={image}
              style={[styles.mainImage, imageStyles]}
              contentFit={"contain"}
            />
          </View>
        </View>
      </View>
      <View
        style={[styles.content, { backgroundColor: activeColors.background }]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};
const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "20@ms0.2",
  },
  returnButton: {
    marginTop: -10,
  },
  returnIcon: {
    width: "24@ms0.2",
    height: "23@ms0.2",
  },
  actionButton: {
    marginTop: -10,
  },
  actionIcon: {
    width: "24@ms0.2",
    height: "24@ms0.2",
  },
  gradient: {
    height: "270@ms",
  },
  gradientWrapper: {
    marginTop: "-20@ms",
    paddingTop: "20@ms",
    overflow: "hidden",
    position: "relative",
  },
  image: {
    position: "absolute",
    zIndex: -2,
    top: -20,
    width: "100%",
    height: "100%",
  },
  mainImageWrapper: {
    position: "relative",
    zIndex: -1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: "230@ms0.2",
    marginTop: "-60@ms0.2",
  },
  mainImage: {
    width: "230@ms0.2",
    height: "230@ms0.2",
  },
  content: {
    flex: 1,
    zIndex: 2,
    marginTop: "-20@ms",
    borderTopLeftRadius: "20@ms",
    borderTopRightRadius: "20@ms",
  },
});
export default EducationLayout;
