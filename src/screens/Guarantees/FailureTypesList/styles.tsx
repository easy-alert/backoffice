import styled from 'styled-components';

export const Container = styled.div`
  padding-top: ${({ theme }) => theme.size.sm};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size.sm};
  height: 100%;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.size.sm};
`;

export const ModalFormContainer = styled.div`
  button {
    margin-top: ${({ theme }) => theme.size.xsm};
  }
`;

export const TableButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.size.sm};
`;

export const EmptyContainer = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    color: ${({ theme }) => theme.color.gray4};
  }
`;
