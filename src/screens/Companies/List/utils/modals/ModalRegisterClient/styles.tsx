import styled from 'styled-components';
import { theme } from '@styles/theme';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.sm};

  form {
    display: flex;
    flex-direction: column;
    gap: ${theme.size.csm};
  }

  button {
    margin-top: ${theme.size.sm};
  }
`;

export const GeneratedLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${theme.size.sm};
  padding: ${theme.size.md} ${theme.size.sm};

  h4 {
    color: ${theme.color.success};
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

export const LinkBox = styled.input`
  width: 100%;
  max-width: 500px;
  padding: ${theme.size.xsm};
  border: 1px solid ${theme.color.gray2};
  border-radius: 6px;
  background-color: ${theme.color.gray0};
  font-size: 0.9rem;
  text-align: center;
  color: ${theme.color.gray6};
  cursor: pointer;
  transition: border 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.color.primary};
  }
`;
