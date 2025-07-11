import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px 16px 8px 8px;
  border-radius: 12px;
  @media (max-width: 600px) {
    padding: 16px 2vw;
    max-height: 90vh;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  padding-top: 20px;
  background: inherit;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    padding-top: 12px;
  }
`;
