import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Alert,
  ActionSheetIOS,
  Linking,
} from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  PhotoQuality,
} from 'react-native-image-picker';
import {ScaledSheet} from 'react-native-size-matters';
import {COLORS, FONTS, icons} from '../../constants';
import {useTheme} from '../../context/themeContext';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {CachedImage} from '@georstat/react-native-image-cache';
import {useTranslation} from 'react-i18next';

type MultiImagePickerProps = {
  onImagesSelected: (images: string[]) => void;
  errorMsg?: string;
  resetImages?: boolean;
};

const MultiImagePicker = ({
  onImagesSelected,
  errorMsg,
  resetImages,
}: MultiImagePickerProps) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const {t} = useTranslation();
  const {mode} = useTheme();
  let activeColors = COLORS[mode];
  useEffect(() => {
    if (resetImages) {
      setSelectedImages([]);
      onImagesSelected([]);
    }
  }, [resetImages]);
  const checkAndRequestPermission = async (
    permissionType: 'photo' | 'camera',
  ) => {
    let permission;
    let permissionResult;

    if (Platform.OS === 'ios') {
      permission =
        permissionType === 'photo'
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          : PERMISSIONS.IOS.CAMERA;
    } else if (Platform.OS === 'android') {
      if (permissionType === 'photo') {
        if (Platform.Version >= 33) {
          permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
        } else {
          permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
        }
      } else {
        permission = PERMISSIONS.ANDROID.CAMERA;
      }
    } else {
      return false;
    }

    permissionResult = await check(permission);

    if (
      permissionResult === RESULTS.GRANTED ||
      permissionResult === RESULTS.LIMITED
    ) {
      return true;
    }

    const permissionRequest = await request(permission);

    const grantedOrLimited =
      permissionRequest === RESULTS.GRANTED ||
      permissionRequest === RESULTS.LIMITED;

    if (permissionResult === RESULTS.BLOCKED) {
      console.log("permissionResult === RESULTS.BLOCKED");
      Alert.alert(
        t('form.permission_required'),
        t('form.permission_blocked_message'),
        [
          {text: t('form.cancel'), style: 'cancel'},
          {
            text: t('form.open_settings'),
            onPress: () => Linking.openSettings(),
          },
        ],
      );
      return false;
    }else if(!grantedOrLimited) {
      console.log("!grantedOrLimited");
      Alert.alert(
        t('form.permission_required'),
        t('form.permission_denied_message'),
      );
    }

    return grantedOrLimited;
  };

  const selectImages = async () => {
    const hasPermission = await checkAndRequestPermission('photo');
    if (!hasPermission) {
      return;
    }

    const options = {
      mediaType: 'photo' as const,
      selectionLimit: 0,
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 0.5 as PhotoQuality,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const newImages = response.assets?.map(asset => asset.uri || '') || [];
        const totalImages = [...selectedImages, ...newImages];
        if (totalImages.length > 4) {
          Alert.alert(t('form.max_images_alert', {max: 4}));
          return;
        }

        setSelectedImages(totalImages);
        onImagesSelected(totalImages);
      }
    });
  };

  const takePicture = async () => {
    const hasPermission = await checkAndRequestPermission('camera');
    if (!hasPermission) {
      Alert.alert(
        t('form.permission_required'),
        t('form.camera_permission_message'),
        [
          {text: t('form.cancel'), style: 'cancel'},
          {
            text: t('form.open_permission_prompt'),
            onPress: () => checkAndRequestPermission('camera'),
          },
        ],
      );
      return;
    }

    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 0.5 as PhotoQuality,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        const newImage = response.assets?.[0]?.uri;
        if (newImage) {
          const updatedImages = [...selectedImages, newImage];
          setSelectedImages(updatedImages);
          onImagesSelected(updatedImages);
        }
      }
    });
  };

  const removeImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    onImagesSelected(updatedImages);
  };

  const showImageOptionsSheet = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            t('form.cancel'),
            t('form.take_picture'),
            t('form.choose_from_library'),
          ],
          cancelButtonIndex: 0,
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            takePicture();
          } else if (buttonIndex === 2) {
            selectImages();
          }
        },
      );
    } else {
      Alert.alert(t('form.add_image'), t('form.choose_option'), [
        {text: t('form.cancel'), style: 'cancel'},
        {text: t('form.take_picture'), onPress: takePicture},
        {text: t('form.choose_from_library'), onPress: selectImages},
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color: activeColors.text}]}>
        {t('form.add_images')}
      </Text>
      <TouchableOpacity
        onPress={showImageOptionsSheet}
        style={[
          styles.imageContainer,
          {borderColor: activeColors.lighterGray},
        ]}>
        <CachedImage
          source={icons.upload_image}
          style={styles.uploadImage}
          imageStyle={styles.uploadImage}
        />
      </TouchableOpacity>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        {selectedImages.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{uri}} style={styles.image} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(index)}>
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginVertical: '15@ms',
    paddingTop: '10@ms',
  },
  label: {
    ...(FONTS.medium5 as object),
    fontSize: '14@ms',
    marginBottom: '5@ms',
  },
  imageContainer: {
    flex: 1,
    height: '123@ms',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: '5@ms',
    padding: '10@ms',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadImage: {
    width: '36@ms0.2',
    height: '36@ms0.2',
  },
  imageWrapper: {
    marginRight: '10@ms',
    position: 'relative',
  },
  image: {
    width: '80@ms',
    height: '80@ms',
    borderRadius: '5@ms',
  },
  scrollView: {
    marginTop: '10@ms',
    zIndex: 21,
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: '5@ms',
    right: '5@ms',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10@ms',
    width: '20@ms',
    height: '20@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'red',
    fontSize: '12@ms',
  },
  errorText: {
    color: 'red',
    fontSize: '12@ms',
    marginTop: '5@ms',
  },
});

export default MultiImagePicker;
