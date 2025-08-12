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

export const ProfileSection = styled.section`
  background: ${({ theme }) => theme.color.white};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: ${({ theme }) => theme.size.xlg};
  width: 100%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: ${({ theme }) => theme.size.lg};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.size.md};
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.size.sm};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }
`;

export const ProfileContent = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.size.xlg};
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const Avatar = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.gray1};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  .image-container {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

export const DetailsContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.size.md};

  @media (max-width: 768px) {
    justify-items: center;
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
  }

  @media (max-width: 768px) {
    align-items: center;
    font-size: 1rem;
    p {
      font-size: 14px;
    }
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.size.sm};

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-end;

    button {
      width: 100%;
    }
  }
`;
