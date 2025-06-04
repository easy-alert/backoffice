import styled from 'styled-components';

export const Container = styled.div`
  padding-top: ${({ theme }) => theme.size.sm};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size.md};

  .spacing-select {
    margin-top: 16px;
  }
`;

export const HeaderTitle = styled.h2`
  margin-right: ${({ theme }) => theme.size.sm};
`;

export const Wrappers = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size.sm};
`;

export const QuantitiesCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.size.sm};

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const QuantityCard = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  padding: ${({ theme }) => theme.size.sm};
  border-radius: ${({ theme }) => theme.size.xxsm};

  width: 100%;

  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size.xsm};
`;

export const QuantityCardContent = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.size.xsm};

  > h2 {
    font-size: 32px;
    line-height: 36px;
  }

  > p.p4 {
    opacity: 0.7;
    text-align: center;
  }

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

export const StyledTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: ${({ theme }) => theme.size.sm};
`;

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.size.sm};

  > input {
    width: 100px;
    margin-left: ${({ theme }) => theme.size.sm};
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.color.white};
  border-radius: ${({ theme }) => theme.size.xsm};
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
`;

export const StyledThead = styled.thead`
  background: ${({ theme }) => theme.color.gray2};
`;

export const StyledTh = styled.th`
  padding: ${({ theme }) => theme.size.xsm};
  text-align: left;
  font-weight: bold;
  font-size: 16px;
  color: ${({ theme }) => theme.color.black};
  border-bottom: 2px solid ${({ theme }) => theme.color.gray2};
`;

export const StyledTr = styled.tr`
  &:nth-child(even) {
    background: ${({ theme }) => theme.color.gray1};
  }
`;

export const StyledTd = styled.td`
  padding: ${({ theme }) => theme.size.xsm};
  font-size: 16px;
  color: ${({ theme }) => theme.color.black};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray2};
`;
