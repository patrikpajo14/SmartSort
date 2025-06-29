import { Text, TextStyle, TouchableOpacity, View } from "react-native";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SceneRendererProps, TabView } from "react-native-tab-view";
import { TabParamList } from "@/app/(main)/(tabs)/_layout";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import LocationsListTab, {
  LocationsFlatListProps,
} from "@/screens/map-screen/LocationsListTab";
import MapTab from "@/screens/map-screen/MapTab";
import NavigationModal from "@/screens/map-screen/components/NavigationModal";
import { Location } from "@/types/global";
import MainLayout from "@/screen-layouts/MainLayout";
import icons from "@/constants/icons";
import CustomBottomSheet from "@/components/common/CustomBottomSheet";
import Filters from "@/screens/map-screen/components/Filters";
import { useFetchLocations } from "@/reactQuery/locations";
import useGlobalStore from "@/stores/globalStore";

type Route = any;

type RenderSceneProps = SceneRendererProps & {
  route: Route;
};

const FirstRoute = ({ onLocationPress }: { onLocationPress: any }) => (
  <MapTab onLocationPress={onLocationPress} />
);

const SecondRoute = ({
  locations,
  loadMore,
  refetch,
  isFetchingNextPage,
  onLocationPress,
}: LocationsFlatListProps) => (
  <LocationsListTab
    locations={locations}
    refetch={refetch}
    loadMore={loadMore}
    isFetchingNextPage={isFetchingNextPage}
    onLocationPress={onLocationPress}
  />
);

type MapScreenRouteProp = RouteProp<TabParamList, "Map">;

const MapScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const lang = useGlobalStore((state) => state.lang);
  const route = useRoute<MapScreenRouteProp>();
  const { openBottomSheet } = route.params || {};
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [navigationModalVisible, setNavigationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const [index, setIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const {
    data: locations,
    isError: locationsError,
    refetch: locationsRefetch,
    isLoading: locationsLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchLocations(lang, isFocused);

  const [routes] = useState([
    { key: "map", title: t("locations.map") },
    { key: "locations", title: t("locations.locations_list") },
  ]);

  useFocusEffect(
    React.useCallback(() => {
      if (openBottomSheet) {
        bottomSheetRef.current?.present();
      }
      setIsFocused(true);
      return () => {
        if (route.params?.openBottomSheet) {
          navigation.setParams({
            openBottomSheet: false,
          });
        }
        setIsFocused(false);
      };
    }, [route.params?.openBottomSheet]),
  );

  const locationsList = locations?.pages
    ? locations.pages.flatMap((page) => {
        const locationsList = page?.locations || [];
        return locationsList.filter(
          (location: any) => Object.keys(location).length > 0,
        );
      })
    : [];

  console.log("locations", locationsList);

  const fetchMoreRef = useRef(false);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage && !fetchMoreRef.current) {
      fetchMoreRef.current = true;
      fetchNextPage().finally(() => {
        fetchMoreRef.current = false;
      });
    }
  };

  const handleFilterPress = () => {
    bottomSheetRef.current?.present();
  };

  const handleFilterClose = () => {
    bottomSheetRef.current?.dismiss();
  };

  const handleFilterChange = (type: string) => {
    setSelectedFilters((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type],
    );
  };

  const handleClearAll = () => {
    setSelectedFilters([]);
  };

  const onLocationPress = (location: Location) => {
    setSelectedLocation(location);
    setNavigationModalVisible(true);
  };

  useEffect(() => {
    if (route.params?.selectedTab) {
      setTimeout(() => {
        setIndex(1);
      }, 400);
    }
    return () => {
      if (route.params?.selectedTab) {
        navigation.setParams({
          selectedTab: null,
        });
      }
    };
  }, [route.params]);

  const renderScene = ({ route }: RenderSceneProps) => {
    switch (route.key) {
      case "map":
        return <FirstRoute onLocationPress={onLocationPress} />;
      case "locations":
        return (
          <SecondRoute
            locations={locationsList}
            onLocationPress={onLocationPress}
            loadMore={loadMore}
            refetch={locationsRefetch}
            isFetchingNextPage={isFetchingNextPage}
          />
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props: any) => {
    return (
      <View style={styles.tabButtons}>
        {props.navigationState.routes.map((route: any, i: any) => {
          const isActive = index === i;
          return (
            <TouchableOpacity
              key={i}
              style={styles.tabButton}
              onPress={() => setIndex(i)}
            >
              <View
                style={[
                  styles.tabButtonInner,
                  {
                    borderWidth: 1,
                    borderColor: activeColors.border,
                    backgroundColor: isActive
                      ? activeColors.border
                      : activeColors.background,
                  },
                  i === 0
                    ? { borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }
                    : { borderTopRightRadius: 30, borderBottomRightRadius: 30 },
                ]}
              >
                <Text
                  style={[styles.tabButtonText, { color: activeColors.text }]}
                >
                  {route.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <MainLayout
      returnIcon={icons.chevron_left}
      title={"Map"}
      actionIcon={icons.filters}
      actionButtonStyle={{
        borderWidth: 1,
        borderColor: activeColors.border,
        padding: moderateScale(10),
        borderRadius: 10,
      }}
      actionIconStyle={{ tintColor: activeColors.text }}
      onActionPress={handleFilterPress}
      contentContainerStyle={{ paddingHorizontal: moderateScale(20) }}
    >
      <View style={styles.container}>
        <TabView
          lazy={true}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: SIZES.width }}
          renderTabBar={renderTabBar}
        />
      </View>
      <CustomBottomSheet
        ref={bottomSheetRef}
        snapPoints={["50%"]}
        onClose={handleFilterClose}
        showFooter={false}
        useKeyboardScrollView={true}
      >
        <Filters
          activeColors={activeColors}
          t={t}
          filters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
          handleFilterClose={handleFilterClose}
        />
      </CustomBottomSheet>
      <NavigationModal
        location={selectedLocation}
        isVisible={navigationModalVisible}
        onClose={() => setNavigationModalVisible(false)}
      />
    </MainLayout>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  tabButtons: {
    flexDirection: "row",
    width: "100%",
    paddingTop: "10@ms0.2",
    paddingBottom: "10@ms0.2",
  },
  tabButton: {
    flex: 1,
  },
  tabButtonInner: {
    height: "35@ms0.2",
    alignItems: "center",
    justifyContent: "center",
  },
  tabButtonText: {
    ...(FONTS.body3 as TextStyle),
  },
});

export default MapScreen;
