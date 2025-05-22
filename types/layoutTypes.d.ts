import { ViewStyle, ImageStyle, TextStyle } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { ActiveColors } from "./global";

export type IconType = ReturnType<typeof require>;

export interface SharedLayoutProps {
  title?: string;
  returnIcon?: IconType;
  returnLabel?: string;
  returnIconStyle?: ImageStyle;
  actionIcon?: IconType;
  refreshing?: boolean;
  onActionPress?: () => void;
  onReturnPress?: () => void;
  actionIconStyle?: ImageStyle;
  actionText?: string;
  actionDisabled?: boolean;
  customBackButton?: React.ReactNode | null;
  actionButtonStyle?: ViewStyle;
}

export interface MainLayoutProps extends SharedLayoutProps {
  contentContainerStyle?: ViewStyle;
  headerContainerStyle?: ViewStyle;
  children: React.ReactNode;
  bottomInset?: boolean;
}

export interface MainSectionTitleProps extends SharedLayoutProps {
  titleStyle?: TextStyle;
  contentContainerStyle?: ViewStyle;
  activeColors: any;
}
