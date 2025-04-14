import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size.sm};
  padding: ${({ theme }) => theme.size.md};
  max-width: 1200px;
  margin: 0 auto;

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
  grid-template-columns: repeat(3, 1fr);
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
  width: 150px;
  height: 150px;
  border-radius: 50%;
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

export const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.color.white};
  padding: ${({ theme }) => theme.size.lg};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: ${({ theme }) => theme.size.xlg};
    font-weight: 600;
    color: ${({ theme }) => theme.color.gray5};
    margin: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.size.sm};
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.size.md};

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const CompanyCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.gray2};
  border-radius: 8px;
  padding: ${({ theme }) => theme.size.md};
  transition: all 0.2s;
  cursor: pointer;
  background: ${({ theme }) => theme.color.white};

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const CompanyLogo = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background: ${({ theme }) => theme.color.gray1};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 500px) {
    margin-bottom: ${({ theme }) => theme.size.sm};
  }
`;

export const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size.xsm};
  padding-left: ${({ theme }) => theme.size.md};
  flex: 1;

  @media (max-width: 500px) {
    padding-left: 0;
    align-items: center;
    text-align: center;
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
`;
