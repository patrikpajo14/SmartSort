import { View, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import React, { useEffect } from "react";

interface ScannerLoaderProps {
  isLoading: boolean;
}

export default function ScannerLoader({ isLoading }: ScannerLoaderProps) {
  const scanLineY = useSharedValue(0);
  const glowOpacity = useSharedValue(0.5);

  useEffect(() => {
    if (isLoading) {
      // Vertical scan line movement
      scanLineY.value = withRepeat(
        withTiming(460, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true,
      );

      // Shadow glow pulsing
      glowOpacity.value = withRepeat(
        withTiming(0.9, {
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true,
      );
    } else {
      scanLineY.value = 0;
      glowOpacity.value = 0;
    }
  }, [isLoading]);

  const animatedScanLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLineY.value }],
    shadowOpacity: glowOpacity.value,
    opacity: isLoading ? 1 : 0,
  }));

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.overlay}>
        <View style={styles.borderFrame}>
          {/* Scan line with pulsing glow */}
          <Animated.View style={[styles.scanLine, animatedScanLineStyle]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000",
    opacity: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  borderFrame: {
    height: "100%",
    width: "100%",
    borderWidth: 3,
    borderColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
  },
  scanLine: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 4,
    width: "100%",
    backgroundColor: "#00FF00",
    borderRadius: 2,
    shadowColor: "#00FF00",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 15,
  },
});
