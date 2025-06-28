import {
  View,
  Text,
  TextStyle,
  ScrollView,
  RefreshControl,
} from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import MainLayout from "@/screen-layouts/MainLayout";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import HomeWidget from "@/screens/home-screen/HomeWidget";
import { Image } from "expo-image";
import EducationFlatList from "@/screens/home-screen/EducationFlatList";
import { router } from "expo-router";
import { useAuthContext } from "@/context/auth/authContext";
import { useFetchHomeScreen } from "@/reactQuery/previewScreens";
import useGlobalStore from "@/stores/globalStore";
import useRefetchOnFocus from "@/hooks/useRefetchOnFocus";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import NoContent from "@/components/NoContent";
import icons from "@/constants/icons";
export default function HomeScreen() {
  const { t } = useTranslation();
  const { mode } = useTheme();
  const isDarkMode = mode === "dark";
  let activeColors = COLORS[mode ?? "light"];
  const { user, isStorageLoading } = useAuthContext();
  const [refreshing, setRefreshing] = useState(false);
  const lang = useGlobalStore((state) => state.lang);

  const { data, isError, refetch, isPending } = useFetchHomeScreen(
    lang,
    user?.id,
    isStorageLoading,
  );

  useRefetchOnFocus(refetch);

  useEffect(() => {
    if (!isPending && isError) {
      Toast.show({
        type: "error",
        text1: t("general.error"),
        text2: t("general.error_data"),
      });
    }
  }, [isPending, isError, t]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  console.log("HOME SCREEN DATA", data);

  return (
    <MainLayout>
      <View style={styles.imageWrap}>
        <Image
          style={[styles.image, { opacity: isDarkMode ? 0.4 : 1 }]}
          source={require("@/assets/images/bg-shape.png")}
          contentFit="cover"
        />
      </View>

      <View style={styles.container}>
        <View style={styles.textWrap}>
          <View style={styles.titleWrap}>
            <Text style={[styles.title, { color: activeColors.text }]}>
              {t("home.title")}
            </Text>
            <Text style={[styles.title, { color: activeColors.text }]}>
              {user?.firstName}
            </Text>
          </View>
          <Text style={[styles.description, { color: activeColors.text }]}>
            {t("home.description")}
          </Text>
        </View>
        <HomeWidget
          title={t("home.scan_widget_text")}
          buttonText={t("home.scan_widget_btn_text")}
          onPress={() => {
            router.navigate("/(main)/(tabs)/scanner");
          }}
          image={require("@/assets/images/earth.png")}
        />
        <ScrollView
          style={styles.scrollContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={activeColors.white}
            />
          }
        >
          {data?.data?.educations?.length > 0 ? (
            <EducationFlatList educations={data?.data?.educations} />
          ) : (
            <NoContent
              title={t("education.empty_educations_title")}
              description={t("education.empty_educations_description")}
              icon={icons.education}
            />
          )}

          <HomeWidget
            title={t("home.map_widget_text")}
            buttonText={t("home.map_widget_btn_text")}
            onPress={() => {
              router.navigate("/(main)/(tabs)/map");
            }}
            image={require("@/assets/images/trash-image.png")}
            imageStyles={{ width: moderateScale(110) }}
            containerStyles={{ marginBottom: moderateScale(40) }}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
}

const styles = ScaledSheet.create({
  container: {
    height: SIZES.height,
    paddingHorizontal: "20@ms",
    paddingBottom: "75@ms",
  },
  scrollContainer: {
    marginHorizontal: "-20@ms",
    paddingHorizontal: "20@ms",
  },
  textWrap: {
    width: "100%",
    paddingTop: "15@ms",
    paddingBottom: "30@ms",
  },
  titleWrap: {
    flexDirection: "row",
    marginBottom: "5@ms",
    gap: 4,
  },
  imageWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "300@ms",
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundPosition: "bottom",
  },
  title: {
    ...(FONTS.semiBold1 as TextStyle),
    fontSize: "30@ms",
  },
  description: {
    ...(FONTS.body1 as TextStyle),
  },
});
