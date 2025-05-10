import React, { FC, useMemo } from "react";
import { Dimensions, View } from "react-native";
import { NavigationState } from "@react-navigation/native";
import { NavigationDot } from "./NavigationDot";
import { TabsHandler } from "./TabsHandler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { COLORS } from "@/constants/theme";

type TabsUiProps = {
  tabs: {
    name: string;
  }[];
  state: NavigationState;
};

const { width: windowWidth } = Dimensions.get("window");

export const TabsUi: FC<TabsUiProps> = ({ tabs, state }) => {
  const tabWidth = useMemo(() => windowWidth / tabs.length, [tabs.length]);
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  let activeColors = COLORS[colorScheme ?? "light"];

  return (
    <View
      style={{
        backgroundColor: activeColors.primary,
        paddingBottom: insets.bottom,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: colorScheme === "dark" ? 0.4 : 0.1,
        shadowRadius: 10,
        elevation: 15,
      }}
    >
      <View
        style={{
          width: "100%",
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <TabsHandler {...{ tabs, tabWidth }} activeTabIndex={state.index} />
          <NavigationDot width={tabWidth} activeTabIndex={state.index} />
        </View>
      </View>
    </View>
  );
};
