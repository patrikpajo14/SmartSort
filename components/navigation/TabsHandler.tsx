import React, { FC } from "react";
import { View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { useColorScheme } from "@/hooks/useColorScheme";
import { COLORS } from "@/constants/theme";
import { MainButton } from "@/components/navigation/MainButton";
import { getBottomTabIcon } from "@/utils/get-bottom-tab-icon";
import { router } from "expo-router";

type TabsHandlerProps = {
  tabs: {
    name: string;
  }[];
  tabWidth: number;
  activeTabIndex: number;
};

export const TabsHandler: FC<TabsHandlerProps> = ({ tabs, tabWidth }) => {
  const colorScheme = useColorScheme();
  let activeColors = COLORS[colorScheme ?? "light"];

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {tabs.map((tab: any, key: number) => {
        const onPress = () => {
          router.navigate(tab.name);
        };
        if (tab.name === "scanner") {
          return <MainButton onPress={onPress} key="scan" width={tabWidth} />;
        }

        return (
          <View
            key={key}
            style={{
              flexDirection: "column",
              alignItems: "center",
              height: moderateScale(48, 0.2),
              width: tabWidth,
            }}
          >
            <BorderlessButton onPress={onPress} style={styles.button}>
              {getBottomTabIcon(tab.name, activeColors)}
            </BorderlessButton>
          </View>
        );
      })}
    </View>
  );
};

const styles = ScaledSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingTop: "10@ms0.2",
    // paddingTop: 20,
    // paddingBottom: 10,
    // paddingHorizontal: 10,
  },
});
