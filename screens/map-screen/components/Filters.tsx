import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import FilterButton from "@/screens/map-screen/components/FilterButton";
import PrimaryButtonForSheet from "@/components/ui/PrimaryButtonForSheet";

type FiltersProps = {
  activeColors: any;
  t: any;
  filters: string[];
  onFilterChange: (filters: string[]) => void;
  handleFilterClose: () => void;
};

const Filters = ({
  activeColors,
  t,
  filters,
  onFilterChange,
  handleFilterClose,
}: FiltersProps) => {
  const [localFilters, setLocalFilters] = useState<string[]>(filters);

  // keep in sync if parent re-opens with different filters
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const availableFilters = [
    { id: 1, name: t("general.plastic"), type: "plastic" },
    { id: 2, name: t("general.glass"), type: "glass" },
    { id: 3, name: t("general.paper"), type: "paper" },
    /*    { id: 4, name: t("general.tiers"), type: "recycle_yard" },
    { id: 5, name: t("general.batteries"), type: "recycle_yard" },
    { id: 6, name: t("general.metal"), type: "recycle_yard" },
    { id: 7, name: t("general.carton"), type: "paper" },*/
  ];

  const toggleFilter = (type: string) => {
    setLocalFilters((prev) =>
      prev.includes(type) ? prev.filter((f) => f !== type) : [...prev, type],
    );
  };

  const clearAll = () => {
    setLocalFilters([]);
  };

  const applyFilters = () => {
    console.log("applyFilters", filters, localFilters);
    onFilterChange(localFilters as string[]);
    handleFilterClose();
  };

  return (
    <BottomSheetView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={[styles.title, { color: activeColors.text }]}>
          {t("general.filters_title")}
        </Text>
        <Text
          style={[styles.clear, { color: activeColors.text }]}
          onPress={clearAll}
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
            active={localFilters.includes(filter.type)}
            onPress={() => toggleFilter(filter.type)}
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
