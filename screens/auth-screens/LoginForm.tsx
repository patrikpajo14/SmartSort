import React, { useRef, useState } from "react";
import { Text, TextStyle, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import FormInput from "../../components/formElements/FormInput";
import Toast from "react-native-toast-message";
import { useColorScheme } from "@/hooks/useColorScheme";
import { COLORS, FONTS } from "@/constants/theme";
import { router } from "expo-router";
import { AlertType } from "@/types/global";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useSession } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";

interface LoginFormProps {
  handleShowInlineAlert: (message: string, type: AlertType) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleShowInlineAlert }) => {
  const { t } = useTranslation();
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { signIn } = useSession();

  const schema = z.object({
    email: z
      .string()
      .min(1, { message: t("form.mandatory") })
      .email({ message: t("form.invalid_email") }),
    password: z.string().min(8, {
      message: t("form.password_length"),
    }),
  });
  type FormData = z.infer<typeof schema>;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      console.log("LOGIN DATA", data);
      signIn();
      setIsLoading(false);
      handleShowInlineAlert("Login successfully", "error");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t("form.general_error"),
      });
      setIsLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        isDisabled && { opacity: 0.5, pointerEvents: "none" },
      ]}
    >
      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <FormInput
              label={t("form.email")}
              value={value}
              onChange={onChange}
              errorMsg={errors.email?.message}
              ref={emailRef}
              nextInputRef={passwordRef}
              returnKeyType="next"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              showMaxLength={false}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <FormInput
              label={t("form.password")}
              value={value}
              onChange={onChange}
              errorMsg={errors.password?.message}
              ref={passwordRef}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={handleSubmit(onSubmit)}
              showMaxLength={false}
            />
          )}
        />

        <View style={{ marginVertical: moderateScale(30, 0.2) }}>
          <PrimaryButton
            label={t("auth.sign_in")}
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 5,
          marginBottom: 10,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            ...(FONTS.body3 as TextStyle),
            color: activeColors.text,
          }}
        >
          {t("auth.no_account")}{" "}
        </Text>
        <TouchableOpacity onPress={() => router.navigate("/register")}>
          <Text
            style={{
              ...(FONTS.body3 as TextStyle),
              color: activeColors.primary,
            }}
          >
            {t("auth.create_acc")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: "50@ms",
  },
  form: {
    marginTop: "30@ms",
  },
  title: {
    ...(FONTS.largeTitle as TextStyle),
    textAlign: "center",
    paddingBottom: "10@ms",
  },
  description: {
    ...(FONTS.body1 as TextStyle),
    textAlign: "center",
    paddingBottom: "40@ms",
  },
});
