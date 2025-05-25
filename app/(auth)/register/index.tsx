import icons from "@/constants/icons";
import { moderateScale } from "react-native-size-matters";
import RegisterForm from "@/screens/auth-screens/RegisterForm";
import MainLayout from "@/screen-layouts/MainLayout";
import { useTranslation } from "react-i18next";

export default function RegisterScreen() {
  const { t } = useTranslation();
  return (
    <MainLayout
      title={t("auth.register")}
      returnIcon={icons.chevron_left}
      contentContainerStyle={{ paddingHorizontal: moderateScale(20) }}
    >
      <RegisterForm
        handleShowInlineAlert={() => {
          console.log("SHow alert");
        }}
      />
    </MainLayout>
  );
}
