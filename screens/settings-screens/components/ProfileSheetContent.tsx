import React, {useEffect, useRef, useState} from 'react';
import {Alert, Platform, TextInput, TextStyle} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {useTranslation} from 'react-i18next';
import InputGroupForSheet from '../../../components/formElements/InputGroupForSheet';
import PhoneWithCountryCodeGroup from '../../../components/formElements/PhoneWithCountryCodeGroup';
import SecondaryButtonForSheet from '../../../components/common/SecondaryButtonForSheet';
import PrimaryButtonForSheet from '../../../components/common/PrimaryButtonForSheet';
import useGlobalStore from '../../../stores/globalStore';
import {OneSignal} from 'react-native-onesignal';
import {User} from '../../../auth/context/auth/authTypes';
import {useAuthContext} from '../../../auth/context/auth/authContext';
import {useUpdateUser} from '../../../reactQuery/user';
import {RecaptchaUserBody} from '../../../types/global';
import {useRecaptcha} from '../../../context/recaptchaContext';
import Toast from 'react-native-toast-message';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {FONTS} from '../../../constants';

type ProfileSheetContentProps = {
  user: User | null;
  onClose: () => void;
  activeColors: any;
  isDarkMode?: boolean;
};

const schema = z.object({
  ime: z.string().min(1, {message: 'Name is required'}),
  prezime: z.string().min(1, {message: 'Last name is required'}),
  email: z.string().email({message: 'Invalid email'}),
  telefon: z.string().min(1, {message: '* mandatory'}),
});
type FormData = z.infer<typeof schema>;

const ProfileSheetContent = ({
  user,
  onClose,
  activeColors,
}: ProfileSheetContentProps) => {
  const {t} = useTranslation();
  const lang = useGlobalStore(state => state.lang);
  const nameInputRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countryCodeNumber, setCountryCodeNumber] = useState(
    user?.pozivni_broj,
  );
  const [countryCode, setCountryCode] = useState(user?.country_code);
  const {updateUserBasicInfo} = useAuthContext();
  // const {verifyCaptcha} = useRecaptcha();
  const {mutateAsync: updateUser} = useUpdateUser(lang);
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleCountryChange = (country: {cca2: any; callingCode: any}) => {
    if (country.callingCode[0]) {
      setCountryCodeNumber(`+${country.callingCode[0]}`);
    } else {
      setCountryCodeNumber('');
    }
    setCountryCode(country.cca2);
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ime: user?.ime || '',
      prezime: user?.prezime || '',
      email: user?.email || '',
      telefon: user?.telefon || '',
    },
  });
  const onSubmit = async (data: FormData) => {
    if (user) {
      OneSignal.User.removeSms(`${user.pozivni_broj}${user.telefon}`);
    }
    const userObject = {
      ime: data.ime,
      prezime: data.prezime,
      telefon: data.telefon,
      pozivni_broj: countryCodeNumber,
      country_code: countryCode,
    };
    try {
      setIsLoading(true);
      const body = {
        id: user?.id,
        user: userObject,
        // token: token,
      };
      const response = await updateUser(body as RecaptchaUserBody);
      if (response?.data?.code === 200) {
        OneSignal.User.addSms(`${countryCodeNumber}${data.telefon}`);
        updateUserBasicInfo(response?.data?.data);
        Toast.show({
          type: 'success',
          text1: 'User updated successful!',
        });
      } else {
        Toast.show({
          type: 'error',
          text1:
            'Something went wrong! Check your WIFI connection and try again.',
        });
      }
      onClose();
      setIsLoading(false);
      // verifyCaptcha(
      //   async (token: string) => {
      //
      //   },
      //   (error: any) => {
      //     console.error('Recaptcha verification failed:', error);
      //     Alert.alert('Verification Failed', 'Please try again.');
      //   },
      // );
    } catch (e) {
      console.log('ERROR', e);
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={Platform.OS === 'ios'}
      extraScrollHeight={moderateScale(-150, 0.2)}
      keyboardShouldPersistTaps="handled"
      style={[
        styles.container,
        {
          backgroundColor: activeColors.backgroundColor,
        },
      ]}>
      <Controller
        control={control}
        name="ime"
        render={({field: {onChange, value}}) => (
          <InputGroupForSheet
            label={t('form.name')}
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
        render={({field: {onChange, value}}) => (
          <InputGroupForSheet
            label={t('form.lastname')}
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
        render={({field: {onChange, value}}) => (
          <InputGroupForSheet
            label={t('form.email')}
            value={value}
            onChange={onChange}
            errorMsg={errors.email?.message}
            activeColors={activeColors}
            readOnly={true}
          />
        )}
      />

      <Controller
        control={control}
        name="telefon"
        render={({field: {onChange, value}}) => (
          <PhoneWithCountryCodeGroup
            autoFocus={false}
            label={t('form.phone')}
            activeColors={activeColors}
            errorMsg={errors.telefon?.message}
            setValue={onChange}
            value={value}
            defaultValue={value}
            setFormattedValue={() => {}}
            onChangeCountry={handleCountryChange}
            defaultCode={countryCode}
          />
        )}
      />
      <BottomSheetView style={styles.btnContainer}>
        <SecondaryButtonForSheet
          activeColors={activeColors}
          label={t('general.cancel')}
          onPress={onClose}
          buttonContainerStyle={{
            width: moderateScale(140, 0.2),
            height: moderateScale(50, 0.2),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        <PrimaryButtonForSheet
          isLoading={isLoading}
          activeColors={activeColors}
          outerContainerStyle={{minWidth: moderateScale(140, 0.2)}}
          label={t('general.save')}
          onPress={handleSubmit(onSubmit)}
        />
      </BottomSheetView>
    </KeyboardAwareScrollView>
  );
};
const styles = ScaledSheet.create({
  container: {
    marginTop: '20@ms',
  },
  btnContainer: {
    marginTop: '40@ms0.2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default ProfileSheetContent;
