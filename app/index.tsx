import { useCallback, useRef } from "react";
import {
  ImageURISource,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import ListItem from "@/components/ListItem";
import PaginationElement from "@/components/PaginationElement";
import Button from "@/components/Button";

const pages = [
  {
    title: "Join the Green Movement",
    subtitle: "Contribute to sustainability with easy, effective recycling.",
    image: require("../assets/images/screen1.png"),
  },
  {
    title: "Nearby Recycling Stations",
    subtitle:
      "Find the nearest recycling drop-off points with real-time updates.",
    image: require("../assets/images/screen2.png"),
  },
  {
    title: "Smart Waste Identification:",
    subtitle:
      "Instantly identify your waste and get proper disposal instructions with AI.",
    image: require("../assets/images/screen3.png"),
  },
];

export default function App() {
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const flatListRef = useAnimatedRef<
    Animated.FlatList<{
      text: string;
      image: ImageURISource;
    }>
  >();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      flatListIndex.value = viewableItems[0].index ?? 0;
    },
    [],
  );
  const scrollHandle = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const renderItem = useCallback(
    ({
      item,
      index,
    }: {
      item: { title: string; subtitle: string; image: ImageURISource };
      index: number;
    }) => {
      return <ListItem item={item} index={index} x={x} />;
    },
    [x],
  );
  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={scrollHandle}
        horizontal
        scrollEventThrottle={16}
        pagingEnabled={true}
        data={pages}
        keyExtractor={(_, index) => index.toString()}
        bounces={false}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <View style={styles.paginationContainer}>
        <PaginationElement length={pages.length} x={x} />
      </View>
      <View style={styles.bottomContainer}>
        <Pressable>
          <Text style={styles.skipButton}>Skip</Text>
        </Pressable>
        <Button
          currentIndex={flatListIndex}
          length={pages.length}
          flatListRef={flatListRef}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "white",
  },
  skipButton: {
    color: "#A8A8A8",
    fontSize: 16,
    fontWeight: "500",
  },
  paginationContainer: {
    paddingBottom: 45,
  },
});
