import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Container = styled.section`
  background: ${theme.color.white};
  border-radius: ${theme.size.csm};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: ${theme.size.xlg};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.size.md};

  @media (max-width: 768px) {
    padding: ${theme.size.md};
    border-radius: ${theme.size.xsm};
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  border: 1px solid ${theme.color.gray2};
  border-radius: ${theme.size.xsm};
  padding: ${theme.size.sm};
  transition: box-shadow 0.2s;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: ${theme.color.white};

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const Image = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
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
    object-fit: cover;
    display: block;
  }

  @media (max-width: 500px) {
    width: 120px;
    height: 120px;
    margin-right: 0;
    margin-bottom: ${theme.size.sm};
  }
`;

export const Info = styled.div`
  flex: 1;
  min-width: 0;
  padding-left: ${theme.size.xlg};
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};
  justify-content: center;

  @media (max-width: 768px) {
    padding-left: 0;
    align-items: center;
    text-align: center;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: ${theme.size.csm2};
    color: ${theme.color.gray4};
    margin: 0;
  }

  p {
    font-size: ${theme.size.sm};
    padding: ${theme.size.xsm} 0;
    border-bottom: 1px solid ${theme.color.gray2};
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
    text-align: center;
  }

  @media (max-width: 480px) {
    h2 {
      font-size: ${theme.size.csm};
    }

    p {
      font-size: ${theme.size.csm2};
    }
  }
`;
