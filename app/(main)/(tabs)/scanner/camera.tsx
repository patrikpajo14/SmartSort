import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { CameraView } from "expo-camera";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import MainLayout from "@/screen-layouts/MainLayout";
import icons from "@/constants/icons";
import { moderateScale } from "react-native-size-matters";

const { width, height } = Dimensions.get("window");

export default function CameraScreen() {
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

  const takePicture = async () => {
    if (!cameraRef.current) return;

    setIsProcessing(true);

    const photo = await cameraRef.current.takePictureAsync({
      quality: 1,
      base64: true,
    });

    if (photo?.uri && photo?.base64) {
      setCameraActive(false);
      setShowCamera(false);
      console.log("📸 Captured");

      router.push({
        pathname: "/(main)/(tabs)/scanner/scan-preview",
        params: {
          uri: photo.uri,
        },
      });

      console.log("ROUTER PUSHED");
    }
  };

  return (
    <MainLayout
      returnIcon={icons.chevron_left}
      headerContainerStyle={{ paddingHorizontal: moderateScale(20) }}
    >
      {showCamera && (
        <View style={styles.container}>
          <CameraView
            ref={cameraRef}
            style={{ flex: 1, width: "100%", height: "100%" }}
            active={isCameraActive}
          />
          <View pointerEvents="none" style={styles.frameOverlay}>
            <View style={styles.frameBox} />
          </View>
          <View style={styles.controls}>
            <TouchableOpacity
              onPress={takePicture}
              style={styles.captureButton}
            >
              <Text style={styles.buttonText}>📸</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {isProcessing && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.processingText}>Processing Image...</Text>
        </View>
      )}
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  controls: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  captureButton: {
    backgroundColor: "#ffffffcc",
    padding: 16,
    borderRadius: 50,
  },
  buttonText: { fontSize: 18, color: "#000" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  processingText: {
    marginTop: 20,
    color: "#fff",
    fontSize: 18,
  },
  frameOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  frameBox: {
    width: width * 0.8,
    height: height * 0.4,
    borderColor: "#00FFAA",
    borderWidth: 3,
    borderRadius: 12,
    backgroundColor: "transparent",
  },
});
