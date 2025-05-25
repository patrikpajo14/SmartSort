import {
  RefreshControl,
  SectionList,
  Text,
  TextStyle,
  View,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// import Spinner from "../../components/common/Spinner";
import useGlobalStore from "../../stores/globalStore";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import LocationListItem from "@/screens/map-screen/components/LocationListItem";
import { Location } from "@/types/global";
import NoContent from "@/components/NoContent";
import icons from "@/constants/icons";
export interface LocationsFlatListProps {
  user: any | null;
  locations: Location[] | null;
  onLocationPress: (item: Location) => void;
}
const LocationsListTab: React.FC<LocationsFlatListProps> = ({
  user,
  locations,
  onLocationPress,
}) => {
  const { t } = useTranslation();
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  const [refreshing, setRefreshing] = useState(false);

  const handleLocationPress = (location: Location) => {
    onLocationPress(location);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // await refetch();
    setRefreshing(false);
  };

  const renderLocationCard = ({ item }: { item: Location }) => {
    return (
      <LocationListItem item={item} onPress={() => handleLocationPress(item)} />
    );
  };

  const renderHeader = ({
    section: { title },
  }: {
    section: { title: string };
  }) => {
    if (title) {
      return (
        <View
          style={[
            styles.headerContainer,
            { backgroundColor: activeColors.background },
          ]}
        >
          <Text
            style={[
              styles.headerText,
              {
                color: activeColors.text,
              },
            ]}
          >
            {title}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderFooter = () => /*isFetchingNextPage ? <Spinner /> :*/ null;

  return (
    <View style={{ flex: 1 }}>
      <SectionList
        sections={[
          {
            title: t("locations.locations_list_title"),
            data: locations ?? [],
          },
        ]}
        renderItem={renderLocationCard}
        renderSectionHeader={renderHeader}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <View style={{ marginTop: moderateScale(50, 0.2) }}>
            <NoContent
              title={t("locations.no_locations")}
              description={t("locations.no_locations_text")}
              icon={icons.map}
            />
          </View>
        }
        refreshControl={
          user ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={activeColors.primary}
            />
          ) : undefined
        }
        onEndReached={() => {
          console.log("load more");
        }}
        onEndReachedThreshold={0.1}
        stickySectionHeadersEnabled={true}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  headerContainer: {
    flex: 1,
    paddingVertical: "10@ms0.2",
  },
  headerText: {
    ...(FONTS.body1 as TextStyle),
    fontSize: "20@ms0.2",
  },
});

export default React.memo(LocationsListTab);
