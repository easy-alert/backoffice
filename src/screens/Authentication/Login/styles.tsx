import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import bannerLogin from '../../../assets/images/bannerLogin.jpg';

export const Background = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2e2e2e;

  background-image: url(${bannerLogin});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

export const LeftSide = styled.div`
  flex: 0.6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${theme.size.lg};
  color: ${theme.color.black};

  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;

  > img {
    width: 80%;
    max-width: 300px;
    margin-bottom: ${theme.size.md};
  }

  h2 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: ${theme.size.sm};
  }

  p {
    font-size: 1.1rem;
    text-align: center;
    max-width: 350px;
  }

  @media (max-width: 768px) {
    border-radius: 12px 12px 0 0;
    flex: none;
    width: 100%;
  }
`;

export const RightSide = styled.div`
  flex: 0.4;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${theme.size.md};
  background-color: ${theme.color.primary};
  padding: ${theme.size.xlg} ${theme.size.lg};
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;

  h2 {
    font-size: 18px;
    color: ${theme.color.white};
    text-align: center;
    margin-bottom: ${theme.size.md};
  }

  > img {
    width: 80%;
    max-width: 300px;
    margin-bottom: ${theme.size.md};
  }

  form {
    display: flex;
    flex-direction: column;
    gap: ${theme.size.md};
  }

  button {
    margin-top: ${theme.size.sm};
    background-color: white;
    color: ${theme.color.primary};
  }

  @media (max-width: 768px) {
    border-radius: 0 0 12px 12px;
    flex: none;
    width: 100%;
    height: auto;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};

  > div {
    display: flex;
    flex-direction: column;
    gap: 4px;

    label {
      color: ${theme.color.white};
      font-size: 0.95rem;
      font-weight: 500;
    }

    input {
      padding: 14px 12px;
      border-radius: 8px;
      border: 1px solid transparent;
      background-color: #ffffff10;
      color: ${theme.color.white};
      outline: none;
      transition: all 0.2s ease;

      &::placeholder {
        color: #cccccc;
      }

      &:focus {
        border-color: ${theme.color.white};
        background-color: #ffffff20;
      }
    }

    span {
      font-size: 0.85rem;
    }
  }
`;
