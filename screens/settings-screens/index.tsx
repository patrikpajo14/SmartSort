import { ScrollView } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import React, { useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import GeneralModal from "../../components/common/GeneralModal";
import { COLORS } from "@/constants/theme";
import { useSession } from "@/context/AuthContext";
import icons from "@/constants/icons";
import { useTheme } from "@/context/ThemeContext";
import SettingsLayout from "@/screen-layouts/SettingsLayout";
import Profile from "@/screens/settings-screens/components/Profile";
import GeneralMenu from "@/components/common/GeneralMenu";
import CustomBottomSheet from "@/components/common/CustomBottomSheet";
import ProfileSheetContent from "@/screens/settings-screens/components/ProfileSheetContent";
import langList from "../../services/langList.json";
import { useTranslation } from "react-i18next";
import useGlobalStore from "@/stores/globalStore";

interface LanguageItem {
  name: string;
  nativeName: string;
}

type LangList = {
  [key: string]: LanguageItem;
};

const typedLangList = langList as LangList;
const Settings = () => {
  const { t } = useTranslation();
  const lang = useGlobalStore((state) => state.lang);
  const { signOut } = useSession();
  const [modalVisible, setModalVisible] = useState(false);
  const { mode, toggleTheme } = useTheme();
  const isDarkMode = mode === "dark";
  let activeColors = COLORS[mode ?? "light"];

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const user = {
    name: "Patrik",
    lastname: "Stojsavljevic",
    email: "pstojsavl@text.net",
  };
  // const user = undefined;

  const handleClosePress = () => {
    bottomSheetRef.current?.dismiss();
  };
  const handleOpenPress = () => {
    bottomSheetRef.current?.present();
  };
  const handleOnLogoutButtonPress = () => {
    setModalVisible(true);
  };

  const logoutUserSettings = () => {
    if (user) signOut();
    setModalVisible(false);
  };

  const settingsLinks = [
    {
      id: 1,
      title: t("settings.app_language"),
      icon: icons.chevron_right,
      link: "/settings/language",
      value: typedLangList[lang].name,
      type: "lang",
    },
    {
      id: 2,
      title: t("settings.dark_mode"),
      switch: true,
      isEnabled: isDarkMode,
      toggleSwitch: toggleTheme,
    },
    {
      id: 3,
      title: t("settings.account"),
      icon: icons.chevron_right,
      link: "AccountSettings",
      type: "account",
    },
  ];
  const settingsLinksAbout = [
    {
      id: 4,
      title: t("settings.help_support"),
      icon: icons.chevron_right,
      link: "HelpAndSupport",
    },
    {
      id: 5,
      title: t("settings.impressum"),
      icon: icons.chevron_right,
      link: "Impressum",
    },
    {
      id: 6,
      title: t("settings.privacy"),
      icon: icons.chevron_right,
      menu_item_type: 1,
      link: "https://www.noa-zrce.com/en/legal/mobile-application-privacy-policy",
    },
    {
      id: 7,
      title: t("settings.terms"),
      icon: icons.chevron_right,
      link: "TermsSettings",
    },
  ];
  return (
    <SettingsLayout
      title={t("settings.title")}
      returnIcon={icons.chevron_left}
      actionIcon={user ? icons.logout : null}
      onActionPress={handleOnLogoutButtonPress}
    >
      <Profile onButtonPress={handleOpenPress} user={user} />
      <ScrollView
        style={[styles.container, { backgroundColor: activeColors.background }]}
        contentContainerStyle={styles.scrollContent}
      >
        <GeneralMenu
          title={t("settings.general")}
          data={settingsLinks}
          linkContainerStyle={{
            borderBottomWidth: 1,
            borderColor: activeColors.border,
          }}
          contentContainerStyle={{
            backgroundColor: activeColors.background,
          }}
          isEnabled={isDarkMode}
          toggleSwitch={toggleTheme}
          labelStyle={{
            color: activeColors.text,
          }}
          sectionTitleStyle={{
            color: activeColors.text,
          }}
        />
        {/*<GeneralMenu
          title={t("settings.about_app")}
          navigation={navigation}
          data={settingsLinksAbout}
          linkContainerStyle={{
            borderBottomWidth: 1,
            borderColor: activeColors.borderColor,
          }}
          contentContainerStyle={{
            backgroundColor: activeColors.background,
          }}
          isEnabled={isDarkMode}
          toggleSwitch={toggleTheme}
          labelStyle={{
            color: activeColors.text,
          }}
          sectionTitleStyle={{
            color: activeColors.text,
          }}
        />*/}
      </ScrollView>
      <CustomBottomSheet
        snapPoints={["75%"]}
        ref={bottomSheetRef}
        useKeyboardScrollView={true}
        showFooter={false}
        onClose={handleClosePress}
      >
        <ProfileSheetContent
          activeColors={activeColors}
          onClose={handleClosePress}
          user={user}
          isDarkMode={isDarkMode}
        />
      </CustomBottomSheet>

      <GeneralModal
        title={t("general.logout")}
        message={t("general.logout_confirmation")}
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        submitButtonText={t("general.confirm")}
        onSubmit={logoutUserSettings}
      />
    </SettingsLayout>
  );
};

export default Settings;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: "20@ms0.2",
    paddingVertical: "20@ms0.2",
  },
});
