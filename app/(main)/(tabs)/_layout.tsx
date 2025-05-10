import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { COLORS } from "@/constants/theme";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TabsUi } from "@/components/navigation/TabsUi";

const tabs = [
  { name: "index" },
  { name: "map" },
  { name: "scanner" },
  { name: "education" },
  { name: "settings" },
];

export default function TabLayout() {
  const colorScheme = useColorScheme();
  let activeColors = COLORS[colorScheme ?? "light"];

  return (
    <Tabs
      tabBar={(props) => <TabsUi tabs={tabs} {...props} />}
      screenOptions={{
        tabBarActiveTintColor: activeColors.text,
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
        name="education"
        options={{
          title: "Education",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="book.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: "Scan",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="qrcode" color={color} />
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
