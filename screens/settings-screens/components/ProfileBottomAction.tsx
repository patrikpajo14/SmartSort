import { View } from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import React from "react";
import PrimaryButton from "@/components/ui/PrimaryButton";

interface ProfileBottomActionProps {
  isLoading: boolean;
  t: any;
  navigation: any;
  handleSubmit: any;
  onSubmit: any;
}

const ProfileBottomAction = ({
  isLoading,
  t,
  navigation,
  handleSubmit,
  onSubmit,
}: ProfileBottomActionProps) => {
  return (
    <View style={styles.btnContainer}>
      <PrimaryButton
        label={t("general.cancel")}
        onPress={() => navigation.goBack()}
        outerContainerStyle={{
          width: moderateScale(140, 0.2),
          height: moderateScale(50, 0.2),
          alignItems: "center",
          justifyContent: "center",
        }}
        type={"outlined"}
      />
      <PrimaryButton
        isLoading={isLoading}
        outerContainerStyle={{ minWidth: moderateScale(140, 0.2) }}
        label={t("general.save")}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
const styles = ScaledSheet.create({
  btnContainer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ProfileBottomAction;
