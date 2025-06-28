import { useLocalSearchParams, useNavigation, router } from "expo-router";
import { useLayoutEffect, useState } from "react";
import EducationLayout from "@/screen-layouts/EducationLayout";
import { COLORS } from "@/constants/theme";
import { moderateScale } from "react-native-size-matters";
import icons from "@/constants/icons";
import { useTheme } from "@/context/ThemeContext";
import EducationPreview from "@/screens/education-screens/EducationPreview";
import EducationGuidelinesScreen from "@/screens/education-screens/EducationGuidelines";
import { useFetchSingleEducation } from "@/reactQuery/educations";
import useGlobalStore from "@/stores/globalStore";
import ErrorContainer from "@/components/errorHandling/ErrorContainer";
import Spinner from "@/components/common/Spinner";

export default function EducationCategoryScreen() {
  const { id, category } = useLocalSearchParams();
  const navigation = useNavigation();
  const { mode } = useTheme();
  const isDarkMode = mode === "dark";
  let activeColors = COLORS[mode ?? "light"];
  const lang = useGlobalStore((state) => state.lang);
  const [screen, setScreen] = useState<"Preview" | "Guidelines">("Preview");
  const [refreshing, setRefreshing] = useState(false);
  const [enabled, setEnabled] = useState<boolean>(true);

  const { data, isPending, isError, refetch } = useFetchSingleEducation(
    lang,
    id as string,
  );

  console.log("SINGLE EDUCATION DATA", data, id, category);

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

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderScreen = () => {
    switch (screen) {
      case "Preview":
        return (
          <EducationPreview
            data={data}
            refreshing={refreshing}
            onRefresh={onRefresh}
            onPress={() => {
              setScreen("Guidelines");
            }}
          />
        );
      case "Guidelines":
        return (
          <EducationGuidelinesScreen
            data={data}
            refreshing={refreshing}
            onRefresh={onRefresh}
            toggleSwitch={handleToggleSwitch}
          />
        );
      default:
        return null;
    }
  };

  const guideImages: Record<string, any> = {
    plastic: require("@/assets/images/guides/plastic-guide.png"),
    glass: require("@/assets/images/guides/glass-guide.png"),
    paper: require("@/assets/images/guides/paper-guide.png"),
    metal: require("@/assets/images/guides/metal-guide.png"),
    bio: require("@/assets/images/guides/bio-guide.png"),
    carton: require("@/assets/images/guides/carton-guide.png"),
    clothes: require("@/assets/images/guides/clothes-guide.png"),
    batteries: require("@/assets/images/guides/batteries-guide.png"),
    electronics: require("@/assets/images/guides/electronics-guide.png"),
    construction: require("@/assets/images/guides/construction-guide.png"),
    storage: require("@/assets/images/guides/construction-guide.png"),
    general: require("@/assets/images/guides/general-guide.png"),
  };

  const selectedImage =
    screen === "Guidelines"
      ? guideImages[data?.category || "general"]
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
      {isPending && <Spinner />}
      {!isPending && isError && <ErrorContainer callback={refetch} />}
      {!isPending && !isError && data && renderScreen()}
    </EducationLayout>
  );
}
