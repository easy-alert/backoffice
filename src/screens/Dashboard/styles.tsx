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

export const CompletedMaintenancesContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.size.sm};
`;

export const CompletedMaintenancesHeader = styled.div`
  display: flex;
  align-items: center;

  gap: ${({ theme }) => theme.size.sm};

  > div {
    width: 100%;
    max-width: 80px;

    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size.xsm};
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    color: ${({ theme }) => theme.color.gray4};
  }
`;
