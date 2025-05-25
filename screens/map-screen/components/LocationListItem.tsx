import { Text, TextStyle, TouchableOpacity, View } from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import { Location } from "@/types/global";
import { Image } from "expo-image";
import icons from "@/constants/icons";
import { useTranslation } from "react-i18next";

const LocationListItem = ({
  item,
  onPress,
}: {
  item: Location | null;
  onPress: () => void;
}) => {
  const { t } = useTranslation();
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { borderColor: activeColors.border }]}
      disabled={!item?.isOpen}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <View>
          <Text style={[styles.name, { color: activeColors.text }]}>
            {item?.name}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text
              style={[
                styles.desc,
                {
                  color: item?.isOpen
                    ? activeColors.success
                    : activeColors.danger,
                },
              ]}
            >
              {item?.isOpen ? t("locations.opened") : t("locations.closed")}
            </Text>
            <Text style={[styles.desc, { color: activeColors.text }]}>
              3.2 km away
            </Text>
          </View>
          <Text style={[styles.desc, { color: activeColors.text }]}>
            {item?.garbageType}
          </Text>
          <Text style={[styles.desc, { color: activeColors.text }]}>
            {item?.rating}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
        }}
      >
        <Image
          source={icons.chevron_right}
          style={{
            height: moderateScale(20),
            width: moderateScale(10),
          }}
          tintColor={activeColors.textLightGray}
          contentFit={"contain"}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: "10@ms0.2",
    borderBottomWidth: 1,
  },
  name: {
    ...(FONTS.body2 as TextStyle),
    paddingTop: "5@ms0.2",
    fontWeight: 500,
  },
  desc: {
    ...(FONTS.body3 as TextStyle),
  },
});

export default LocationListItem;
