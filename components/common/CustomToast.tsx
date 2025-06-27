import React from "react";
import Toast from "react-native-toast-message";
import { AlertType } from "@/types/global";
import CustomAlertBody from "./CustomAlertBody";
import { moderateScale } from "react-native-size-matters";

type CustomToastProps = {
  status: AlertType;
  title?: string;
  message?: string;
};

const CustomToast: React.FC<CustomToastProps> = ({
  status,
  title,
  message,
}) => {
  const handleClose = () => {
    Toast.hide();
  };

  return (
    <CustomAlertBody
      title={title || ""}
      message={message || ""}
      onClose={handleClose}
      type={status}
      style={{ marginTop: moderateScale(25) }}
    />
  );
};

export default CustomToast;
