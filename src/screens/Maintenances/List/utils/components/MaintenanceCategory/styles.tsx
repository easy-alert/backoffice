import styled from 'styled-components';
import { theme } from '../../../../../../styles/theme';

export const Background = styled.div``;

export const HeaderCategory = styled.div`
  display: flex;
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
export const EditContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.xsm};
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: flex-start;

  gap: ${theme.size.xsm};
  width: 100%;
  max-width: 500px;
`;

export const ButtonsHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.size.xsm};
`;
