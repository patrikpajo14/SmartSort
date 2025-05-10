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
// import ProfileSheetContent from "@/screens/settings-screens/components/ProfileSheetContent";
import { router } from "expo-router";

interface LanguageItem {
  name: string;
  nativeName: string;
}

type LangList = {
  [key: string]: LanguageItem;
};

const Settings = () => {
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

  const handleClosePress = () => {
    bottomSheetRef.current?.dismiss();
  };
  const handleOpenPress = () => {
    user ? router.navigate("ProfileScreen") : router.navigate("LoginScreen");
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
      title: "Language",
      icon: icons.chevron_right,
      link: "Language",
      value: "HR",
      type: "lang",
    },
    {
      id: 2,
      title: "Dark mode",
      switch: true,
      isEnabled: isDarkMode,
      toggleSwitch: toggleTheme,
    },
    {
      id: 3,
      title: "Account",
      icon: icons.chevron_right,
      link: "AccountSettings",
      type: "account",
    },
  ];
  const settingsLinksAbout = [
    {
      id: 4,
      title: "Help and Support",
      icon: icons.chevron_right,
      link: "HelpAndSupport",
    },
    {
      id: 5,
      title: "Impressum",
      icon: icons.chevron_right,
      link: "Impressum",
    },
    {
      id: 6,
      title: "Privacy and policy",
      icon: icons.chevron_right,
      menu_item_type: 1,
      link: "https://www.noa-zrce.com/en/legal/mobile-application-privacy-policy",
    },
    {
      id: 7,
      title: "Terms and conditions",
      icon: icons.chevron_right,
      link: "TermsSettings",
    },
  ];
  return (
    <SettingsLayout
      title={"Settings"}
      returnIcon={icons.chevron_left}
      actionIcon={user ? icons.logout : null}
      onActionPress={handleOnLogoutButtonPress}
    >
      {/*<Profile onButtonPress={handleOpenPress} user={user} />*/}
      <ScrollView
        style={[styles.container, { backgroundColor: activeColors.background }]}
        contentContainerStyle={styles.scrollContent}
      >
        <GeneralMenu
          title={"General settings"}
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
      {/*<CustomBottomSheet
        snapPoints={["75%"]}
        ref={bottomSheetRef}
        handleIcon={icons.scan}
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
      </CustomBottomSheet>*/}

      <GeneralModal
        title={"Logout"}
        message={"Do you really want to logout?"}
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        submitButtonText={"Confirm"}
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
    paddingHorizontal: "30@ms0.2",
    paddingVertical: "20@ms0.2",
  },
});
