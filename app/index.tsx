import { useCallback } from "react";
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
import { useTheme } from "@/context/ThemeContext";
import { COLORS } from "@/constants/theme";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t } = useTranslation();
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];
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

  const pages = [
    {
      title: t("onboardScreen.page_one_title"),
      subtitle: t("onboardScreen.page_one_subtitle"),
      image: require("../assets/images/screen1.png"),
    },
    {
      title: t("onboardScreen.page_two_title"),
      subtitle: t("onboardScreen.page_two_subtitle"),
      image: require("../assets/images/screen2.png"),
    },
    {
      title: t("onboardScreen.page_three_title"),
      subtitle: t("onboardScreen.page_three_subtitle"),
      image: require("../assets/images/screen3.png"),
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
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
        <Pressable
          onPress={() => {
            flatListRef.current?.scrollToIndex({
              index: pages.length - 1,
              animated: true,
            });
          }}
        >
          <Text style={[styles.skipButton, { color: activeColors.textGray }]}>
            {t("general.skip")}
          </Text>
        </Pressable>
        <Button
          btnText={t("onboardScreen.cta_label")}
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
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  skipButton: {
    fontSize: 16,
    fontWeight: "500",
  },
  paginationContainer: {
    paddingBottom: 45,
  },
});
