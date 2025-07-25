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

export const ItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  column-gap: ${({ theme }) => theme.size.xsm};
  row-gap: ${({ theme }) => theme.size.sm};

  margin-top: ${({ theme }) => theme.size.xsm};
`;

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.xsm};

  background-color: ${({ theme }) => theme.color.gray1};
  border-radius: ${({ theme }) => theme.size.xsm};

  padding-left: ${({ theme }) => theme.size.xsm};
  padding-right: ${({ theme }) => theme.size.xsm};

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Item = styled.div`
  font-size: ${({ theme }) => theme.size.sm};
`;
