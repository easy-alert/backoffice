import styled from 'styled-components';
import { theme } from '../../../../../../styles/theme';

export const Background = styled.div``;

export const HeaderCategory = styled.div`
  display: flex;
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.xsm};
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: flex-start;

  gap: ${theme.size.xsm};
  width: 50%;
`;

export const ButtonsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.xsm};
`;
