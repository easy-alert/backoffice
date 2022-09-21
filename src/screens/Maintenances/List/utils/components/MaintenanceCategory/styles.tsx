import styled from 'styled-components';
import { theme } from '../../../../../../styles/theme';

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xxsm};

  @media (max-width: 1100px) {
    min-width: 960px;
  }
`;

export const HeaderCategory = styled.div`
  display: flex;
  margin-bottom: ${theme.size.xsm};
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.xsm};
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: flex-start;

  gap: ${theme.size.xsm};
  width: 100%;
  max-width: 400px;
`;

export const ButtonsHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.size.xsm};
`;

export const MaintenancesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};
`;

export const MaintenancesHeader = styled.div`
  display: flex;
  padding: 0 ${theme.size.sm};
`;

export const MaintenancesGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr;
  align-items: center;
  grid-gap: ${theme.size.sm};
  grid-template-columns: 250px 300px 0.4fr 0.5fr 0.5fr 0.1fr;

  > p {
    cursor: pointer;
    width: fit-content;
  }
`;
