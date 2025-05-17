import React from "react";
import { Text, TextStyle, View } from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import { Image } from "expo-image";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import { getInitials } from "@/utils/getInitials";
import icons from "@/constants/icons";
import PrimaryButton from "@/components/ui/PrimaryButton";

type ProfileProps = {
  user: any | null;
  onButtonPress: () => void;
};
const Profile = ({ onButtonPress, user }: ProfileProps) => {
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.friendButton,
          {
            backgroundColor: activeColors.lightGrayBackground,
          },
        ]}
      >
        {user ? (
          <Text
            style={{
              ...FONTS.body2,
              color: activeColors.textLightGray,
              fontSize: moderateScale(32, 0.2),
            }}
          >
            {getInitials(`${user.ime} ${user.prezime}`)}
          </Text>
        ) : (
          <Image source={icons.avatar} style={styles.avatar} />
        )}
      </View>
      <View style={styles.textContainer}>
        {user?.ime && (
          <Text style={[styles.title, { color: activeColors.text }]}>
            {user.ime} {user.prezime}
          </Text>
        )}
        {user?.telefon && (
          <Text style={[styles.number, { color: activeColors.text }]}>
            {`${
              user?.pozivni_broj && user?.pozivni_broj.startsWith("+")
                ? user?.pozivni_broj
                : `+${user?.pozivni_broj}`
            } ${user.telefon}`}
          </Text>
        )}

        <PrimaryButton
          label={
            user ? t("settings.edit_profile") : t("settings.create_profile")
          }
          onPress={onButtonPress}
          outerContainerStyle={{
            minWidth: moderateScale(170, 0.2),
            marginVertical: moderateScale(20, 0.2),
          }}
        />
      </View>
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    position: "relative",
    zIndex: 11,
    marginTop: "-65@ms0.2",
    alignItems: "center",
  },
  friendButton: {
    width: "130@ms0.2",
    height: "130@ms0.2",
    borderRadius: "65@ms0.2",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginTop: "5@ms0.2",
    alignItems: "center",
  },
  title: {
    ...(FONTS.semiBold2 as TextStyle),
    fontSize: "24@ms0.2",
    lineHeight: "30@ms0.2",
  },
  number: {
    ...FONTS.body2,
    fontSize: "13@ms0.2",
    lineHeight: "18@ms0.2",
    marginTop: "5@ms0.2",
  },
  avatar: {
    width: "80@ms0.2",
    height: "80@ms0.2",
    borderRadius: "40@ms0.2",
  },
});
export default Profile;
