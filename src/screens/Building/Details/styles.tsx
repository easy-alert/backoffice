import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size.sm};

  padding-top: ${({ theme }) => theme.size.sm};
  margin-bottom: ${({ theme }) => theme.size.sm};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.size.sm};
    gap: ${({ theme }) => theme.size.md};
  }
`;

export const DetailsBox = styled.div`
  background: ${({ theme }) => theme.color.white};
  border-radius: 12px;
  padding: ${({ theme }) => theme.size.lg};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const DetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  width: 100%;
`;

export const DetailGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const Avatar = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  background: ${({ theme }) => theme.color.gray2};
  flex-shrink: 0;

  .image-container {
    width: 80%;
    height: 80%;

    img {
      width: 80%;
      height: 80%;
      object-fit: cover;
    }
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size.xsm};

  h2 {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color.gray4};
    gap: ${({ theme }) => theme.size.xxlg};
  }

  p {
    font-size: 1rem;
    margin: 0;
    padding: ${({ theme }) => theme.size.xsm} 0;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray2};
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;
