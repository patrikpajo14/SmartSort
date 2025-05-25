import React, { Component, ReactNode, ErrorInfo } from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: string | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.log("ErrorBoundary caught an error:", error, info);
    this.setState({ hasError: true, error: error.message });
  }

  render() {
    const { t } = useTranslation();
    if (this.state.hasError) {
      return (
        <View>
          <Text>{t("general.check_wifi")}</Text>
          <Text>{this.state.error}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
