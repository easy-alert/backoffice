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

export const GuaranteesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.md};
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  scrollbar-width: none;
  scrollbar-color: transparent;
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

export const NoGuaranteesContainer = styled.div`
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
