import React from 'react';
import {COLORS, FONTS} from '../constants';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../components/helpers/FocusAwareStatusBar';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {MainLayoutProps} from '../types/layoutTypes';
import {useTheme} from '../context/themeContext.tsx';
import LinearGradient from 'react-native-linear-gradient';
import {Text, TextStyle, TouchableOpacity, View} from 'react-native';
import {CachedImage} from '@georstat/react-native-image-cache';
import {truncateText} from '../utils/truncateText.ts';

const SettingsLayout: React.FC<MainLayoutProps> = ({
  title,
  returnIcon,
  returnLabel,
  returnIconStyle,
  onActionPress,
  actionIcon,
  actionText,
  actionIconStyle,
  actionDisabled,
  contentContainerStyle = {},
  children,
  navigation,
  onReturnPress,
}) => {
  if (!onReturnPress) {
    onReturnPress = () => navigation.goBack();
  }
  const {mode} = useTheme();
  let activeColors = COLORS[mode];
  let insets = useSafeAreaInsets();
  const truncatedTitle = truncateText(title || '', 30);
  return (
    <SafeAreaView
      style={[
        {flex: 1, backgroundColor: activeColors.background},
        contentContainerStyle,
      ]}
      edges={['left', 'right']}>
      <FocusAwareStatusBar
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        translucent={true}
        backgroundColor="transparent"
      />
      <View style={styles.gradientWrapper}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[activeColors.primary, activeColors.primaryLight]}
          style={styles.gradient}>
          <View
            style={[
              styles.container,
              contentContainerStyle,
              {paddingTop: insets.top},
            ]}>
            <TouchableOpacity
              onPress={onReturnPress}
              style={styles.returnButton}>
              <CachedImage
                source={returnIcon}
                style={[styles.returnIcon, returnIconStyle]}
                imageStyle={[styles.returnIcon, returnIconStyle]}
                tintColor={activeColors.text}
                resizeMode="contain"
              />
              {returnLabel && (
                <Text style={[styles.returnLabel, {color: activeColors.text}]}>
                  {returnLabel}
                </Text>
              )}
            </TouchableOpacity>
            {title && (
              <Text style={[styles.title, {color: activeColors.text}]}>
                {truncatedTitle}
              </Text>
            )}
            {actionIcon && onActionPress ? (
              <TouchableOpacity
                onPress={onActionPress}
                disabled={actionDisabled}
                style={styles.actionButton}>
                <CachedImage
                  source={actionIcon}
                  style={[styles.actionIcon, actionIconStyle]}
                  imageStyle={[styles.actionIcon, actionIconStyle]}
                  tintColor={activeColors.text}
                  resizeMode="contain"
                />
                {actionText && (
                  <Text
                    style={[styles.actionLabel, {color: activeColors.text}]}>
                    {actionText}
                  </Text>
                )}
              </TouchableOpacity>
            ) : (
              <View style={styles.placeholder} />
            )}
          </View>
        </LinearGradient>
      </View>

      {children}
    </SafeAreaView>
  );
};
const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '30@ms0.2',
  },
  returnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
    paddingVertical: '10@ms',
  },
  returnIcon: {
    width: '24@ms0.2',
    height: '23@ms0.2',
  },
  returnLabel: {
    ...FONTS.body1,
    fontSize: '14@ms',
    lineHeight: '16@ms',
    marginLeft: '10@ms',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
    paddingVertical: '10@ms',
  },
  actionIcon: {
    width: '24@ms0.2',
    height: '23@ms0.2',
  },
  actionLabel: {
    ...FONTS.body1,
    fontSize: '14@ms',
    lineHeight: '16@ms',
    marginLeft: '10@ms',
  },
  title: {
    ...(FONTS.semiBold2 as TextStyle),
    fontSize: '18@ms0.2',
    lineHeight: '20@ms0.2',
  },

  placeholder: {
    width: '25@ms',
  },
  gradient: {
    height: moderateScale(175, 0.2),
  },
  gradientWrapper: {
    overflow: 'hidden',
    borderBottomLeftRadius: moderateScale(30, 0.2),
    borderBottomRightRadius: moderateScale(30, 0.2),
    position: 'relative',
  },
});
export default SettingsLayout;
