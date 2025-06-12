import React from "react";
import {
  Linking,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import Toast from "react-native-toast-message";
import icons from "../../constants/icons";
import { COLORS, FONTS } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Image } from "expo-image";
import { router } from "expo-router";
import { SingleSwitch } from "@/components/ui/SingleSwitch";

interface MenuItem {
  id: string | number;
  title: string;
  subtitle?: string;
  menu_item_type?: 1 | 2 | 3;
  link?: string | any;
  type?: string;
  value?: string;
  switch?: boolean;
}

interface GeneralMenuProps {
  data: MenuItem[];
  title?: string;
  // t: (key: string) => string;
  contentContainerStyle?: ViewStyle;
  sectionTitleStyle?: TextStyle;
  linkContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  isEnabled?: boolean;
  toggleSwitch?: () => void;
  notificationsEnabled?: boolean;
  toggleNotificationsSwitch?: () => void;
}

interface SingleLinkProps {
  icon: ImageSourcePropType;
  label: string;
  value?: string;
  description?: string;
  onPress: () => void;
  linkContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

const GeneralMenu = ({
  data,
  title,
  contentContainerStyle,
  sectionTitleStyle,
  linkContainerStyle,
  labelStyle,
  isEnabled = false,
  toggleSwitch = () => {},
}: GeneralMenuProps) => {
  const user = {
    name: "Patrik",
    lastname: "Stojsavljevic",
    email: "pstojsavl@text.net",
  };
  const handleNavigate = (menuItem: MenuItem) => {
    if (menuItem?.menu_item_type === 2 || menuItem?.menu_item_type === 3) {
      /*router.navigate("SimpleScreen", {
        id: menuItem?.id,
        menu_type: menuItem?.menu_item_type,
      });*/
    } else if (!menuItem?.menu_item_type) {
      router.navigate(menuItem?.link || "/settings");
    } else {
      if (menuItem?.link) {
        Linking.openURL(menuItem?.link).catch((err) =>
          console.error("An error occurred", err),
        );
      } else {
        Toast.show({
          type: "error",
          text1: "Empty url",
        });
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        marginBottom: moderateScale(30),
        ...contentContainerStyle,
      }}
    >
      {title && (
        <Text
          style={{
            ...(FONTS.h5 as TextStyle),
            fontSize: moderateScale(14),
            paddingTop: moderateScale(10),
            paddingBottom: moderateScale(5),
            ...sectionTitleStyle,
          }}
        >
          {title}
        </Text>
      )}
      <View style={{ flex: 1 }}>
        {data.map((item) => {
          if (item?.type !== "account") {
            if (item?.switch) {
              return (
                <SingleSwitch
                  key={item.id}
                  title={item.title}
                  toggleSwitch={toggleSwitch}
                  isEnabled={isEnabled}
                  linkContainerStyle={linkContainerStyle}
                  labelStyle={labelStyle}
                />
              );
            } else {
              return (
                <SingleLink
                  key={item.id}
                  label={item.title}
                  icon={icons.chevron_right}
                  value={item.value}
                  description={item.subtitle}
                  onPress={() => handleNavigate(item)}
                  linkContainerStyle={linkContainerStyle}
                  labelStyle={labelStyle}
                />
              );
            }
          } else {
            if (user) {
              return (
                <SingleLink
                  key={item.id}
                  label={item.title}
                  icon={icons.chevron_right}
                  value={item.value}
                  description={item.subtitle}
                  onPress={() => handleNavigate(item)}
                  linkContainerStyle={linkContainerStyle}
                  labelStyle={labelStyle}
                />
              );
            }
          }
        })}
      </View>
    </View>
  );
};

const SingleLink = ({
  icon,
  label,
  value,
  description,
  onPress,
  linkContainerStyle,
  labelStyle,
}: SingleLinkProps) => {
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: moderateScale(18),
        ...linkContainerStyle,
      }}
    >
      <View>
        <Text
          style={{ ...FONTS.body1, fontSize: moderateScale(14), ...labelStyle }}
        >
          {label}
        </Text>
        {description && (
          <Text
            style={{
              ...FONTS.body2,
              color: activeColors.textGray,
              fontSize: moderateScale(12),
              paddingTop: moderateScale(7),
              maxWidth: "95%",
            }}
          >
            {description}
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
        {value && (
          <Text
            style={{
              ...FONTS.body1,
              paddingRight: moderateScale(7.5),
              fontSize: moderateScale(14),
              ...labelStyle,
            }}
          >
            {value}
          </Text>
        )}
        <Image
          source={icon}
          style={{
            height: moderateScale(20),
            width: moderateScale(10),
          }}
          tintColor={activeColors.textLightGray}
          contentFit="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

export default GeneralMenu;
