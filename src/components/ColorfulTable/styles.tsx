import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

export const TableBackground = styled.div`
  overflow: auto;
  width: 100%;
`;

export const TableContainer = styled.table`
  width: 100%;
  border-spacing: 0;
`;

export const TableHead = styled.thead``;

export const TableBody = styled.tbody``;

export const TableRowHead = styled.tr<{ bgColor?: string }>``;

export const TableRow = styled.tr<{ $bgColor?: string }>`
  ${({ $bgColor }) =>
    $bgColor &&
    css`
      background-color: ${$bgColor};
    `};

  > td {
    border-top: 1px solid ${theme.color.gray2};

    &:first-child {
      border-left: 1px solid ${theme.color.gray2};
    }

    &:last-child {
      border-right: 1px solid ${theme.color.gray2};
    }
  }

  &:last-child td {
    border-bottom: 1px solid ${theme.color.gray2};

    &:first-child {
      border-bottom-left-radius: ${theme.size.xxsm};
    }

    &:last-child {
      border-bottom-right-radius: ${theme.size.xxsm};
    }
  }
`;

export const TableColHeader = styled.th<{ $cssProps: any; $cssOnMedia: any }>`
  color: ${theme.color.gray5};
  text-align: start;

  &:first-child {
    border-top-left-radius: ${theme.size.xxsm};
    border-left: 1px solid ${theme.color.gray2};
  }

  background-color: #fafafa;
  padding: ${theme.size.xsm} ${theme.size.sm};
  border-top: 1px solid ${theme.color.gray2};

  &:last-child {
    border-top-right-radius: ${theme.size.xxsm};
    border-right: 1px solid ${theme.color.gray2};
  }

  ${({ $cssProps }) => $cssProps}

  @media (max-width: 900px) {
    ${({ $cssOnMedia }) => $cssOnMedia}
  }
`;

export const TableColBody = styled.td<{
  $cssProps: any;
  $cssOnMedia: any;
}>`
  height: ${theme.size.xxlg};
  text-align: start;
  height: 32px;
  width: fit-content;

  padding: ${theme.size.xsm} ${theme.size.sm};

  ${({ $cssProps }) => $cssProps}

  @media (max-width: 900px) {
    ${({ $cssOnMedia }) => $cssOnMedia}
  }
`;
