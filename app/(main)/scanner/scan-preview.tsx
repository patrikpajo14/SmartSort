import React, { useEffect, useState } from "react";
import { Text, TextStyle, View, Dimensions } from "react-native";
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
import axios from "axios";
import mime from "mime";
import { ROBOFLOW_API } from "@/constants/config";
import ScannerLoader from "@/components/ui/ScannerLoader";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ScanPreviewScreen() {
  const { t } = useTranslation();
  const { mode } = useTheme();
  const activeColors = COLORS[mode ?? "light"];
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const [isLoading, setIsLoading] = useState(true);
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
    const processImage = async () => {
      try {
        if (!uri) return;

        const mimeType = mime.getType(uri) || "image/jpeg";
        const fileName = uri.split("/").pop();

        const formData = new FormData();
        formData.append("file", {
          uri,
          type: mimeType,
          name: fileName,
        } as any);

        console.log("📡 Sending to:", ROBOFLOW_API);
        console.log("🧾 Payload:", formData);

        const response = await axios.post(ROBOFLOW_API || "", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const pred = response?.data?.predictions?.[0]?.class ?? null;
        const preds = response?.data?.predictions ?? [];

        setPrediction(pred);
        setBoxes(preds);
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
            <View>
              <Image
                style={styles.scanImage}
                source={{ uri }}
                contentFit="contain"
              />
              {boxes.map((box, index) => {
                const scaleFactor = SCREEN_WIDTH / 3072;
                const boxStyle = {
                  left: box.x * scaleFactor - (box.width * scaleFactor) / 2,
                  top: box.y * scaleFactor - (box.height * scaleFactor) / 2,
                  width: box.width * scaleFactor,
                  height: box.height * scaleFactor,
                };

                return (
                  <View key={index} style={[styles.boundingBox, boxStyle]}>
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

              {isLoading && <ScannerLoader isLoading={isLoading} />}
            </View>
          )}
        </View>

        {isLoading ? (
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: activeColors.text }}>
              {t("scanner.loading")}
            </Text>
          </View>
        ) : (
          <>
            {prediction ? (
              <>
                <View
                  style={{
                    alignItems: "center",
                    marginBottom: moderateScale(10),
                  }}
                >
                  <Badge label={prediction} />
                </View>
                <Text style={[styles.title, { color: activeColors.text }]}>
                  {t("scanner.recyclable")}
                </Text>
                <PrimaryButton
                  onPress={() => {
                    router.back();
                    router.replace("/(main)/(tabs)/map");
                  }}
                  small={true}
                  label={t("scanner.scan_preview_cta")}
                />
              </>
            ) : (
              <>
                <Text style={[styles.title, { color: activeColors.text }]}>
                  {t("scanner.no_prediction_found")}
                </Text>
                <PrimaryButton
                  onPress={() => {
                    router.back();
                  }}
                  small={true}
                  label={t("scanner.try_again_cta")}
                />
              </>
            )}
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
  image: {
    width: "100%",
    height: "100%",
  },
  scanImage: {
    width: "100%",
    height: "100%",
    aspectRatio: 3 / 4,
  },
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
