import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const Header = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: space-between;
  margin-bottom: 12px;
  @media (max-width: 900px) {
    align-items: flex-start;
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
  width: 100%;
  > h2 {
    margin-right: ${theme.size.sm};
  }

  @media (max-width: 900px) {
    width: 100%;
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

export const CreateMaintenancesContainer = styled.div<{
  createMaintenancesIsOpen: boolean;
}>`
  overflow: hidden;
  position: absolute;
  transition: 0.25s;

  transform: scaleY(0);
  transform-origin: top;

  height: fit-content;

  top: ${theme.size.lg};
  background-color: ${theme.color.white};
  border-radius: ${theme.size.xxsm};
  padding: ${theme.size.xsm} ${theme.size.sm};
  width: 50%;

  ${({ createMaintenancesIsOpen }) =>
    createMaintenancesIsOpen && `transform: scaleY(1);`}

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const CreateMaintenancesContainerContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.xsm};
`;

export const PaginationFooter = styled.footer`
  margin-top: 10px;
  padding-right: 16px;
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: flex-end;
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
