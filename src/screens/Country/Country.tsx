import React, { useCallback, useMemo, useState } from 'react';
import { Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/core';
import Animated, { concat } from 'react-native-reanimated';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { onScrollEvent, useTimingTransition, useValue } from 'react-native-redash/src/v1';
import { orderBy, size } from 'lodash';

import { api, useAxios } from '../../api';
import { useDelayedLoading } from '../../utils';
import { AnimatedFlatList, getWaveTranslation, Loading } from '../../components';
import { Container, OrderFab, OrderFieldFab } from './Country.styled';
import { CountryCaseItem } from './CountryCaseItem';
import { CountryCase } from '../../types';
import { AppParams } from 'screens';

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);
type Order = 'asc' | 'desc';

const itemHeight = 60;
const iconDirectionDegrees = {
  'asc': 0,
  'desc': 180,
};

const Country = () => {
  const { params } = useRoute<RouteProp<AppParams, 'Country'>>();
  const { country } = params;

  const [{ data, loading, error }, refetch] = useAxios<CountryCase[]>(api.getCountryCases({ slug: country.Slug }));
  const fakeLoading = useDelayedLoading(loading);
  const [order, setOrder] = useState<Order>('asc');
  const [orderField, setOrderField] = useState<'Date' | 'Cases'>('Date');

  const deg = iconDirectionDegrees[order];
  const timingDeg = useTimingTransition(deg);
  const rotateZ = concat(timingDeg, 'deg');

  const changeOrderField = useCallback(() => setOrderField(orderField === 'Cases' ? 'Date' : 'Cases'), [orderField, setOrderField]); 
  const changeOrder = useCallback(() => setOrder(order === 'asc' ? 'desc' : 'asc'), [setOrder, order]);
  
  const translationY = useValue(0);
  const onScroll = onScrollEvent({ y: translationY })

  const countries = useMemo(
    () => orderBy(data, orderField, order),
    [orderField, order, size(data)]
  );

  return (
    <Container>
      {!fakeLoading && size(countries) > 0 &&
        <>
          <AnimatedFlatList
            onScroll={onScroll}
            style={{ flex: 1, alignSelf: 'stretch' }}
            data={countries}
            refreshing={false}
            onRefresh={refetch}
            keyExtractor={item => (item as CountryCase).Date + (item as CountryCase).Cases}
            renderItem={({ item, index }) => (
              <CountryCaseItem
                style={getWaveTranslation(translationY, index, itemHeight)}
                {...(item as CountryCase)}
              />
            )}
          />
          <OrderFieldFab
            onPress={changeOrderField}
          >
            <MaterialCommunityIcons
              size={48 / 3}
              name={orderField === 'Cases' ? 'virus-outline' : 'calendar-outline'}
            />
          </OrderFieldFab>

          <OrderFab onPress={changeOrder}>
            <AnimatedIonicons
              size={48 / 3}
              style={{ transform: [{ rotateZ }] }}
              name="arrow-up"
            />
          </OrderFab>
        </>
      }
      {fakeLoading && <Loading />}
      {!fakeLoading && (
        <>
          {error && <Text onPress={() => refetch()}>Ups...</Text>}
          {!error && size(countries) === 0 && <Text onPress={() => refetch()}>No reported cases</Text>}
        </>
      )}
    </Container>
  );
}

export default Country;
