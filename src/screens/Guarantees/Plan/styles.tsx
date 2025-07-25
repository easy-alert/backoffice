import { theme } from '@styles/theme';
import styled from 'styled-components';

export const Header = styled.header`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  padding: ${theme.size.sm} 0;
  background-color: ${theme.color.gray1};
  z-index: 1;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 900px) {
    height: fit-content;
    align-items: flex-start;
  }
`;

export const Title = styled.div`
  display: flex;
  width: 100%;
  gap: ${theme.size.sm};

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 0;
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

export const SystemsCategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${theme.size.md};
  overflow-x: auto;
  overflow-y: hidden;

  scrollbar-width: none;
  scrollbar-color: transparent;

  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;
