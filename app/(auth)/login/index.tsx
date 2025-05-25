import LoginForm from "@/screens/auth-screens/LoginForm";
import MainLayout from "@/screen-layouts/MainLayout";
import icons from "@/constants/icons";
import { moderateScale } from "react-native-size-matters";
import { useTranslation } from "react-i18next";

export default function LoginScreen() {
  const { t } = useTranslation();
  return (
    <MainLayout
      title={t("auth.sign_in")}
      returnIcon={icons.chevron_left}
      contentContainerStyle={{ paddingHorizontal: moderateScale(20) }}
    >
      <LoginForm
        handleShowInlineAlert={() => {
          console.log("SHow alert");
        }}
      />
    </MainLayout>
  );
}
