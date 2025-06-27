import { ScrollView, TextStyle } from "react-native";
import React, { useState } from "react";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import { router } from "expo-router";
import icons from "@/constants/icons";
import MainLayout from "@/screen-layouts/MainLayout";
import GeneralModal from "@/components/common/GeneralModal";
import AccountSubMenu from "@/screens/settings-screens/components/AccountSubMenu";
import useLogout from "@/hooks/useLogout";
import { useDeleteUsers } from "@/reactQuery/user";
import useGlobalStore from "@/stores/globalStore";
import { useAuthContext } from "@/context/auth/authContext";
import { axiosInstance } from "@/axios/axiosInstance";

const AccountSettingsScreen = () => {
  const { t } = useTranslation();
  const { handleLogout } = useLogout();
  const { mode } = useTheme();
  const { user, logoutUser } = useAuthContext();
  const lang = useGlobalStore((state) => state.lang);
  let activeColors = COLORS[mode];
  const [modalVisible, setModalVisible] = useState(false);
  const { mutate: deleteUser } = useDeleteUsers(lang);

  const handleEditPress = () => {
    router.navigate("/settings/profile");
  };

  const logoutUserSettings = () => {
    handleLogout();
    setModalVisible(false);
  };

  const onDeletePress = () => {
    setModalVisible(true);
  };
  const onDeletePressCallback = () => {
    if (user) {
      deleteUser(user.id, {
        onSuccess: async (response) => {
          console.log("Response", response.data);
          delete axiosInstance.defaults.headers["Userid"];
          delete axiosInstance.defaults.headers["Authorization"];
          await logoutUser();
          Toast.show({
            type: "success",
            text1: t("general.delete_profile_success"),
          });
        },
      });
    }
  };

  const data = [
    {
      id: 1,
      title: t("settings.edit_profile"),
      onPress: handleEditPress,
    },
    {
      id: 2,
      title: t("form.logout_btn"),
      onPress: logoutUserSettings,
    },
    {
      id: 3,
      title: t("settings.delete_user"),
      type: "delete",
      onPress: onDeletePress,
    },
  ];

  return (
    <MainLayout
      title={t("settings.account")}
      returnIcon={icons.chevron_left}
      contentContainerStyle={{ paddingHorizontal: moderateScale(20) }}
    >
      <ScrollView
        style={[
          styles.scrollViewContainer,
          { backgroundColor: activeColors.background },
        ]}
      >
        <AccountSubMenu data={data} />
      </ScrollView>
      <GeneralModal
        title={t("settings.delete_user_modal")}
        message={t("settings.delete_user_message")}
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        icon={icons.trash}
        onSubmit={onDeletePressCallback}
        submitButtonText={"Delete"}
        submitButtonColors={[activeColors.danger, activeColors.danger]}
      />
    </MainLayout>
  );
};

const styles = ScaledSheet.create({
  scrollViewContainer: {
    flex: 1,
  },

  innerContainer: {},
  sectionTitle: {
    ...(FONTS.h5 as TextStyle),
    fontSize: "15@ms",
    marginTop: "20@ms",
    marginBottom: "10@ms",
  },
});

export default AccountSettingsScreen;
