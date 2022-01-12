import React, { useCallback, useEffect, useMemo } from 'react';
import Animated, { useValue } from 'react-native-reanimated';
import { Text } from 'react-native';
import { api, useAxios} from '../../api';
import { Container } from './Home.styled';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProps } from '..';
import { orderBy, size } from 'lodash';
import { AnimatedFlatList, getWaveTranslation, Loading } from '../../components';
import { useDelayedLoading } from '../../utils';
import { onScrollEvent } from 'react-native-redash/src/v1';
import { Country } from '../../types';
import { useSession } from 'store/session';
import { Ionicons } from '@expo/vector-icons';

const itemHeight = 64;

const Home = ({ navigation }) => {
  // const navigation = useNavigation<StackNavigationProps>();
  const { signOut } = useSession();

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: (
  //       <Ionicons
  //         size={24}
  //         name="arrow-up"
  //         onPress={signOut}
  //       />
  //     )
  //   })
  // }, []);


  const [{ data, loading, error }, refetch] = useAxios<Country[]>(api.getCountries);
  const countries = useMemo(() => orderBy(data, 'Country'), [data]);
  const fakeLoading = useDelayedLoading(loading);

  const translationY = useValue(0);
  const onScroll = onScrollEvent({ y: translationY })

  const goToCountry = useCallback((country: Country) => {
    navigation.navigate("Country", { country });
  }, []);

  return (
    <Container>
      {size(countries) > 0 && !fakeLoading && (
        <AnimatedFlatList
          data={countries}
          onScroll={onScroll}
          scrollEventThrottle={16}
          refreshing={false}
          onRefresh={refetch}
          keyExtractor={(item) => (item as Country).Slug}
          renderItem={({ item, index }) => (
            <Animated.View
              style={getWaveTranslation(translationY, index, itemHeight)}
            >
              <Text
                onPress={() => goToCountry(item as Country)}
                numberOfLines={1}
                style={{ fontSize: 28, fontFamily: 'KosugiMaru-Regular' }}
              >
                {(item as Country).Country}
              </Text>
            </Animated.View>
          )}
        />
      )}
      {fakeLoading && <Loading />}
      {error && <Text onPress={() => refetch()}>Ups...</Text>}
    </Container>
  );
}

export default Home;

