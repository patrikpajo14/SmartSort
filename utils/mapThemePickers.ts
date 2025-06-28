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
    case "metal":
      return activeColors.brown;
    case "storage":
      return activeColors.brown;
    default:
      return activeColors.primary;
  }
};

export const getContainerText = (t: any, type: string) => {
  switch (type) {
    case "plastic":
      return t("education.plastic_container");
    case "glass":
      return t("education.glass_container");
    case "paper":
      return t("education.paper_container");
    case "metal":
      return t("education.metal_container");
    case "storage":
      return t("education.storage_container");
    default:
      return t("education.storage_container");
  }
};
