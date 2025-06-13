import Settings from "@/screens/settings-screens";
import { FlatList, Text, TextStyle, View } from "react-native";
import { educationList } from "@/constants/config";
import EducationItem from "@/screens/education-screens/components/EducationItem";
import { router } from "expo-router";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { COLORS, FONTS } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";

export default function EducationFlatList() {
  const { mode } = useTheme();
  let activeColors = COLORS[mode];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: activeColors.text }]}>
        Recycling guide
      </Text>
      <FlatList
        data={educationList}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <EducationItem
            key={item.id}
            label={item.title}
            image={item.icon}
            educationStyles={{ marginRight: moderateScale(10) }}
            onPress={() => {
              router.push({
                pathname: "/(main)/(tabs)/education",
                params: { category: item.type },
              });
            }}
          />
        )}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    marginBottom: "20@ms",
  },
  title: {
    ...(FONTS.semiBold2 as TextStyle),
    marginBottom: "15@ms",
  },
});
