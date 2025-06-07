import { COLORS } from "@/constants/theme";

export const getMarkerIcon = (type: string) => {
  switch (type) {
    case "plastic":
      return require("@/assets/markers/plastic-marker.png");
    case "glass":
      return require("@/assets/markers/glass-marker.png");
    case "paper":
      return require("@/assets/markers/paper-marker.png");
    case "storage":
      return require("@/assets/markers/storage-marker.png");
    default:
      return require("@/assets/markers/glass-marker.png");
  }
};

export const getContainerColor = (activeColors: any, type: string) => {
  switch (type) {
    case "plastic":
      return activeColors.yellow;
    case "glass":
      return activeColors.primary;
    case "paper":
      return activeColors.blue;
    case "storage":
      return activeColors.brown;
    default:
      return activeColors.primary;
  }
};
