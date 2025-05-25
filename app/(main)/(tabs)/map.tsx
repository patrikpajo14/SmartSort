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
// import Spinner from "../../components/common/Spinner";
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

type Route = any;

type RenderSceneProps = SceneRendererProps & {
  route: Route;
};

const FirstRoute = ({
  locations,
  onLocationPress,
}: {
  locations: any;
  onLocationPress: any;
}) => <MapTab locations={locations} onLocationPress={onLocationPress} />;

const SecondRoute = ({
  user,
  locations,
  onLocationPress,
}: LocationsFlatListProps) => (
  <LocationsListTab
    user={user}
    locations={locations}
    onLocationPress={onLocationPress}
  />
);

const locations = [
  {
    id: "1",
    name: "Recycling Station A",
    coordinates: { latitude: 45.815, longitude: 15.9819 },
    isOpen: true,
    rating: 4.5,
    distanceKm: 1.2,
    garbageType: "Plastic",
  },
  {
    id: "2",
    name: "Recycling Station B",
    coordinates: { latitude: 45.816, longitude: 15.9805 },
    isOpen: false,
    rating: 3.8,
    distanceKm: 2.7,
    garbageType: "Glass",
  },
  {
    id: "3",
    name: "Recycling Station C",
    coordinates: { latitude: 45.814, longitude: 15.9825 },
    isOpen: true,
    rating: 4.9,
    distanceKm: 0.6,
    garbageType: "Electronics",
  },
];
type MapScreenRouteProp = RouteProp<TabParamList, "Map">;

const MapScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<MapScreenRouteProp>();
  const { openBottomSheet } = route.params || {};
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  const [navigationModalVisible, setNavigationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const [index, setIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [routes] = useState([
    { key: "map", title: t("locations.map") },
    { key: "locations", title: t("locations.locations_list") },
  ]);
  const user = {
    id: 1,
    name: "Patrik",
    lastname: "Stojsavljevic",
    email: "pstojsavl@text.net",
  };
  const userId = user?.id || null;

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

  const fetchMoreRef = useRef(false);

  /*const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage && !fetchMoreRef.current) {
      fetchMoreRef.current = true;
      fetchNextPage().finally(() => {
        fetchMoreRef.current = false;
      });
    }
  };*/

  const handleFilterPress = () => {
    console.log("handleFilterPress");
    bottomSheetRef.current?.expand();
  };

  const handleFilterClose = () => {
    bottomSheetRef.current?.dismiss();
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
    /* if (route.params?.id && flatFriends.length > 0) {
      const friend = flatFriends.find(
        (friend) => friend.id === route.params?.id,
      );
      onFriendFlatListPress(friend);
      if (route.params?.id) {
        navigation.setParams({
          id: null,
        });
      }
    }*/
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
        return (
          <FirstRoute locations={locations} onLocationPress={onLocationPress} />
        );
      case "locations":
        return (
          <SecondRoute
            user={user}
            locations={locations}
            onLocationPress={onLocationPress}
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
        padding: 10,
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
        <CustomBottomSheet
          ref={bottomSheetRef}
          snapPoints={["50%", "80%"]}
          onClose={handleFilterClose}
          handleIcon={icons.settings}
          showFooter={false}
        >
          <Text>Filters</Text>
        </CustomBottomSheet>
      </View>
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
