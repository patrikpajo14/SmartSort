import { useLocalSearchParams, useNavigation, router } from "expo-router";
import { useLayoutEffect, useState } from "react";
import EducationLayout from "@/screen-layouts/EducationLayout";
import { COLORS } from "@/constants/theme";
import { moderateScale } from "react-native-size-matters";
import icons from "@/constants/icons";
import { useTheme } from "@/context/ThemeContext";
import EducationPreview from "@/screens/education-screens/EducationPreview";
import EducationGuidelinesScreen from "@/screens/education-screens/EducationGuidelines";

export default function EducationCategoryScreen() {
  const { category } = useLocalSearchParams();
  const navigation = useNavigation();
  const { mode } = useTheme();
  const isDarkMode = mode === "dark";
  let activeColors = COLORS[mode ?? "light"];

  const [screen, setScreen] = useState<"Preview" | "Guidelines">("Preview");
  const [enabled, setEnabled] = useState<boolean>(true);

  useLayoutEffect(() => {
    navigation.setOptions({ title: String(category) });
  }, [category]);

  const handleGoBack = () => {
    if (screen === "Guidelines") {
      setScreen("Preview");
    } else {
      router.back();
    }
  };

  const handleToggleSwitch = () => {
    setEnabled(!enabled);
  };

  const renderScreen = () => {
    switch (screen) {
      case "Preview":
        return (
          <EducationPreview
            category={category}
            onPress={() => {
              setScreen("Guidelines");
            }}
          />
        );
      case "Guidelines":
        return (
          <EducationGuidelinesScreen
            category={category}
            toggleSwitch={handleToggleSwitch}
          />
        );
      default:
        return null;
    }
  };

  const selectedImage =
    screen === "Guidelines"
      ? require("@/assets/images/plasic-guide.png")
      : require("@/assets/images/recycle-world.png");

  return (
    <EducationLayout
      contentContainerStyle={{ paddingBottom: moderateScale(30) }}
      returnIcon={icons.chevron_left}
      returnIconStyle={{
        tintColor:
          screen == "Guidelines"
            ? activeColors.white
            : isDarkMode
              ? activeColors.white
              : activeColors.primaryDark,
      }}
      onReturnPress={handleGoBack}
      actionIcon={icons.close}
      actionIconStyle={{
        tintColor:
          screen == "Guidelines"
            ? activeColors.white
            : isDarkMode
              ? activeColors.white
              : activeColors.primaryDark,
      }}
      onActionPress={() => router.back()}
      image={selectedImage}
      backgroundStyles={{
        backgroundColor:
          screen == "Guidelines"
            ? enabled
              ? activeColors.primary
              : activeColors.redLight
            : "transparent",
      }}
    >
      {renderScreen()}
    </EducationLayout>
  );
}
