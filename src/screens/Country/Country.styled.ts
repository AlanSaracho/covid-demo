import styled from 'styled-components';
import { View } from 'react-native';
import { Fab } from '../../components/Fab';

export const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;


export const OrderFab = styled(Fab)`
  position: absolute;
  bottom: 16;
  right: 16;
`;

export const OrderFieldFab = styled(Fab)`
  position: absolute;
  bottom: ${16 + 8 + 48};
  right: 16;
`;