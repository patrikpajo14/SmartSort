import { StyleSheet, View, useWindowDimensions } from "react-native";
import React, { useCallback } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  length: number;
  x: Animated.SharedValue<number>;
};

const PaginationElement = ({ length, x }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const PaginationComponent = useCallback(({ index }: { index: number }) => {
    const itemRnStyle = useAnimatedStyle(() => {
      const width = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [10, 24, 10],
        Extrapolate.CLAMP,
      );

      const bgColor = interpolateColor(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        ["#67A51520", "#67A515", "#67A51520"],
      );

      return {
        width,
        backgroundColor: bgColor,
      };
    }, [x]);
    return <Animated.View style={[styles.itemStyle, itemRnStyle]} />;
  }, []);

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => {
        return <PaginationComponent index={index} key={index} />;
      })}
    </View>
  );
};

export default PaginationElement;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  itemStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
