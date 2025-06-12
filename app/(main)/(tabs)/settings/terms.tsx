import Settings from "@/screens/settings-screens";
import { Text, View } from "react-native";
import MainLayout from "@/screen-layouts/MainLayout";
import { moderateScale } from "react-native-size-matters";
import icons from "@/constants/icons";

export default function TermsScreen() {
  return (
    <MainLayout
      title={"Terms and conditions"}
      returnIcon={icons.chevron_left}
      contentContainerStyle={{ paddingHorizontal: moderateScale(20) }}
    >
      <Text>Terms and conditions</Text>
    </MainLayout>
  );
}
