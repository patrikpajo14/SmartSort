import { ScrollView, Text, TextStyle, View } from "react-native";
import Badge from "@/components/ui/Badge";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { COLORS, FONTS } from "@/constants/theme";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";

interface EducationPreviewProps {
  category: string | string[];
  onPress: () => void;
}

export default function EducationPreview({
  category,
  onPress,
}: EducationPreviewProps) {
  const { t } = useTranslation();
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={[styles.headerTitle, { color: activeColors.text }]}
          numberOfLines={2}
        >
          {t("education.how_to")} {category}
        </Text>
        <Badge label={"Yellow container"} />
      </View>
      <ScrollView>
        <View style={styles.bullets}>
          <Text style={[styles.bullet, { color: activeColors.text }]}>
            <Text style={styles.bulletBold}>• Check: </Text>
            Find the recycling symbol (1–7) on the plastic.
          </Text>
          <Text style={[styles.bullet, { color: activeColors.text }]}>
            <Text style={styles.bulletBold}>• Clean: </Text>
            Rinse off food or liquids.
          </Text>
          <Text style={[styles.bullet, { color: activeColors.text }]}>
            <Text style={styles.bulletBold}>• Sort: </Text>
            Group by type if needed.
          </Text>
          <Text style={[styles.bullet, { color: activeColors.text }]}>
            <Text style={styles.bulletBold}>• Dispose: </Text>
            Use recycling bins or centers.
          </Text>
        </View>

        <View style={styles.benefits}>
          <Text style={[styles.benefitTitle, { color: activeColors.text }]}>
            Benefit
          </Text>
          <Text style={[styles.benefitSubTitle, { color: activeColors.text }]}>
            1. Environmental Impact
          </Text>
          <Text style={[styles.benefitText, { color: activeColors.text }]}>
            Recycling plastic reduces pollution, conserves resources, and lowers
            greenhouse gas emissions by reusing materials.
          </Text>
          <Text style={[styles.benefitSubTitle, { color: activeColors.text }]}>
            2. Economic Efficiency
          </Text>
          <Text style={[styles.benefitText, { color: activeColors.text }]}>
            Saves costs, creates jobs in recycling industries, and supports a
            circular economy.
          </Text>
        </View>
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <PrimaryButton
          label={t("education.guidelines")}
          onPress={onPress}
          outerContainerStyle={{ marginBottom: moderateScale(30) }}
        />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    paddingVertical: "25@ms",
    paddingHorizontal: "20@ms",
    marginBottom: "100@ms",
  },
  header: {
    width: "100%",
    marginBottom: "20@ms",
    flexDirection: "row",
    gap: "15@ms",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    ...(FONTS.body2 as TextStyle),
    fontWeight: "500",
    flex: 1,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  bullets: {
    marginBottom: "20@ms",
  },
  bullet: {
    ...(FONTS.body3 as TextStyle),
    marginBottom: "6@ms",
  },
  bulletBold: {
    fontWeight: "700",
  },
  benefits: {
    marginBottom: "20@ms",
  },
  benefitTitle: {
    ...(FONTS.h4 as any),
    fontWeight: "700",
    marginBottom: "8@ms",
  },
  benefitSubTitle: {
    fontWeight: "600",
    marginBottom: "4@ms",
  },
  benefitText: {
    ...(FONTS.body3 as TextStyle),
    marginBottom: "10@ms",
  },
  buttonWrapper: {
    paddingTop: "15@ms",
  },
});
