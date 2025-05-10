import React, {FC, useMemo} from 'react';
import {View, Image, Text} from 'react-native';
import countryData from '../../../../assets/data/countries.json';
import {ScaledSheet} from 'react-native-size-matters';

interface CountryData {
  flag: string;
  currency: string[];
  callingCode: string[];
  region: string;
  subregion: string;
  name: Record<string, string>;
}

interface CountryDataMap {
  [key: string]: CountryData;
}

interface CountryFlagProps {
  countryCode: string;
}

const CountryFlag: FC<CountryFlagProps> = React.memo(({countryCode}) => {
  const memoizedCountryData: CountryDataMap = useMemo(
    () => countryData as CountryDataMap,
    [],
  );

  const flagImage = memoizedCountryData[countryCode]?.flag;
  return (
    <View style={styles.container}>
      {flagImage ? (
        <Image source={{uri: flagImage}} style={styles.image} />
      ) : (
        <Text>No flag available</Text>
      )}
    </View>
  );
});

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-12@ms0.2',
  },
  image: {
    width: '25@ms0.2',
    height: '25@ms0.2',
    borderRadius: '12.5@ms0.2',
  },
});

export default CountryFlag;
