import styled from 'styled-components';
import { theme } from '../../../../../../styles/theme';

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 400px;
  > h3 {
    color: ${theme.color.gray4};
    text-align: center;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};

  > :last-child {
    margin-top: ${theme.size.xsm};
  }
`;

export const TotalAccessContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const THead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${`${theme.color.white}`};
  width: 100%;

  @media (max-width: 900px) {
    top: -24px;
  }
`;

export const TBody = styled.tbody`
  tr:nth-child(odd) {
    background-color: ${`${theme.color.primaryL}66`};

    > td:first-child {
      border-top-left-radius: ${theme.size.xxsm};
      border-bottom-left-radius: ${theme.size.xxsm};
    }

    > td:last-child {
      border-top-right-radius: ${theme.size.xxsm};
      border-bottom-right-radius: ${theme.size.xxsm};
    }

    > td:nth-child(1) {
      width: 70%;
    }
  }

  > tr:last-child {
    > td {
      font-weight: bold;
    }
  }
`;

export const Tr = styled.tr``;

export const Th = styled.th`
  padding: ${theme.size.xsm};
  font-weight: bold;
`;

export const Td = styled.td`
  padding: ${theme.size.xsm};
`;
