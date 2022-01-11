import styled from 'styled-components';
import Animated from 'react-native-reanimated';
import { View, Text } from 'react-native';

export const Container = styled(Animated.View)`
  flex-direction: row;
  margin-vertical: 16;
  padding-horizontal: 16;
  align-items: center;
`;

export const CasesContainer = styled(View)`
  min-width: 120;
  align-items: flex-end;
`;

export const CasesAmount = styled(Text)`
  font-family: KosugiMaru-Regular;
  font-size: 42;
`;

export const CasesText = styled(Text)`
  font-size: 12;
  font-family: KosugiMaru-Regular;
`;

export const DateText = styled(Text)`
  font-family: KosugiMaru-Regular;
  font-size: 24;
  margin-horizontal: 16;
  text-align: center;
  flex: 1;
`;