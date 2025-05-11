import { ScrollView, StyleSheet, Text, TextStyle, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import MainLayout from "@/screen-layouts/MainLayout";
import icons from "@/constants/icons";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import SubMenu from "@/screens/settings-screens/components/SubMenu";
import { langResources } from "@/services/i18next";

export default function LanguageScreen() {
  // const { t } = useTranslation();
  // const lang = useGlobalStore((state) => state.lang);
  // const setLang = useGlobalStore((state) => state.setLang);
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  const changeLanguage = (val: string) => {
    // setLang(val);
    // i18next.changeLanguage(val);
  };

  let data = Object.keys(langResources);
  // let title = t("settings.app_language");
  // let sectionTitle = t("settings.choose_language");
  let title = "Languages";
  let sectionTitle = "Chose language";
  let changeValue = changeLanguage;
  // let selectedValue = lang;
  let selectedValue = "HR";

  return (
    <MainLayout
      title={title}
      returnIcon={icons.chevron_left}
      contentContainerStyle={{ paddingHorizontal: moderateScale(20) }}
    >
      <ScrollView
        style={[
          styles.scrollViewContainer,
          { backgroundColor: activeColors.background },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: activeColors.text }]}>
          {sectionTitle}
        </Text>
        <SubMenu
          data={data}
          changeValue={changeValue}
          selectedValue={selectedValue}
        />
      </ScrollView>
    </MainLayout>
  );
}

const styles = ScaledSheet.create({
  scrollViewContainer: {
    flex: 1,
  },

  sectionTitle: {
    ...(FONTS.h5 as TextStyle),
    fontSize: "15@ms",
    marginTop: "20@ms",
    marginBottom: "10@ms",
  },
});
