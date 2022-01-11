import styled from 'styled-components';
import { View } from 'react-native';
import { Bacterias } from '../../components';

export const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const CenteredBacterias = styled(Bacterias)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`
