import { Image, Text, TextStyle, TouchableOpacity, View } from "react-native";
import React from "react";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import langList from "../../../services/langList.json";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import icons from "@/constants/icons";

type LanguageEntry = {
  name: string;
  nativeName: string;
};

type LangList = {
  [key: string]: LanguageEntry;
};

const typedLangList = langList as LangList;

type SubMenuProps = {
  data: string[];
  title?: string;
  selectedValue: string;
  changeValue: (value: string) => void;
  radio?: boolean;
  navigation?: any;
};

const SubMenu = ({
  data,
  title,
  selectedValue,
  changeValue,
  radio = false,
}: SubMenuProps) => {
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  return (
    <View style={[styles.container, { borderColor: activeColors.background }]}>
      <View>
        {title && (
          <Text
            style={{
              ...(FONTS.h5 as TextStyle),
              color: activeColors.text,
              fontSize: moderateScale(15),
              paddingVertical: moderateScale(20),
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
          {data?.map((item) => (
            <SingleLink
              key={item}
              label={typedLangList[item]?.name || item}
              radio={radio}
              selected={selectedValue === item}
              onPress={() => changeValue(item)}
              activeColors={activeColors}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

type SingleLinkProps = {
  icon?: any;
  label: string;
  onPress: () => void;
  selected: boolean;
  radio: boolean;
  activeColors: any;
};

const SingleLink = ({
  icon,
  label,
  onPress,
  selected,
  radio,
  activeColors,
}: SingleLinkProps) => {
  if (radio) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.linkContainer, { borderColor: activeColors.border }]}
      >
        <Text
          style={{
            ...FONTS.body3,
            color: activeColors.text,
          }}
        >
          {label}
        </Text>
        <Image
          source={selected ? icons.checkmark : icon}
          style={{
            height: moderateScale(20, 0.3),
            width: moderateScale(20, 0.3),
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.linkContainer, { borderColor: activeColors.border }]}
      >
        <Text
          style={{
            ...FONTS.body3,
            color: activeColors.text,
          }}
        >
          {label}
        </Text>
        {selected && (
          <Image
            source={icons.checkmark}
            style={{
              height: moderateScale(12),
              width: moderateScale(15),
            }}
            tintColor={activeColors.primary}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
    );
  }
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
    paddingVertical: "18@ms",
    borderBottomWidth: 1,
    paddingHorizontal: "15@ms",
  },
});

export default SubMenu;
