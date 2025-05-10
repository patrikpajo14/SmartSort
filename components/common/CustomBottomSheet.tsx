import React, { useCallback, forwardRef, ReactNode, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "@/context/ThemeContext";
import { COLORS } from "@/constants/theme";
import { Image } from "expo-image";
import icons from "@/constants/icons";

type CustomBottomSheetProps = {
  children: ReactNode;
  snapPoints?: string[] | number[];
  onClose?: () => void;
  onDelete?: () => void;
  handleIcon: string | undefined;
  leftButtonText?: string;
  rightButtonText?: string;
  showFooter?: boolean;
  useKeyboardScrollView?: boolean;
};

type CustomBottomSheetRef = BottomSheetModal;

const CustomBottomSheet = forwardRef<
  CustomBottomSheetRef,
  CustomBottomSheetProps
>(
  (
    {
      children,
      snapPoints = ["80%", "90%"],
      handleIcon,
      onClose,
      onDelete,
      leftButtonText,
      rightButtonText,
      showFooter = true,
      useKeyboardScrollView = false,
    },
    ref,
  ) => {
    const { mode } = useTheme();
    let activeColors = COLORS[mode];
    const insets = useSafeAreaInsets();

    const handleScroll = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } =
          event.nativeEvent;
        const isEndOfScroll =
          layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

        if (isEndOfScroll) {
          if (ref && "current" in ref && ref.current) {
            ref.current.snapToIndex(1); // Snap to the second snap point (index 1)
          }
        }
      },
      [],
    );

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      [],
    );

    const renderFooter = useCallback(
      (props: BottomSheetFooterProps) => {
        if (!showFooter) {
          return <View></View>;
        }

        return (
          <BottomSheetFooter {...props}>
            <View
              style={[
                styles.bottomRow,
                {
                  backgroundColor: activeColors.background,
                  paddingBottom: insets.bottom + moderateScale(20, 0.2),
                  justifyContent:
                    !leftButtonText || !rightButtonText
                      ? "center"
                      : "space-between",
                },
              ]}
            >
              {leftButtonText && (
                <TouchableOpacity style={styles.ctaButton} onPress={onDelete}>
                  <Image source={icons.home} style={styles.iconStyle} />
                  <Text
                    style={[styles.ctaButtonText, { color: activeColors.text }]}
                  >
                    {leftButtonText}
                  </Text>
                </TouchableOpacity>
              )}
              {rightButtonText && (
                <TouchableOpacity
                  style={styles.ctaButton}
                  onPress={handleClosePress}
                >
                  <Image
                    source={icons.logout}
                    style={styles.iconStyle}
                    tintColor={activeColors.text}
                  />
                  <Text
                    style={[styles.ctaButtonText, { color: activeColors.text }]}
                  >
                    {rightButtonText}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </BottomSheetFooter>
        );
      },
      [mode, leftButtonText, rightButtonText, showFooter],
    );

    const handleClosePress = () => {
      if (ref && "current" in ref && ref.current) {
        ref.current.dismiss();
      }
      onClose?.();
    };

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: "transparent",
        }}
        handleStyle={{ display: "none" }}
        backdropComponent={renderBackdrop}
        footerComponent={renderFooter}
        keyboardBehavior={Platform.OS === "ios" ? "extend" : "interactive"}
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
      >
        <BottomSheetView style={styles.handleRow}>
          <View style={styles.indicatorWrapperStyle}>
            {handleIcon && (
              <Image
                source={handleIcon}
                style={styles.indicatorIconStyle}
                tintColor={activeColors.white}
              />
            )}
          </View>
        </BottomSheetView>
        <BottomSheetView
          style={[
            styles.container,
            { backgroundColor: activeColors.background },
          ]}
        >
          {useKeyboardScrollView ? (
            <BottomSheetView
              style={[
                styles.childrenWrap,
                { backgroundColor: activeColors.background },
              ]}
            >
              {children}
            </BottomSheetView>
          ) : (
            <ScrollView
              style={[
                styles.childrenWrap,
                { backgroundColor: activeColors.background },
              ]}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {children}
            </ScrollView>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

CustomBottomSheet.displayName = "CustomBottomSheet";
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    position: "relative",
    paddingTop: "50@ms",
    borderTopLeftRadius: "20@ms",
    borderTopRightRadius: "20@ms",
  },
  childrenWrap: {
    paddingHorizontal: "30@ms",
    flex: 1,
  },

  bottomRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "40@ms",
    paddingTop: "20@ms",
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  ctaButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: "14@ms",
    lineHeight: "16@ms",
    paddingLeft: "10@ms",
    paddingTop: "5@ms",
  },
  iconStyle: {
    width: "20@ms",
    height: "24@ms",
    objectFit: "contain",
  },
  handleRow: {
    alignItems: "center",
    marginBottom: "-40@ms",
    zIndex: 10,
  },
  indicatorWrapperStyle: {
    width: "80@ms",
    height: "80@ms",
    borderRadius: "40@ms",
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorIconStyle: {
    width: "35@ms",
    height: "30@ms",
    objectFit: "contain",
  },
});

export default CustomBottomSheet;
