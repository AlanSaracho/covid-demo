import styled from 'styled-components';
import { ScalePressable } from "../ScalePressable";

const size = 48;

export const Container = styled(ScalePressable)`
  backgroundColor: white;
  borderRadius: ${size / 2};
  width: ${size};
  height: ${size};
  alignItems: center;
  justifyContent: center;
  borderWidth: 2;
  borderColor: black;
`