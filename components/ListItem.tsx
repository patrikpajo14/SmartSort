import {
  View,
  useWindowDimensions,
  ImageURISource,
  StyleSheet,
} from "react-native";
import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useTheme } from "@/context/ThemeContext";
import { COLORS } from "@/constants/theme";

type Props = {
  item: { title: string; subtitle: string; image: ImageURISource };
  index: number;
  x: Animated.SharedValue<number>;
};

const ListItem = ({ item, index, x }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];

  const rnImageStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      width: SCREEN_WIDTH,
      height: SCREEN_WIDTH,
      transform: [{ translateY }],
    };
  }, [index, x]);

  const rnTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      transform: [{ translateY }],
    };
  }, [index, x]);
  return (
    <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
      <Animated.Image
        source={item.image}
        style={rnImageStyle}
        resizeMode="contain"
      />
      <View style={styles.textWrap}>
        <Animated.Text
          style={[styles.title, { color: activeColors.text }, rnTextStyle]}
        >
          {item.title}
        </Animated.Text>
        <Animated.Text
          style={[styles.subtitle, { color: activeColors.text }, rnTextStyle]}
        >
          {item.subtitle}
        </Animated.Text>
      </View>
    </View>
  );
};

export default React.memo(ListItem);

const styles = StyleSheet.create({
  itemContainer: {
    paddingTop: 80,
  },
  textWrap: {
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontWeight: "600",
    lineHeight: 24,
    fontSize: 16,
    marginBottom: 18,
    textAlign: "center",
  },
  subtitle: {
    fontWeight: "400",
    lineHeight: 24,
    fontSize: 16,
    textAlign: "center",
  },
});
