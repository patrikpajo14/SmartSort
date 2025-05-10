import { ActiveColors } from "@/types/global";
import { moderateScale } from "react-native-size-matters";
import { Image } from "expo-image";
import icons from "@/constants/icons";

export const getBottomTabIcon = (tab: string, activeColors: ActiveColors) => {
  const getIconStyle = (width: number, height: number) => ({
    width: moderateScale(width, 0.2),
    height: moderateScale(height, 0.2),
  });

  switch (tab) {
    case "index": {
      const style = getIconStyle(24, 24);
      return (
        <Image
          source={icons.home}
          style={style}
          tintColor={activeColors.white}
        />
      );
    }
    case "map": {
      const style = getIconStyle(24, 24);
      return (
        <Image
          source={icons.map}
          style={style}
          tintColor={activeColors.white}
        />
      );
    }
    case "education": {
      const style = getIconStyle(24, 20);
      return (
        <Image
          source={icons.education}
          style={style}
          tintColor={activeColors.white}
        />
      );
    }
    case "settings": {
      const style = getIconStyle(24, 24);
      return (
        <Image
          source={icons.settings}
          style={style}
          tintColor={activeColors.white}
        />
      );
    }
    default: {
      const style = getIconStyle(24, 24);
      return <Image source={icons.home} style={style} />;
    }
  }
};
