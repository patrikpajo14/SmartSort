import { Tabs } from "expo-router";
import React from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { TabsUi } from "@/components/navigation/TabsUi";

export type TabParamList = {
  Home: undefined;
  Map: { openBottomSheet?: boolean; selectedTab?: number; id?: number };
  Scanner: undefined;
  Education: undefined;
  Settings: undefined;
};

const tabs = [
  { name: "" },
  { name: "map" },
  { name: "scanner" },
  { name: "education" },
  { name: "settings" },
];

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabsUi tabs={tabs} {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="map.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen name="scanner" options={{ headerShown: false }} />

      <Tabs.Screen
        name="education"
        options={{
          title: "Education",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="book.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
