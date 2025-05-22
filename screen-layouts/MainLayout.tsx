import React from "react";
import { SafeAreaView, Edge } from "react-native-safe-area-context";
import MainSectionTitle from "../components/common/MainSectionTitle";
import { moderateScale } from "react-native-size-matters";
import { MainLayoutProps } from "@/types/layoutTypes";
import { COLORS } from "@/constants/theme";
import { useColorScheme } from "@/hooks/useColorScheme";
import { router } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

const MainLayout: React.FC<MainLayoutProps> = ({
  title,
  returnIcon,
  returnLabel,
  returnIconStyle,
  contentContainerStyle = {},
  headerContainerStyle = {},
  children,
  refreshing,
  actionIcon,
  onActionPress,
  onReturnPress,
  actionIconStyle,
  actionText,
  customBackButton = null,
  actionButtonStyle,
  bottomInset,
}) => {
  if (!onReturnPress) {
    onReturnPress = () => router.back();
  }
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];
  let insets = bottomInset
    ? ["left", "right", "top", "bottom"]
    : ["left", "right", "top"];
  return (
    <SafeAreaView
      style={[
        { flex: 1, backgroundColor: activeColors.background },
        contentContainerStyle,
      ]}
      edges={insets as Edge[]}
    >
      <MainSectionTitle
        returnIcon={returnIcon}
        returnLabel={returnLabel}
        returnIconStyle={returnIconStyle}
        actionIcon={actionIcon}
        onActionPress={onActionPress}
        title={title}
        refreshing={refreshing}
        onReturnPress={onReturnPress}
        customBackButton={customBackButton}
        actionIconStyle={actionIconStyle}
        actionText={actionText}
        activeColors={activeColors}
        contentContainerStyle={{
          paddingBottom: moderateScale(5),
          paddingTop: moderateScale(5),
          zIndex: 11,
          ...headerContainerStyle,
        }}
        actionButtonStyle={actionButtonStyle}
      />

      {children}
    </SafeAreaView>
  );
};

export default MainLayout;
