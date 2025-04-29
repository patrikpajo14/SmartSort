import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export default function EducationCategoryScreen() {
  const { category } = useLocalSearchParams();
  console.log(category);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ title: String(category) });
  }, [category]);

  return (
    <View style={styles.container}>
      <Text>EducationCategory {category} screen</Text>
    </View>
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
});
