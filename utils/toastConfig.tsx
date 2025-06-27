import React from "react";
import { AlertType } from "@/types/global";
import CustomToast from "@/components/common/CustomToast";

type ToastProps = {
  text1?: string;
  text2?: string;
};

type ToastConfigFunction = (props: ToastProps) => React.ReactNode;

export const toastConfig: Record<AlertType, ToastConfigFunction> = {
  success: ({ text1, text2 }: ToastProps) => (
    <CustomToast status="success" title={text1} message={text2} />
  ),
  error: ({ text1, text2 }: ToastProps) => (
    <CustomToast status="error" title={text1} message={text2} />
  ),
  info: ({ text1, text2 }: ToastProps) => (
    <CustomToast status="info" title={text1} message={text2} />
  ),
  warning: ({ text1, text2 }: ToastProps) => (
    <CustomToast status="warning" title={text1} message={text2} />
  ),
};
