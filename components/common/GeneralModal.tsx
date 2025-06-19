import React from "react";
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
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import { Image } from "expo-image";
import PrimaryButton from "@/components/ui/PrimaryButton";

type GeneralModalProps = {
  title: string;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  icon?: string;
  closeWrapperStyles?: ViewStyle;
  closeIcon?: ImageSourcePropType;
  onSubmit: () => void;
  submitButtonText: string;
  submitButtonColors?: string[];
};

export default function GeneralModal({
  title,
  message,
  isVisible,
  onClose,
  icon,
  onSubmit,
  submitButtonText,
}: GeneralModalProps) {
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  const insets = useSafeAreaInsets();
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
            {
              backgroundColor: activeColors.background,
              paddingTop: icon ? 15 : 25,
            },
          ]}
        >
          {icon && (
            <View
              style={[
                styles.topCircle,
                { backgroundColor: activeColors.danger },
              ]}
            >
              <View
                style={[
                  styles.topCircleInner,
                  { backgroundColor: activeColors.danger },
                ]}
              >
                <Image
                  source={icon}
                  style={[styles.iconStyle]}
                  tintColor={activeColors.white}
                />
              </View>
            </View>
          )}
          <Text style={[styles.name, { color: activeColors.text }]}>
            {title}
          </Text>
          <Text style={[styles.date, { color: activeColors.textGray }]}>
            {message}
          </Text>
          <View style={styles.btnContainer}>
            <PrimaryButton
              label={"Cancel"}
              onPress={onClose}
              type={"outlined"}
              small={true}
            />
            <PrimaryButton
              label={submitButtonText}
              onPress={onSubmit}
              small={true}
            />
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
    marginBottom: "15@ms",
    textAlign: "center",
  },
  date: {
    ...(FONTS.body1 as TextStyle),
    fontSize: "13@ms0.2",
    lineHeight: "16@ms0.2",
    marginBottom: "5@ms",
    textAlign: "center",
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
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15@ms",
    marginBottom: "10@ms",
  },
  iconStyle: {
    width: "30@ms",
    height: "30@ms",
    objectFit: "contain",
  },
});
