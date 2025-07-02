import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import { SIZES } from "@/constants/theme";
import MainLayout from "@/screen-layouts/MainLayout";
import EducationItem from "@/screens/education-screens/components/EducationItem";
import { Image } from "expo-image";
import { useEffect } from "react";
import { useFetchAllEducations } from "@/reactQuery/educations";
import useGlobalStore from "@/stores/globalStore";
import { Education } from "@/types/global";
import icons from "@/constants/icons";
import NoContent from "@/components/NoContent";
import Spinner from "@/components/common/Spinner";
import ErrorContainer from "@/components/errorHandling/ErrorContainer";

export default function EducationScreen() {
  const { t } = useTranslation();
  const lang = useGlobalStore((state) => state.lang);
  const { id, category } = useLocalSearchParams();
  const {
    data: educationsData,
    refetch,
    isError,
    isPending,
  } = useFetchAllEducations(lang);

  useEffect(() => {
    if (category) {
      router.push({
        pathname: "/(main)/education/[category]",
        params: { id: id as string, category: category as string },
      });
    }
  }, [category]);

  console.log("EDUCATIONS DATA", educationsData?.data);

  return (
    <MainLayout
      title={t("education.title")}
      headerContainerStyle={{ paddingHorizontal: moderateScale(20) }}
    >
      <View style={styles.imageWrap}>
        <Image
          style={styles.image}
          source={require("@/assets/images/scan-page-bg.png")}
          contentFit="cover"
        />
      </View>
      <View style={styles.container}>
        {isPending && <Spinner />}
        {!isPending && isError && <ErrorContainer callback={refetch} />}
        {!isPending && !isError && educationsData?.length > 0 ? (
          <View style={styles.itemList}>
            {educationsData?.map((item: Education) => (
              <EducationItem
                key={item.id}
                item={item}
                outerContainerStyle={{
                  width: (SIZES.width - 65) / 3,
                  height: (SIZES.width - 65) / 3,
                }}
                onPress={() =>
                  router.push({
                    pathname: "/(main)/education/[category]",
                    params: { id: item.id, category: item.category },
                  })
                }
              />
            ))}
          </View>
        ) : (
          <View style={{ minHeight: moderateScale(250) }}>
            <NoContent
              title={t("education.empty_educations_title")}
              description={t("education.empty_educations_description")}
              icon={icons.education}
            />
          </View>
        )}
      </View>
    </MainLayout>
  );
}

const styles = ScaledSheet.create({
  container: {
    paddingTop: "40@ms",
    paddingHorizontal: "20@ms",
  },
  itemList: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    flexWrap: "wrap",
    gap: "10@ms",
  },
  imageWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "50%",
    minHeight: "650@ms",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
