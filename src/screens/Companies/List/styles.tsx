import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.size.sm};
  padding-top: ${theme.size.sm};

  @media (max-width: 900px) {
    align-items: flex-start;
  }
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  > h2 {
    margin-right: ${theme.size.sm};
  }

  @media (max-width: 900px) {
    width: 60%;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SearchField = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.xxsm};
  width: 100%;
  > input {
    height: 24px;
    width: 100%;
    padding: 0;
    background-color: transparent;
    border: none !important;
    outline: none;
  }
`;

export const PaginationFooter = styled.footer`
  margin-top: 8px;
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: flex-end;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80%;
  gap: ${theme.size.xxsm};
  > h3 {
    color: ${theme.color.gray4};
    text-align: center;
  }
`;

export const Content = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 900px) {
    height: calc(100vh - 184px);
  }
`;
