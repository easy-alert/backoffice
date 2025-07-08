import styled from 'styled-components';

export const PasswordDiv = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;

  button {
    position: absolute;
    right: 12px;
    bottom: 12px;
    z-index: 2;
    background: transparent;
    border: none;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

export const StatusContainer = styled.div`
  margin: 16px 0;
`;

export const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;
