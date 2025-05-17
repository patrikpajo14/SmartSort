import React, { useEffect, useRef, useState } from "react";
import { Alert, Platform, TextInput, TextStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import InputGroupForSheet from "../../../components/formElements/InputGroupForSheet";
import useGlobalStore from "../../../stores/globalStore";
import Toast from "react-native-toast-message";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import PrimaryButtonForSheet from "@/components/ui/PrimaryButtonForSheet";

type ProfileSheetContentProps = {
  user: any | null;
  onClose: () => void;
  activeColors: any;
  isDarkMode?: boolean;
};

const schema = z.object({
  ime: z.string().min(1, { message: "Name is required" }),
  prezime: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  telefon: z.string().min(1, { message: "* mandatory" }),
});
type FormData = z.infer<typeof schema>;

const ProfileSheetContent = ({
  user,
  onClose,
  activeColors,
}: ProfileSheetContentProps) => {
  const { t } = useTranslation();
  const lang = useGlobalStore((state) => state.lang);
  const nameInputRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countryCodeNumber, setCountryCodeNumber] = useState(
    user?.pozivni_broj,
  );
  const [countryCode, setCountryCode] = useState(user?.country_code);
  // const { updateUserBasicInfo } = useAuthContext();
  // const {verifyCaptcha} = useRecaptcha();
  // const { mutateAsync: updateUser } = useUpdateUser(lang);
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleCountryChange = (country: { cca2: any; callingCode: any }) => {
    if (country.callingCode[0]) {
      setCountryCodeNumber(`+${country.callingCode[0]}`);
    } else {
      setCountryCodeNumber("");
    }
    setCountryCode(country.cca2);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ime: user?.ime || "",
      prezime: user?.prezime || "",
      email: user?.email || "",
      telefon: user?.telefon || "",
    },
  });
  const onSubmit = async (data: FormData) => {
    const userObject = {
      ime: data.ime,
      prezime: data.prezime,
    };

    try {
      setIsLoading(true);

      console.log("USER OBJECT", userObject);

      onClose();
      setIsLoading(false);
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={Platform.OS === "ios"}
      extraScrollHeight={moderateScale(-150, 0.2)}
      keyboardShouldPersistTaps="handled"
      style={[
        styles.container,
        {
          backgroundColor: activeColors.backgroundColor,
        },
      ]}
    >
      <Controller
        control={control}
        name="ime"
        render={({ field: { onChange, value } }) => (
          <InputGroupForSheet
            label={t("form.name")}
            ref={nameInputRef}
            value={value}
            onChange={onChange}
            errorMsg={errors.ime?.message}
            activeColors={activeColors}
          />
        )}
      />
      <Controller
        control={control}
        name="prezime"
        render={({ field: { onChange, value } }) => (
          <InputGroupForSheet
            label={t("form.lastname")}
            value={value}
            onChange={onChange}
            errorMsg={errors.prezime?.message}
            activeColors={activeColors}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <InputGroupForSheet
            label={t("form.email")}
            value={value}
            onChange={onChange}
            errorMsg={errors.email?.message}
            activeColors={activeColors}
            readOnly={true}
          />
        )}
      />

      <BottomSheetView style={styles.btnContainer}>
        <PrimaryButtonForSheet
          activeColors={activeColors}
          label={t("general.cancel")}
          onPress={onClose}
          outerContainerStyle={{
            width: moderateScale(140, 0.2),
            height: moderateScale(50, 0.2),
            alignItems: "center",
            justifyContent: "center",
          }}
          type={"outlined"}
        />
        <PrimaryButtonForSheet
          isLoading={isLoading}
          activeColors={activeColors}
          outerContainerStyle={{ minWidth: moderateScale(140, 0.2) }}
          label={t("general.save")}
          onPress={handleSubmit(onSubmit)}
        />
      </BottomSheetView>
    </KeyboardAwareScrollView>
  );
};
const styles = ScaledSheet.create({
  container: {
    marginTop: "20@ms",
  },
  btnContainer: {
    marginTop: "40@ms0.2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default ProfileSheetContent;
