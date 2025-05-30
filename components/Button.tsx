import {
  ImageURISource,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback } from "react";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { COLORS } from "@/constants/theme";

type Props = {
  currentIndex: Animated.SharedValue<number>;
  length: number;
  flatListRef: any;
  btnText: string;
};
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({ currentIndex, length, flatListRef, btnText }: Props) => {
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];

  const rnBtnStyle = useAnimatedStyle(() => {
    return {
      width:
        currentIndex.value === length - 1 ? withSpring(140) : withSpring(60),
      height: 60,
    };
  }, [currentIndex, length]);

  const rnTextStyle = useAnimatedStyle(() => {
    return {
      opacity:
        currentIndex.value === length - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            currentIndex.value === length - 1 ? withTiming(0) : withTiming(100),
        },
      ],
    };
  }, [currentIndex, length]);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        currentIndex.value !== length - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            currentIndex.value !== length - 1 ? withTiming(0) : withTiming(100),
        },
      ],
    };
  }, [currentIndex, length]);

  const onPress = useCallback(() => {
    if (currentIndex.value === length - 1) {
      router.navigate("/(auth)");
      return;
    } else {
      flatListRef?.current?.scrollToIndex({
        index: currentIndex.value + 1,
      });
    }
  }, []);
  return (
    <AnimatedPressable
      style={[
        styles.container,
        { backgroundColor: activeColors.primary },
        rnBtnStyle,
      ]}
      onPress={onPress}
    >
      <Animated.Text
        style={[styles.textStyle, { color: activeColors.white }, rnTextStyle]}
      >
        {btnText}
      </Animated.Text>
      <Animated.Image
        source={require("../assets/icons/ico_arrow-white.png")}
        style={[styles.imageStyle, imageAnimatedStyle]}
      />
    </AnimatedPressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  textStyle: {
    position: "absolute",
    fontWeight: "600",
    fontSize: 16,
  },
  imageStyle: {
    width: 10,
    height: 20,
    position: "absolute",
  },
});
