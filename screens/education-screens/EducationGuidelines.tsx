import {
  Text,
  View,
  ScrollView,
  TextStyle,
  Switch,
  RefreshControl,
} from "react-native";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useTranslation } from "react-i18next";

import icons from "@/constants/icons";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { Image } from "expo-image";
import { Education } from "@/types/global";

interface EducationGuidelinesProps {
  data?: Education;
  refreshing: boolean;
  onRefresh: () => void;
  toggleSwitch: () => void;
}
export default function EducationGuidelinesScreen({
  data,
  refreshing,
  onRefresh,
  toggleSwitch,
}: EducationGuidelinesProps) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];
  const [isEnabled, setIsEnabled] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({ title: String(data?.category) });
  }, [data?.category]);

  const handleSwitchChange = () => {
    toggleSwitch();
    setIsEnabled((prev: boolean) => !prev);
  };

  const guidelines = isEnabled ? data?.pros : data?.cons;

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <Text style={[styles.headerTitle, { color: activeColors.text }]}>
          {data?.title}
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

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={activeColors.text}
          />
        }
      >
        {guidelines?.map((text, index) => (
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
          router.push({
            pathname: "/(main)/(tabs)/map",
            params: {
              type: data?.category?.toLowerCase() as string,
            },
          });
        }}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    gap: "20@ms",
    paddingTop: "25@ms",
    paddingHorizontal: "20@ms",
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
