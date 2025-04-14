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
  padding: ${theme.size.xsm} ${theme.size.xlg};
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
