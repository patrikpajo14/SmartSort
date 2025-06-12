import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Text, TextStyle, TouchableOpacity, View } from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";

import { AlertType } from "@/types/global";
import Toast from "react-native-toast-message";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, FONTS } from "@/constants/theme";
import FormInput from "@/components/formElements/FormInput";
import ProfileBottomAction from "@/screens/settings-screens/components/ProfileBottomAction";

interface EditProfileFormProps {
  user: any | null;
  navigation: any;
  onSwitchMode: Dispatch<
    SetStateAction<"Edit" | "Update_Password" | "Forgot_Password">
  >;
  handleShowInlineAlert: (message: string, type: AlertType) => void;
}

const EditProfileForm = ({
  user,
  onSwitchMode,
  navigation,
  handleShowInlineAlert,
}: EditProfileFormProps) => {
  const { t } = useTranslation();
  const { mode } = useTheme();
  let activeColors = COLORS[mode];
  const nameInputRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const schema = z.object({
    ime: z.string().min(1, { message: "Name is required" }),
    prezime: z.string().min(1, { message: "Last name is required" }),
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
      ime: user?.ime || "",
      prezime: user?.prezime || "",
      email: user?.email || "test@test.com",
    },
  });
  const onSubmit = async (data: FormData) => {
    const userObject = {
      ime: data.ime,
      prezime: data.prezime,
      email: user?.email || "test@test.com",
    };

    try {
      setIsLoading(true);
      const body = {
        id: user?.id,
        user: userObject,
      };
      console.log("body", body);
      if (false) {
        Toast.show({
          type: "success",
          text1: t("settings.user_updated"),
        });
        navigation.goBack();
      } else {
        console.log("show inline alert");
        handleShowInlineAlert(t("form.general_error"), "error");
      }
      setIsLoading(false);
    } catch (e) {
      console.log("ERROR", e);
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
          name="ime"
          render={({ field: { onChange, value } }) => (
            <FormInput
              label={t("form.name")}
              ref={nameInputRef}
              value={value}
              onChange={onChange}
              errorMsg={errors.ime?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="prezime"
          render={({ field: { onChange, value } }) => (
            <FormInput
              label={t("form.lastname")}
              value={value}
              onChange={onChange}
              errorMsg={errors.prezime?.message}
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
        isLoading={isLoading}
        t={t}
        navigation={navigation}
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
