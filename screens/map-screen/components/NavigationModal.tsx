import React, { useEffect } from "react";
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  ViewStyle,
  ImageSourcePropType,
  Platform,
  Text,
  TextStyle,
} from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import useGlobalStore from "../../../stores/globalStore";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import openMapOnDevice from "@/utils/openMapOnDevice";
import { Location } from "@/types/global";
import { calculateDistance, showDistanceText } from "@/utils/calculateDistance";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Image } from "expo-image";
import icons from "@/constants/icons";
import { getContainerColor } from "@/utils/mapThemePickers";

type NavigationModalProps = {
  location: Location | undefined;
  isVisible: boolean;
  onClose: () => void;
  closeWrapperStyles?: ViewStyle;
  closeIcon?: ImageSourcePropType;
};

export default function NavigationModal({
  location,
  isVisible,
  onClose,
}: NavigationModalProps) {
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const userLocation = useGlobalStore((state) => state.userLocation);
  const setUserLocation = useGlobalStore((state) => state.setUserLocation);
  useEffect(() => {
    setUserLocation({ latitude: 45.8131, longitude: 15.977 });
  }, []);
  const showDistance =
    userLocation?.latitude &&
    userLocation?.longitude &&
    location?.latitude &&
    location?.longitude;
  const handleNavigation = () => {
    openMapOnDevice({
      fromLatitude: userLocation?.latitude,
      fromLongitude: userLocation?.longitude,
      toLatitude: location?.latitude,
      toLongitude: location?.longitude,
      destinationName: location?.title,
    });
  };

  let distanceText = "";
  console.log("userLocation", userLocation);
  if (showDistance) {
    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      location?.latitude,
      location?.longitude,
    );

    distanceText = showDistanceText(distance, t);

    console.log("distanceText", distanceText);
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.container,
          { paddingTop: insets.top + moderateScale(50, 0.2) },
        ]}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.modalView,
            { backgroundColor: activeColors.background },
          ]}
        >
          {location?.title && (
            <View
              style={[
                styles.topCircle,
                { backgroundColor: activeColors.background },
              ]}
            >
              <View
                style={[
                  styles.topCircleInner,
                  {
                    backgroundColor: getContainerColor(
                      activeColors,
                      location.type,
                    ),
                  },
                ]}
              >
                <Image
                  source={icons.recycle}
                  style={styles.icon}
                  contentFit={"contain"}
                />
              </View>
            </View>
          )}

          {location ? (
            <>
              <Text
                style={[
                  styles.type,
                  { color: getContainerColor(activeColors, location.type) },
                ]}
              >
                {location?.type}
              </Text>
              <Text style={[styles.name, { color: activeColors.text }]}>
                {location?.title}
              </Text>
              <Text style={[styles.address, { color: activeColors.textGray }]}>
                {location?.address}
              </Text>
              {showDistance && (
                <Text
                  style={[styles.distance, { color: activeColors.textGray }]}
                >
                  {distanceText}
                </Text>
              )}
            </>
          ) : (
            <Text style={[styles.description, { color: activeColors.text }]}>
              {t("locations.no_friend_location")}
            </Text>
          )}

          <View
            style={[
              styles.btnContainer,
              {
                justifyContent: showDistance ? "space-between" : "center",
              },
            ]}
          >
            <PrimaryButton
              label={t("general.cancel")}
              onPress={onClose}
              type={"outlined"}
              small={true}
            />
            {showDistance && (
              <PrimaryButton
                label={t("locations.start_navigation")}
                onPress={handleNavigation}
                small={true}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "30@ms0.2",
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "100%",
    alignItems: "center",
    paddingVertical: "15@ms",
    paddingHorizontal: "30@ms0.2",
    borderRadius: "9@ms",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  closeWrapper: {
    position: "absolute",
    right: "15@ms",
    top: "13@ms",
    zIndex: 22,
  },
  topCircle: {
    width: "80@ms0.2",
    height: "80@ms0.2",
    borderRadius: "40@ms0.2",
    marginTop: "-55@ms0.2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "15@ms",
  },
  topCircleInner: {
    width: "70@ms0.2",
    height: "70@ms0.2",
    borderRadius: "35@ms0.2",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    ...(FONTS.h2 as TextStyle),
    fontSize: "20@ms0.2",
    lineHeight: "24@ms0.2",
    marginBottom: "5@ms",
  },
  date: {
    ...(FONTS.body1 as TextStyle),
    fontSize: "13@ms0.2",
    lineHeight: "16@ms0.2",
    marginBottom: "10@ms",
    textAlign: "center",
  },
  description: {
    ...(FONTS.body1 as TextStyle),
    fontSize: "14@ms0.2",
    lineHeight: "16@ms0.2",
    textAlign: "center",
    marginTop: "15@ms0.2",
  },
  distance: {
    ...(FONTS.semiBold2 as TextStyle),
    fontSize: "14@ms0.2",
    lineHeight: "16@ms0.2",
    marginBottom: "10@ms",
  },
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    gap: "10@ms",
    alignItems: "center",
    marginTop: "15@ms",
    marginBottom: "10@ms",
  },
  icon: {
    width: "30@ms0.2",
    height: "30@ms0.2",
  },
  address: {
    ...(FONTS.body3 as TextStyle),
    paddingBottom: "15@ms0.2",
  },
  type: {
    ...(FONTS.semiBold2 as TextStyle),
    textTransform: "uppercase",
    paddingBottom: "10@ms0.2",
  },
});
