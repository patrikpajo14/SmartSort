import { View } from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import React from "react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { router } from "expo-router";

interface ProfileBottomActionProps {
  isLoading: boolean;
  t: any;
  handleSubmit: any;
  onSubmit: any;
}

const ProfileBottomAction = ({
  isLoading,
  t,
  handleSubmit,
  onSubmit,
}: ProfileBottomActionProps) => {
  return (
    <View style={styles.btnContainer}>
      <PrimaryButton
        label={t("general.cancel")}
        onPress={() => router.back()}
        small={true}
        type={"outlined"}
        outerContainerStyle={{ width: moderateScale(120, 0.2) }}
      />
      <PrimaryButton
        small={true}
        isLoading={isLoading}
        label={t("general.save")}
        onPress={handleSubmit(onSubmit)}
        outerContainerStyle={{ minWidth: moderateScale(120, 0.2) }}
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
