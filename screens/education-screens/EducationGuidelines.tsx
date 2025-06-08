import { Text, View, ScrollView, TextStyle, Switch } from "react-native";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useTranslation } from "react-i18next";

import icons from "@/constants/icons";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Image } from "expo-image";

interface EducationGuidelinesProps {
  category: string | string[];
  toggleSwitch: () => void;
}
export default function EducationGuidelinesScreen({
  category,
  toggleSwitch,
}: EducationGuidelinesProps) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];
  const [isEnabled, setIsEnabled] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({ title: String(category) });
  }, [category]);

  const handleSwitchChange = () => {
    toggleSwitch();
    setIsEnabled((prev: boolean) => !prev);
  };

  const guidelines = isEnabled
    ? [
        "Rinse plastics to remove food and liquid residue.",
        "Check recycling symbols (1–7) to confirm recyclability.",
        "Separate by type if required by local guidelines.",
        "Follow local rules for what is accepted in recycling bins.",
        "Remove caps unless marked as recyclable together.",
        "Flatten bottles only if allowed by the recycling facility.",
        "Recycle clean packaging like water bottles and food containers.",
      ]
    : [
        "Do not mix non-recyclables with recyclables.",
        "Avoid recycling containers with food residue.",
        "Don’t include plastic bags unless accepted locally.",
        "No hazardous waste in recycling.",
        "Do not recycle electronics unless at designated centers.",
      ];

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <Text style={[styles.headerTitle, { color: activeColors.text }]}>
          Plastic
        </Text>
        <Switch
          trackColor={{
            false: activeColors.redLight,
            true: activeColors.primary,
          }}
          thumbColor={activeColors.white}
          ios_backgroundColor={
            !isEnabled ? activeColors.redLight : activeColors.primary
          }
          onValueChange={handleSwitchChange}
          value={isEnabled}
        />
      </View>

      <ScrollView>
        {guidelines.map((text, index) => (
          <View style={styles.guidelineRow} key={index}>
            <Image
              source={isEnabled ? icons.recycle : icons.close}
              style={styles.icon}
              tintColor={
                isEnabled ? activeColors.primaryDark : activeColors.red
              }
            />
            <Text style={[styles.guidelineText, { color: activeColors.text }]}>
              {text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <PrimaryButton
        label={t("scanner.scan_preview_cta")}
        small={true}
        onPress={() => {
          router.back();
          router.navigate("/(main)/(tabs)/map");
        }}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: "20@ms",
    paddingVertical: "25@ms",
    flex: 1,
    gap: "20@ms",
  },
  topWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    ...(FONTS.semiBold1 as TextStyle),
  },
  guidelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: "10@ms",
    gap: "10@ms",
  },
  guidelineText: {
    flex: 1,
    ...(FONTS.body3 as TextStyle),
  },
  icon: {
    width: "20@ms",
    height: "20@ms",
  },
});
