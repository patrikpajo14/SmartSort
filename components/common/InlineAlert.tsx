import React from "react";
import { ViewStyle, TextStyle } from "react-native";
import AnimatedWrapper from "./AnimatedWrapper";
import { AlertType } from "@/types/global";
import CustomAlertBody from "./CustomAlertBody";

interface InlineAlertProps {
  title: string;
  message?: string;
  isVisible: boolean;
  onClose: () => void;
  type?: AlertType;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const InlineAlert: React.FC<InlineAlertProps> = ({
  title,
  message,
  isVisible,
  onClose,
  type = "info",
  style,
  textStyle = {},
}) => {
  return (
    <AnimatedWrapper isVisible={isVisible}>
      <CustomAlertBody
        title={title}
        message={message}
        onClose={onClose}
        style={style}
        type={type}
        textStyle={textStyle}
      />
    </AnimatedWrapper>
  );
};

export default InlineAlert;
