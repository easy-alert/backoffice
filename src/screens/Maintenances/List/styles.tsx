import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.size.md};
  @media (max-width: 900px) {
    height: fit-content;
    flex-direction: column;
  }
`;

export const HeaderTitle = styled.div`
  display: flex;
  width: 100%;
  gap: ${theme.size.sm};

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 0;
  }
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  width: 50%;

  > h2 {
    margin-right: ${theme.size.sm};
  }

  @media (max-width: 900px) {
    width: 100%;
    align-items: flex-start;
  }
`;

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${theme.size.xsm};
  width: 50%;
  @media (max-width: 900px) {
    flex-direction: row-reverse;
    width: 100%;
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

export const CreateMaintenancesContainer = styled.div`
  width: 100%;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const CreateMaintenancesContainerContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.size.xsm};
`;

export const NoMaintenancesContainer = styled.div`
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

export const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.md};
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: ${theme.size.sm};
`;
