import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { moderateScale } from "react-native-size-matters";
import MainLayout from "@/screen-layouts/MainLayout";
import icons from "@/constants/icons";
import { CameraView } from "expo-camera";
import { useRef, useState } from "react";

export default function CameraScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo?.uri);
    }
  };

  console.log("PHOTO URI", photoUri);

  return (
    <MainLayout
      returnIcon={icons.chevron_left}
      headerContainerStyle={{ paddingHorizontal: moderateScale(20) }}
    >
      <CameraView style={styles.camera}>
        <View style={styles.controls}>
          <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
            <Text style={styles.buttonText}>📸</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  controls: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 36,
  },
  captureButton: {
    backgroundColor: "#ffffffcc",
    padding: 16,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 20,
    color: "#000",
  },
});
