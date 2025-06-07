import { Text, TextStyle, TouchableOpacity, View } from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import { Location } from "@/types/global";
import { Image } from "expo-image";
import icons from "@/constants/icons";
import { useTranslation } from "react-i18next";
import { isLocationOpen } from "@/utils/locationOpen";
import { getContainerColor } from "@/utils/mapThemePickers";
import { calculateDistance, showDistanceText } from "@/utils/calculateDistance";
import useGlobalStore from "@/stores/globalStore";

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
  const userLocation = useGlobalStore((state) => state.userLocation);
  const isOpen = item ? isLocationOpen(item.open_at, item.closing_at) : false;
  const showDistance =
    userLocation?.latitude &&
    userLocation?.longitude &&
    item?.latitude &&
    item?.longitude;

  let distanceText = "";
  if (showDistance) {
    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      item?.latitude,
      item?.longitude,
    );

    distanceText = showDistanceText(distance, t);
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { borderColor: activeColors.border, opacity: isOpen ? 1 : 0.5 },
      ]}
      disabled={!isOpen}
    >
      <View style={{ paddingTop: moderateScale(5) }}>
        <Text
          style={[
            styles.type,
            {
              color: getContainerColor(activeColors, item?.type || ""),
            },
          ]}
        >
          {item?.type}
        </Text>
        <Text style={[styles.name, { color: activeColors.text }]}>
          {item?.title}
        </Text>
        <Text style={[styles.address, { color: activeColors.textLightGray }]}>
          {item?.address}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          {item?.open_at && item?.closing_at && (
            <Text
              style={[
                styles.desc,
                {
                  color: isOpen ? activeColors.success : activeColors.danger,
                },
              ]}
            >
              {isOpen ? t("locations.opened") : t("locations.closed")}
            </Text>
          )}
          <Text style={[styles.desc, { color: activeColors.text }]}>
            {distanceText}
          </Text>
        </View>
        {item?.rating && (
          <Text style={[styles.rating, { color: activeColors.text }]}>
            {item?.rating}
          </Text>
        )}
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
    fontWeight: 500,
  },
  desc: {
    ...(FONTS.body3 as TextStyle),
  },
  rating: {
    ...(FONTS.body3 as TextStyle),
    paddingVertical: "5@ms0.2",
  },
  address: {
    ...(FONTS.body3 as TextStyle),
  },
  type: {
    ...(FONTS.semiBold4 as TextStyle),
    textTransform: "uppercase",
  },
});

export default LocationListItem;
