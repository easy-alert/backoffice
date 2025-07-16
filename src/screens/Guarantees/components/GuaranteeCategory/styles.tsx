import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export const Background = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 20px;

  > :last-child {
    padding-right: 4px;
  }
`;

export const ContainerIcon = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.xsm};
`;

export const GuaranteesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};
`;

export const GuaranteeCard = styled.div<{ cardIsOpen?: boolean }>`
  background: #fff;
  border-radius: ${({ cardIsOpen }) => (cardIsOpen ? '12px 12px 0 0' : '12px')};
  box-shadow: 0 1px 4px rgba(16, 24, 40, 0.03);
  padding: 1.2rem 1.5rem;
  display: grid;
  width: 100%;
  grid-template-rows: 1fr;
  align-items: center;
  grid-gap: ${theme.size.sm};
  grid-template-columns: 1.5fr 2fr 1fr 1fr 40px;
  cursor: pointer;
`;

export const GuaranteesGrid = styled.div`
  color: ${theme.color.gray4};
  display: grid;
  width: 100%;
  grid-template-rows: 1fr;
  align-items: center;
  grid-gap: ${theme.size.sm};
  grid-template-columns: 1.5fr 2fr 1fr 1fr 40px;
  padding-top: ${theme.size.sm};
  font-weight: 500;
  background: transparent;
`;

export const GuaranteesHeader = styled.div`
  display: flex;
  padding: 0 ${theme.size.sm};
  margin-bottom: 8px;
`;

export const FlexHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const SortHeader = styled.div<{ highlighted?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: ${({ highlighted }) => (highlighted ? theme.color.black : theme.color.gray4)};
  font-weight: ${({ highlighted }) => (highlighted ? 600 : 500)};
  user-select: none;
`;

export const ExpandedContent = styled.div`
  border-top: 1px solid #e4e4e7;
  padding: 16px 24px 16px 24px;
  background: #fff;
  display: flex;
  align-items: center;
  gap: 32px;
  font-size: 15px;
  flex-wrap: wrap;
  border-radius: 0 0 12px 12px;
`;
export const EditButton = styled.button`
  background: #b42318;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 24px;
  font-weight: 600;
  cursor: pointer;
  margin-left: auto;
`;

export const Arrow = styled.div<{ cardIsOpen?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s;
  ${({ cardIsOpen }) => cardIsOpen && 'transform: rotate(-180deg);'}
`;

export const FormContainer = styled.div`
  padding: 24px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 24px;

  form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: ${theme.size.xsm};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.size.sm};
`;
