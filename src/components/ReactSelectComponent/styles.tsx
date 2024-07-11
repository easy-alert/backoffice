import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const ReactSelectDiv = styled.div<{ selectPlaceholderValue: any }>`
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  font-style: normal;

  .css-w9q2zk-Input2 {
    height: 32px;
    max-height: 32px;
    padding: 0;
    margin: 0;
  }

  > h6 {
    margin-bottom: 3px;
  }

  .css-4tefbm-control {
    ${({ selectPlaceholderValue }) =>
      selectPlaceholderValue === 'Selecione' || !selectPlaceholderValue
        ? `
        border-color: ${theme.color.gray3};
        color: #757575
      `
        : `
          border-color: ${theme.color.gray4};
      `}
  }
`;
