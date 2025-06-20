import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TextStyle,
} from "react-native";
import { CameraView } from "expo-camera";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import icons from "@/constants/icons";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { Image } from "expo-image";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function CameraScreen() {
  const { t } = useTranslation();
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];
  const cameraRef = useRef<CameraView>(null);
  const [isCameraActive, setCameraActive] = useState<boolean>(true);
  const [showCamera, setShowCamera] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setShowCamera(true);
      setCameraActive(true);
      setIsProcessing(false);
    }, []),
  );

  const onReturnPress = () => router.back();

  const takePicture = async () => {
    if (!cameraRef.current) return;
    setIsProcessing(true);

    const photo = await cameraRef.current.takePictureAsync({
      quality: 1,
      base64: true,
    });

    if (photo?.uri) {
      setCameraActive(false);
      setShowCamera(false);
      console.log("📸 Captured");
      router.push({
        pathname: "/(main)/scanner/scan-preview",
        params: {
          uri: photo.uri,
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onReturnPress} style={styles.returnButton}>
          <Image
            source={icons.chevron_left}
            style={[styles.returnIcon, { tintColor: activeColors.white }]}
            contentFit="contain"
          />
        </TouchableOpacity>
        {showCamera && (
          <View style={styles.cameraWrapper}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              active={isCameraActive}
            />
          </View>
        )}
        {showCamera && (
          <View pointerEvents="none" style={styles.frameOverlay}>
            <Image
              source={require("@/assets/images/camera-frame.png")}
              style={styles.frameBox}
              contentFit="contain"
            />
          </View>
        )}

        {showCamera && (
          <View style={styles.controls}>
            <TouchableOpacity
              onPress={takePicture}
              style={[
                styles.captureButton,
                { borderColor: activeColors.white },
              ]}
            >
              <Image
                source={icons.camera}
                style={{ width: moderateScale(24), height: moderateScale(24) }}
              />
            </TouchableOpacity>
          </View>
        )}

        {isProcessing && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text
              style={[styles.processingText, { color: activeColors.white }]}
            >
              {t("scanner.processing_image")}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
  },
  controls: {
    position: "absolute",
    bottom: "40@ms",
    width: "100%",
    alignItems: "center",
  },
  captureButton: {
    borderWidth: 1,
    padding: "16@ms",
    borderRadius: 50,
  },
  cameraWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  processingText: {
    ...(FONTS.body1 as TextStyle),
    marginTop: "20@ms",
  },
  frameOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  frameBox: {
    width: width * 0.8,
    height: height * 0.4,
  },
  returnButton: {
    position: "absolute",
    top: "20@ms",
    left: "20@ms",
    zIndex: 999,
    paddingVertical: "10@ms",
  },
  returnIcon: {
    width: "24@ms0.2",
    height: "23@ms0.2",
  },
});
