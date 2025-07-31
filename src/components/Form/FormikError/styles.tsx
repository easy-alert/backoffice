import styled from 'styled-components';
import { theme } from '../../../styles/theme';

interface IFormikErrorContainer {
  marginTop?: string | number;
  marginBottom?: string | number;
}

interface IFormikErrorText {
  fontSize?: string | number;
  color?: string;
}

export const FormikErrorContainer = styled.div<IFormikErrorContainer>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-top: ${(props) => props.marginTop || '0px'};
  margin-bottom: ${(props) => props.marginBottom || '0px'};
`;

export const FormikErrorText = styled.p<IFormikErrorText>`
  color: ${(props) => props.color || theme.color.danger};
  font-size: ${(props) => props.fontSize || theme.size.csm};

  animation: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s 1 normal both running scale-in-left;
`;
