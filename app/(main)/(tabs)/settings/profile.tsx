import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextStyle,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import { AlertType } from "@/types/global";
import MainSectionTitle from "@/components/common/MainSectionTitle";
import icons from "@/constants/icons";
import InlineAlert from "@/components/common/InlineAlert";
import EditProfileForm from "@/screens/settings-screens/components/EditProfileForm";

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const { mode } = useTheme();
  let activeColors = COLORS[mode];

  const [screen, setScreen] = useState<
    "Edit" | "Update_Password" | "Forgot_Password"
  >("Edit");
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<AlertType>("info");

  const handleGoBack = () => {
    if (screen === "Update_Password" || screen === "Forgot_Password") {
      setScreen("Edit");
    }
  };

  const handleShowInlineAlert = (message: string, type: AlertType) => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3500);
  };
  const renderForm = () => {
    switch (screen) {
      case "Edit":
        return (
          <EditProfileForm
            user={null}
            navigation={navigation}
            handleShowInlineAlert={handleShowInlineAlert}
            onSwitchMode={setScreen}
          />
        );
      /*case "Update_Password":
        return (
          <ChangePasswordForm
            user={user}
            navigation={navigation}
            onSwitchMode={setScreen}
            handleShowInlineAlert={handleShowInlineAlert}
          />
        );
      case "Forgot_Password":
        return <Text>EDIT USER</Text>;*/
      default:
        return null;
    }
  };
  let mainTitle = t("login.title_login");
  switch (screen) {
    case "Edit":
      mainTitle = t("settings.edit_profile");
      break;
    /* case "Update_Password":
      mainTitle = t("settings.update_password");
      break;
    case "Forgot_Password":
      mainTitle = t("settings.forgot_password");
      break;*/
    default:
      break;
  }
  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <MainSectionTitle
        activeColors={activeColors}
        returnIcon={screen !== "Edit" && icons.chevron_left}
        returnIconStyle={{
          width: moderateScale(20),
          height: moderateScale(17),
        }}
        onReturnPress={handleGoBack}
        actionIcon={icons.close}
        onActionPress={() => navigation.goBack()}
        actionIconStyle={{
          width: moderateScale(17),
          height: moderateScale(17),
          tintColor: activeColors.text,
        }}
        actionButtonStyle={{ paddingVertical: moderateScale(10) }}
        title={mainTitle}
        contentContainerStyle={{
          paddingBottom: moderateScale(15),
          paddingHorizontal: moderateScale(20),
          zIndex: 11,
        }}
      />
      <InlineAlert
        title={alertMessage || "General message"}
        isVisible={alertVisible}
        onClose={() => setAlertVisible(false)}
        type={alertType}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.innerContainer}
          keyboardShouldPersistTaps="handled"
        >
          {renderForm()}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingVertical: "35@ms0.2",
  },
  innerContainer: {
    flexGrow: 1,
    paddingHorizontal: "20@ms0.2",
  },
  header: {
    marginBottom: "20@ms0.2",
  },
  mainTitle: {
    ...(FONTS.h2 as TextStyle),
    fontSize: "24@ms0.2",
    lineHeight: "32@ms0.2",
    paddingBottom: "10@ms",
  },
  desc: {
    ...(FONTS.body1 as TextStyle),
    fontSize: "14@ms0.2",
    lineHeight: "21@ms0.2",
    paddingBottom: "20@ms",
  },
  logoContainer: {
    alignItems: "center",
  },
  loggedInContainer: {
    alignItems: "center",
    marginTop: moderateScale(20, 0.2),
  },
  welcomeText: {
    ...(FONTS.h2 as TextStyle),
    fontSize: "20@ms0.2",
    lineHeight: "28@ms0.2",
    textAlign: "center",
  },
});
