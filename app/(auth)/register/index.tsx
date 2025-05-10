import icons from "@/constants/icons";
import { moderateScale } from "react-native-size-matters";
import RegisterForm from "@/screens/auth-screens/RegisterForm";
import MainLayout from "@/screen-layouts/MainLayout";

export default function RegisterScreen() {
  return (
    <MainLayout
      title={"Register"}
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
