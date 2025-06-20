import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.size.sm};
  padding-top: ${theme.size.sm};

  @media (max-width: 900px) {
    align-items: flex-start;
    flex-direction: column;
    gap: ${theme.size.sm};
  }

  @media (max-width: 600px) {
    padding-top: ${theme.size.xxsm};
    margin-bottom: ${theme.size.xxsm};
    gap: ${theme.size.xxsm};
  }
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  > h2 {
    margin-right: ${theme.size.sm};
    font-size: 1.5rem;
  }

  @media (max-width: 900px) {
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: ${theme.size.sm};
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    > h2 {
      margin-right: 0;
      margin-bottom: ${theme.size.xxsm};
      font-size: 1.2rem;
    }
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

  @media (max-width: 900px) {
    width: 100%;
    > input {
      width: 100%;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 4px;
    > input {
      font-size: 0.95rem;
      height: 28px;
    }
  }
`;

export const PaginationFooter = styled.footer`
  margin-top: 8px;
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 600px) {
    justify-content: center;
    margin-top: 4px;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80%;
  gap: ${theme.size.xxsm};
  padding: 0 8px;

  > h3 {
    color: ${theme.color.gray4};
    text-align: center;
    font-size: 1.1rem;
  }

  @media (max-width: 600px) {
    height: auto;
    gap: 4px;
    padding: 0 2px;
    > h3 {
      font-size: 1rem;
    }
  }
`;

export const Content = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 900px) {
    height: auto;
    min-height: calc(100vh - 184px);

    table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
      width: 100%;
    }
  }

  @media (max-width: 600px) {
    min-height: unset;
    padding: 0 2px;

    table {
      font-size: 0.95rem;
      display: block;
      overflow-x: auto;
      white-space: nowrap;
      width: 100%;
    }
  }
`;
