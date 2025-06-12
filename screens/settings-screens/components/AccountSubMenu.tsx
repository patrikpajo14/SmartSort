import { Text, TextStyle, TouchableOpacity, View } from "react-native";
import React from "react";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";

interface MenuItem {
  id: string | number;
  title: string;
  subtitle?: string;
  type?: string;
  onPress: () => void;
}

type AccountSubMenuProps = {
  data: MenuItem[];
  title?: string;
};

const AccountSubMenu = ({ data, title }: AccountSubMenuProps) => {
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  return (
    <View style={[styles.container]}>
      <View>
        {title && (
          <Text
            style={{
              ...(FONTS.h5 as TextStyle),
              fontSize: moderateScale(15),
              paddingTop: moderateScale(20),
              paddingBottom: moderateScale(10),
              paddingHorizontal: moderateScale(15),
              borderBottomWidth: 1,
              borderColor: activeColors.border,
            }}
          >
            {title}
          </Text>
        )}
        <View
          style={{
            flex: 1,
          }}
        >
          {data.map((item) => (
            <SingleLink
              key={item.id}
              label={item.title}
              onPress={item?.onPress}
              labelStyle={
                item.type === "delete" ? { color: activeColors.danger } : null
              }
              activeColors={activeColors}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

type SingleLinkProps = {
  label: string;
  onPress: () => void;
  activeColors: any;
  labelStyle?: object | null;
};

const SingleLink = ({
  label,
  onPress,
  activeColors,
  labelStyle,
}: SingleLinkProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.linkContainer, { borderColor: activeColors.border }]}
    >
      <Text
        style={[
          {
            ...FONTS.body3,
            color: activeColors.text,
          },
          labelStyle,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  linkContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: "15@ms",
    borderBottomWidth: 1,
  },
});

export default AccountSubMenu;
