import React, { useEffect, useState } from "react";
import { Text, View, Dimensions, TextStyle } from "react-native";
import { Image } from "expo-image";
import ScannerLoader from "@/components/ui/ScannerLoader";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Badge from "@/components/ui/Badge";
import MainLayout from "@/screen-layouts/MainLayout";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import icons from "@/constants/icons";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { ROBOFLOW_API } from "@/constants/config";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

async function detectWithRoboflow(imageUrl: string) {
  const res = await fetch(
    `${ROBOFLOW_API}&image=${encodeURIComponent(imageUrl)}&format=json`,
  );
  if (!res.ok) throw new Error(`Roboflow failed: ${res.status}`);
  return res.json();
}

export default function ScanPreviewScreen() {
  const { t } = useTranslation();
  const { mode } = useTheme();
  const activeColors = COLORS[mode ?? "light"];
  const { imageUrl } = useLocalSearchParams<{ imageUrl: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [boxes, setBoxes] = useState<
    {
      class: string;
      confidence: number;
      x: number;
      y: number;
      width: number;
      height: number;
    }[]
  >([]);

  useEffect(() => {
    (async () => {
      if (!imageUrl) return;
      setIsLoading(true);
      setError(null);
      try {
        const data = await detectWithRoboflow(imageUrl);
        const preds = data.predictions || [];
        setPrediction(preds[0]?.class ?? null);
        setBoxes(preds);
      } catch (e) {
        console.error("Roboflow error:", e);
        setError(t("scanner.api_error"));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [imageUrl]);

  return (
    <MainLayout
      title={t("scanner.scan_preview_title")}
      returnIcon={icons.chevron_left}
      headerContainerStyle={{ paddingHorizontal: moderateScale(20) }}
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
          {imageUrl && (
            <View>
              <Image
                style={styles.scanImage}
                source={{ uri: imageUrl }}
                contentFit="contain"
              />
              {boxes.map((box, i) => {
                const scale = SCREEN_WIDTH / 3072;
                const boxStyle = {
                  left: box.x * scale - (box.width * scale) / 2,
                  top: box.y * scale - (box.height * scale) / 2,
                  width: box.width * scale,
                  height: box.height * scale,
                };
                return (
                  <View key={i} style={[styles.boundingBox, boxStyle]}>
                    <Text
                      style={[
                        styles.labelText,
                        {
                          color: activeColors.text,
                          backgroundColor: activeColors.lightGrayBackground,
                        },
                      ]}
                    >
                      {box.class} ({(box.confidence * 100).toFixed(1)}%)
                    </Text>
                  </View>
                );
              })}
              {isLoading && <ScannerLoader isLoading />}
            </View>
          )}
        </View>

        {isLoading ? (
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: activeColors.text }}>
              {t("scanner.loading")}
            </Text>
          </View>
        ) : prediction ? (
          <>
            <View
              style={{ alignItems: "center", marginBottom: moderateScale(10) }}
            >
              <Badge category={prediction} label={prediction} />
            </View>
            <Text style={[styles.title, { color: activeColors.text }]}>
              {t("scanner.recyclable")}
            </Text>
            <PrimaryButton
              onPress={() => {
                router.back();
                router.push({
                  pathname: "/(main)/(tabs)/map",
                  params: {
                    type: prediction?.toLowerCase() as string,
                  },
                });
              }}
              small
              label={t("scanner.scan_preview_cta")}
            />
          </>
        ) : (
          <>
            <Text style={[styles.title, { color: activeColors.text }]}>
              {error || t("scanner.no_prediction_found")}
            </Text>
            <PrimaryButton
              onPress={() => router.back()}
              small
              label={t("scanner.try_again_cta")}
            />
          </>
        )}
      </View>
    </MainLayout>
  );
}

const styles = ScaledSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: "20@ms" },
  innerContainer: {
    borderRadius: "20@ms",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 20,
    maxHeight: SCREEN_HEIGHT * 0.55,
    marginBottom: "25@ms",
    overflow: "hidden",
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
  image: { width: "100%", height: "100%" },
  scanImage: { width: "100%", height: "100%", aspectRatio: 3 / 4 },
  title: {
    ...(FONTS.h2 as TextStyle),
    textAlign: "center",
    paddingBottom: "20@ms",
  },
  boundingBox: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "#00FF00",
    backgroundColor: "rgba(0,255,0,0.15)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  labelText: {
    fontWeight: "bold",
    fontSize: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
});
