import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { TextStyle, View } from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";

import { AlertType, RecaptchaUserBody } from "@/types/global";
import Toast from "react-native-toast-message";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import FormInput from "@/components/formElements/FormInput";
import ProfileBottomAction from "@/screens/settings-screens/components/ProfileBottomAction";
import { User } from "@/context/auth/authTypes";
import { router } from "expo-router";
import { useUpdateUser } from "@/reactQuery/user";
import useGlobalStore from "@/stores/globalStore";
import { useAuthContext } from "@/context/auth/authContext";

interface EditProfileFormProps {
  user: User | null;
  onSwitchMode: Dispatch<
    SetStateAction<"Edit" | "Update_Password" | "Forgot_Password">
  >;
  handleShowInlineAlert: (message: string, type: AlertType) => void;
}

const EditProfileForm = ({
  user,
  onSwitchMode,
  handleShowInlineAlert,
}: EditProfileFormProps) => {
  const { t } = useTranslation();
  const lang = useGlobalStore((state) => state.lang);
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  const nameInputRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { updateUserBasicInfo } = useAuthContext();

  const { mutateAsync: updateUser } = useUpdateUser(lang);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const schema = z.object({
    firstName: z.string().min(1, { message: "Name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email" }),
  });
  type FormData = z.infer<typeof schema>;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
  });
  const onSubmit = async (data: FormData) => {
    const userObject = {
      firstName: data.firstName,
      lastName: data.lastName,
    };

    try {
      setIsLoading(true);
      const body = {
        id: user?.id,
        user: userObject,
      };

      const response = await updateUser(body as RecaptchaUserBody);
      console.log("RESPONSE", response.data);
      if (response?.data?.code === 200) {
        console.log("UPDATED USER", response?.data?.data);
        updateUserBasicInfo(response?.data?.data);
        Toast.show({
          type: "success",
          text1: t("settings.user_updated"),
        });
      } else {
        handleShowInlineAlert(t("general.general_error"), "error");
      }
      router.back();
    } catch (e) {
      Toast.show({
        type: "error",
        //text1: t("settings.user_updated"),
        text1: "User update failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        justifyContent: "space-between",
        flex: 1,
        paddingBottom: moderateScale(40, 0.2),
      }}
    >
      <View>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, value } }) => (
            <FormInput
              label={t("form.name")}
              ref={nameInputRef}
              value={value}
              onChange={onChange}
              errorMsg={errors.firstName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, value } }) => (
            <FormInput
              label={t("form.lastname")}
              value={value}
              onChange={onChange}
              errorMsg={errors.lastName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <FormInput
              label={t("form.email")}
              value={value}
              onChange={onChange}
              errorMsg={errors.email?.message}
              readOnly={true}
            />
          )}
        />

        {/*<View style={styles.secBtnContainer}>
          <TouchableOpacity onPress={() => onSwitchMode("Update_Password")}>
            <Text style={[styles.secBtnText, { color: activeColors.primary }]}>
              {t("general.change_password")}
            </Text>
          </TouchableOpacity>
        </View>*/}
      </View>
      <ProfileBottomAction
        t={t}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
    </View>
  );
};
const styles = ScaledSheet.create({
  secBtnContainer: {
    marginVertical: "20@ms0.2",
  },
  secBtnText: {
    ...(FONTS.body1 as TextStyle),
    fontSize: moderateScale(14),
  },
});
export default EditProfileForm;
