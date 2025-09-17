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
    margin-bottom: ${theme.size.md};
  }

  .apexcharts-legend {
    margin-top: ${theme.size.sm};
  }

  @media (max-width: 900px) {
    flex: 1 1 100%;
    max-width: 100%;
  }
`;
