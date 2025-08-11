import styled from 'styled-components';

export const FormContainer = styled.div`
  button {
    margin-top: ${({ theme }) => theme.size.xsm};
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
