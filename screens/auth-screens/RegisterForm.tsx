import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { moderateScale } from "react-native-size-matters";
import FormInput from "../../components/formElements/FormInput";
import { AlertType } from "@/types/global";
import { COLORS } from "@/constants/theme";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { router } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

interface RegisterFormProps {
  handleShowInlineAlert: (message: string, type: AlertType) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  handleShowInlineAlert,
}) => {
  const { mode } = useTheme();
  let activeColors = COLORS[mode ?? "light"];
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const {verifyCaptcha} = useRecaptcha();
  const schema = z
    .object({
      name: z.string().min(1, { message: "Required" }),
      surname: z.string().min(1, { message: "Required" }),
      email: z
        .string()
        .min(1, { message: "Required" })
        .email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(8, { message: "Password length must be 8 characters long!" }),
      password2: z
        .string()
        .min(8, { message: "Password length must be 8 characters long!" }),
    })
    .refine((data) => data.password === data.password2, {
      message: "Password match",
      path: ["password2"],
    });

  type FormData = z.infer<typeof schema>;
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      password2: "",
    },
  });
  const clearForm = () => {
    reset();
  };

  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordRef2 = useRef(null);

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const registerUserObject = {
        name: data?.name,
        surname: data?.surname,
        email: data?.email,
        password: data?.password,
        password2: data?.password2,
      };

      console.log(registerUserObject);

      setIsLoading(false);
      // verifyCaptcha(async (token: string) => {
      //
      // });
    } catch (error) {
      // displayAlert("error", t("login.unexpected_error"));
      console.log(error);
    }
  };

  return (
    <View style={{ paddingBottom: moderateScale(50) }}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <FormInput
            label={"Name"}
            value={value}
            onChange={(text) => {
              onChange(text);
            }}
            errorMsg={errors.name?.message}
            ref={nameRef}
            nextInputRef={lastNameRef}
            returnKeyType="next"
            autoCapitalize="none"
            showMaxLength={false}
          />
        )}
      />
      <Controller
        control={control}
        name="surname"
        render={({ field: { onChange, value } }) => (
          <FormInput
            label={"Surname"}
            value={value}
            onChange={(text) => {
              onChange(text);
            }}
            errorMsg={errors.surname?.message}
            ref={lastNameRef}
            nextInputRef={emailRef}
            returnKeyType="next"
            autoCapitalize="none"
            showMaxLength={false}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <FormInput
            label={"Email"}
            value={value}
            onChange={(text) => {
              onChange(text);
            }}
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
            label={"Password"}
            value={value}
            onChange={(text) => {
              onChange(text);
            }}
            errorMsg={errors.password?.message}
            ref={passwordRef}
            secureTextEntry
            nextInputRef={passwordRef2}
            showMaxLength={false}
          />
        )}
      />

      <Controller
        control={control}
        name="password2"
        render={({ field: { onChange, value } }) => (
          <FormInput
            label={"Confirm Password"}
            value={value}
            onChange={(text) => {
              onChange(text);
            }}
            errorMsg={errors.password2?.message}
            ref={passwordRef2}
            secureTextEntry
            returnKeyType="done"
            showMaxLength={false}
          />
        )}
      />

      <View style={{ marginVertical: moderateScale(30, 0.2) }}>
        <PrimaryButton
          label={"Register"}
          isLoading={isLoading}
          disabled={isSubmitting || isLoading}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 5,
          marginBottom: 10,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: activeColors.text }}>
          Your already have account?
        </Text>
        <TouchableOpacity onPress={() => router.navigate("/login")}>
          <Text style={{ color: activeColors.primary }}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterForm;
