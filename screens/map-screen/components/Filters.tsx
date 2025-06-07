import React from "react";
import { Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import FilterButton from "@/screens/map-screen/components/FilterButton";
import PrimaryButtonForSheet from "@/components/ui/PrimaryButtonForSheet";

type FiltersProps = {
  activeColors: any;
  t: any;
  filters: any;
  onFilterChange: (filters: any) => void;
  onClearAll: () => void;
  handleFilterClose: () => void;
};

const Filters = ({
  activeColors,
  t,
  filters,
  onFilterChange,
  onClearAll,
  handleFilterClose,
}: FiltersProps) => {
  const availableFilters = [
    { id: 1, name: t("general.plastic"), type: "plastic" },
    { id: 2, name: t("general.glass"), type: "glass" },
    { id: 3, name: t("general.paper"), type: "paper" },
    { id: 4, name: t("general.tiers"), type: "recycle_yard" },
    { id: 5, name: t("general.batteries"), type: "recycle_yard" },
    { id: 6, name: t("general.metal"), type: "recycle_yard" },
    { id: 7, name: t("general.carton"), type: "paper" },
  ];

  const applyFilters = () => {
    console.log("applyFilters", filters);
    handleFilterClose();
  };

  return (
    <BottomSheetView style={[styles.container]}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>{t("general.filters_title")}</Text>
        <Text
          style={[styles.clear, { color: activeColors.text }]}
          onPress={onClearAll}
        >
          {t("general.clear_all")}
        </Text>
      </View>
      <View style={styles.filtersWrap}>
        {availableFilters.map((filter) => (
          <FilterButton
            key={filter.id}
            activeColors={activeColors}
            text={filter.name}
            active={filters.includes(filter.type)}
            onPress={() => onFilterChange(filter.type)}
          />
        ))}
      </View>
      <PrimaryButtonForSheet
        activeColors={activeColors}
        label={t("general.apply_filters")}
        onPress={applyFilters}
      />
    </BottomSheetView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "20@ms",
    paddingVertical: "20@ms",
    paddingBottom: "50@ms",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10@ms0.2",
    paddingBottom: "30@ms0.2",
  },
  title: {
    fontSize: "20@ms",
    fontWeight: "600",
  },
  clear: {
    fontSize: "14@ms",
  },
  filtersWrap: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    rowGap: 15,
    paddingBottom: "60@ms",
  },
});
export default Filters;
