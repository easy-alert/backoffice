import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};
  padding: ${theme.size.md};
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: ${theme.size.sm};
    gap: ${theme.size.md};
  }
`;

export const CardSection = styled.section`
  background: ${theme.color.white};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: ${theme.size.sm} ${theme.size.xlg};
  width: 100%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: ${theme.size.lg};
  }

  @media (max-width: 768px) {
    padding: ${theme.size.md};
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: ${theme.size.sm};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }
`;

export const Image = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: ${theme.color.gray1};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

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

export const Details = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${theme.size.md};
  margin-top: ${theme.size.xxlg};

  @media (max-width: 768px) {
    justify-items: center;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};

  h6 {
    font-size: 0.875rem;
    color: ${theme.color.gray4};
    gap: ${theme.size.xxlg};
  }

  p {
    font-size: 1rem;
    margin: 0;
    padding: ${theme.size.xsm} 0;
    border-bottom: 1px solid ${theme.color.gray2};
  }

  @media (max-width: 768px) {
    align-items: center;
    font-size: 1rem;
    p {
      font-size: 14px;
    }
  }
`;

export const Footer = styled.footer<{ disabled: boolean }>`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.size.md};
  ${({ disabled }) => disabled && 'opacity: 0.5;'}
`;

export const CompanyLogo = styled.div`
  width: 80px;
  height: 80px;
  background: ${theme.color.gray1};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.size.sm};
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  @media (max-width: 500px) {
    width: 120px;
    height: 120px;
    margin-right: 0;
    margin-bottom: ${theme.size.sm};
  }
`;

export const CompanyCard = styled.div`
  border: 1px solid ${theme.color.gray2};
  border-radius: 8px;
  padding: ${theme.size.sm};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;

    h2 {
      padding-top: ${theme.size.sm};
    }
  }
`;

export const CompanyInfo = styled.div`
  flex: 1;
  min-width: 0;
  padding-left: ${theme.size.sm};
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 0.875rem;
    color: ${theme.color.gray4};
    padding-top: ${theme.size.xsm};
  }

  p {
    font-size: 1rem;

    padding: ${theme.size.xsm} 0;
    border-bottom: 1px solid ${theme.color.gray2};
  }
`;

export const CompaniesSection = styled.section`
  background: ${theme.color.white};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: ${theme.size.xlg};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.size.md};

  @media (max-width: 768px) {
    padding: ${theme.size.md};
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: ${theme.size.sm};
    margin-top: ${theme.size.md};

    table {
      grid-template-columns: 1fr;
    }
  }
`;
