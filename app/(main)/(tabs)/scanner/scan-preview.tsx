import React, { useEffect, useState } from "react";
import { Text, TextStyle, View, ActivityIndicator } from "react-native";
import icons from "@/constants/icons";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { Image } from "expo-image";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { router, useLocalSearchParams } from "expo-router";
import MainLayout from "@/screen-layouts/MainLayout";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import Badge from "@/components/ui/Badge";
import * as FileSystem from "expo-file-system";
import axios from "axios";

export default function ScanPreviewScreen() {
  const { t } = useTranslation();
  const { mode } = useTheme();
  const activeColors = COLORS[mode ?? "light"];
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [prediction, setPrediction] = useState<string | null>(null);

  useEffect(() => {
    const processImage = async () => {
      try {
        if (!uri) return;

        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const response = await axios({
          method: "POST",
          url: "https://serverless.roboflow.com/atik-ayristirma/4",
          params: {
            api_key: "g4OtrfWuqIEudJ2QkAz1",
          },
          data: base64,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        const className = response?.data?.predictions?.[0]?.class ?? null;
        setPrediction(className);
        console.log("Roboflow response:", response.data);
      } catch (err) {
        console.log("Roboflow error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    processImage();
  }, [uri]);

  return (
    <MainLayout
      title={t("scanner.scan_preview_title")}
      returnIcon={icons.chevron_left}
      headerContainerStyle={{
        paddingHorizontal: moderateScale(20),
        paddingTop: moderateScale(20),
      }}
    >
      <View style={styles.imageWrap}>
        <Image
          style={styles.image}
          source={require("@/assets/images/scan-page-bg.png")}
          contentFit="cover"
        />
      </View>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {uri && (
            <Image
              style={styles.scanImage}
              source={{ uri }}
              contentFit="contain"
            />
          )}
        </View>

        {isLoading ? (
          <View
            style={{ alignItems: "center", marginVertical: moderateScale(20) }}
          >
            <ActivityIndicator size="large" color={activeColors.primary} />
            <Text style={{ color: activeColors.text, marginTop: 10 }}>
              {t("scanner.loading")}
            </Text>
          </View>
        ) : (
          <>
            <View
              style={{ alignItems: "center", marginBottom: moderateScale(10) }}
            >
              <Badge label={prediction ?? "Unknown"} />
            </View>
            <Text style={[styles.title, { color: activeColors.text }]}>
              {prediction
                ? t("scanner.recyclable")
                : t("scanner.no_prediction_found")}
            </Text>
            <PrimaryButton
              onPress={() => {
                router.back();
                router.replace("/(main)/(tabs)/map");
              }}
              label={t("scanner.scan_preview_cta")}
            />
          </>
        )}
      </View>
    </MainLayout>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: "20@ms",
  },
  innerContainer: {
    borderRadius: "20@ms",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 20,
    maxHeight: "460@ms",
    marginBottom: "25@ms",
  },
  imageWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "50%",
    minHeight: "650@ms",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  scanImage: {
    width: "100%",
    height: "100%",
  },
  title: {
    ...(FONTS.h1 as TextStyle),
    textAlign: "center",
    paddingBottom: "20@ms",
  },
});
