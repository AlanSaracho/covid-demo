import React from 'react';
import { View, ViewStyle } from 'react-native';
import { times } from 'lodash';
import { Bacteria } from './Bacteria';

type BacteriasProps = {
  amount: number;
  style?: ViewStyle;
}

const Bacterias = ({ amount, style } : BacteriasProps) => (
  <View style={[{ flex: 1 }, style ]}>
    {times(amount, () => <Bacteria />)}
  </View>
);

export { Bacterias };
