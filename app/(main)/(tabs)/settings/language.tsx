import { ScrollView, Text, TextStyle } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import MainLayout from "@/screen-layouts/MainLayout";
import icons from "@/constants/icons";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import SubMenu from "@/screens/settings-screens/components/SubMenu";
import { langResources } from "@/services/i18n";
import { useTranslation } from "react-i18next";
import useGlobalStore from "@/stores/globalStore";
import i18next from "i18next";

export default function LanguageScreen() {
  const { t } = useTranslation();
  const lang = useGlobalStore((state) => state.lang);
  const setLang = useGlobalStore((state) => state.setLang);
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  const changeLanguage = (val: string) => {
    setLang(val);
    i18next.changeLanguage(val);
  };

  return (
    <MainLayout
      title={t("settings.app_language")}
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
          {t("settings.choose_language")}
        </Text>
        <SubMenu
          data={Object.keys(langResources)}
          changeValue={changeLanguage}
          selectedValue={lang}
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
