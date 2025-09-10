import { theme } from '@styles/theme';
import styled from 'styled-components';

export const ChartContainer = styled.div`
  background: ${theme.color.white};
  border-radius: ${theme.size.xsm};
  padding: ${theme.size.sm};
  margin-bottom: ${theme.size.md};
  flex: 1 1 33.33%;
  min-width: 0;
  max-width: 33.33%;

  h3 {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 8px;
  }

  .tooltip-container {
    padding: ${theme.size.xsm};
  }

  .companies-list {
    margin-top: ${theme.size.xxsm};
  }

  .company-item {
    font-size: ${theme.size.csm};
  }

  @media (max-width: 900px) {
    flex: 1 1 100%;
    max-width: 100%;
  }
`;

export const YearSelectWrapper = styled.div`
  margin-bottom: ${theme.size.csm};
`;

export const YearLabel = styled.label`
  font-weight: 500;
`;

export const YearSelect = styled.select`
  padding: ${theme.size.xxsm};
  border-radius: ${theme.size.xxsm};

  @media (max-width: 500px) {
    width: 100%;
    min-width: 0;
  }
`;
