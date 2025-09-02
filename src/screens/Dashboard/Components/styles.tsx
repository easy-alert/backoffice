import { theme } from '@styles/theme';
import styled from 'styled-components';

export const ChartContainer = styled.div`
  background: ${theme.color.white};
  border-radius: ${theme.size.xsm};
  padding: ${theme.size.sm};
  margin-bottom: ${theme.size.md};

  .tooltip-container {
    padding: ${theme.size.xsm};
  }

  .companies-list {
    margin-top: ${theme.size.xxsm};
  }

  .company-item {
    font-size: ${theme.size.csm};
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
`;
