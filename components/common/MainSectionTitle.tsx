import React from "react";
import { Image, Text, TextStyle, TouchableOpacity, View } from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { truncateText } from "@/utils/truncateText";
import { MainSectionTitleProps } from "@/types/layoutTypes";
import { FONTS } from "@/constants/theme";

const MainSectionTitle: React.FC<MainSectionTitleProps> = ({
  title,
  returnIcon,
  returnLabel,
  returnIconStyle = {},
  actionIcon,
  onReturnPress,
  onActionPress,
  customBackButton,
  contentContainerStyle = {},
  actionIconStyle = {},
  actionText,
  activeColors,
  actionButtonStyle = {},
}) => {
  const truncatedTitle = truncateText(title || "", 30);
  return (
    <View style={[styles.container, contentContainerStyle]}>
      <View
        style={[
          styles.content,
          { paddingBottom: returnIcon ? 0 : moderateScale(10) },
        ]}
      >
        {customBackButton ? (
          customBackButton
        ) : returnIcon ? (
          <TouchableOpacity onPress={onReturnPress} style={styles.returnButton}>
            <Image
              source={returnIcon}
              style={[styles.returnIcon, returnIconStyle]}
              tintColor={activeColors.text}
              resizeMode="contain"
            />
            {returnLabel && (
              <Text style={[styles.returnLabel, { color: activeColors.text }]}>
                {returnLabel}
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
        {title && (
          <Text style={[styles.title, { color: activeColors.text }]}>
            {truncatedTitle}
          </Text>
        )}

        {actionText ? (
          <Text style={[styles.actionText, { color: activeColors.text }]}>
            {actionText}
          </Text>
        ) : actionIcon ? (
          <TouchableOpacity
            onPress={onActionPress}
            style={[styles.actionButton, actionButtonStyle]}
          >
            <Image
              source={actionIcon}
              style={[styles.actionIcon, actionIconStyle]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  returnButton: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 999,
    paddingVertical: "10@ms",
  },
  returnIcon: {
    width: "24@ms0.2",
    height: "23@ms0.2",
  },
  returnLabel: {
    ...FONTS.body1,
    fontSize: "14@ms",
    lineHeight: "16@ms",
    marginLeft: "10@ms",
  },
  title: {
    ...(FONTS.semiBold1 as TextStyle),
  },
  actionButton: {
    // width: '40@ms0.2',
    // height: '40@ms0.2',
    // justifyContent: 'center',
    // alignItems: 'center',
    // overflow: 'hidden',
  },
  actionText: {
    ...FONTS.body1,
    fontSize: "14@ms",
    lineHeight: "16@ms",
  },
  actionIcon: {
    width: "20@ms",
    height: "20@ms",
  },
  placeholder: {
    width: "25@ms",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default MainSectionTitle;
