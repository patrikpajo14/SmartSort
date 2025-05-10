import LoginForm from "@/screens/auth-screens/LoginForm";
import MainLayout from "@/screen-layouts/MainLayout";
import icons from "@/constants/icons";
import { moderateScale } from "react-native-size-matters";

export default function LoginScreen() {
  return (
    <MainLayout
      title={"Sign in"}
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
