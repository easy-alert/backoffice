import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: ${({ theme }) => theme.size.xlg} ${({ theme }) => theme.size.md};
  background-color: ${({ theme }) => theme.color.gray0};
  min-height: 100vh;
  box-sizing: border-box;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 700px;
  background-color: ${({ theme }) => theme.color.white};
  padding: ${({ theme }) => theme.size.lg} ${({ theme }) => theme.size.xlg};
  border-radius: ${({ theme }) => theme.size.xsm};
  box-shadow: 0 ${({ theme }) => theme.size.xxsm} ${({ theme }) => theme.size.csm}
    rgba(0, 0, 0, 0.08);

  h1,
  h3 {
    text-align: center;
    margin-bottom: ${({ theme }) => theme.size.md};
    color: ${({ theme }) => theme.color.gray6};
  }

  h3 {
    text-align: left;
    margin-top: ${({ theme }) => theme.size.lg};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray1};
    padding-bottom: ${({ theme }) => theme.size.xsm};
  }

  form {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size.sm};
  }

  button {
    margin-top: ${({ theme }) => theme.size.md};
  }
`;

export const PlanSummary = styled.section`
  background-color: ${({ theme }) => theme.color.gray0};
  border-left: ${({ theme }) => theme.size.xxsm} solid ${({ theme }) => theme.color.primary};
  padding: ${({ theme }) => theme.size.md};
  margin-bottom: ${({ theme }) => theme.size.lg};
  border-radius: ${({ theme }) => theme.size.xxsm};

  h3 {
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.size.sm};
    border-bottom: none;
  }

  p {
    margin: ${({ theme }) => theme.size.xsm} 0;
    font-size: ${({ theme }) => theme.size.sm};
    color: ${({ theme }) => theme.color.gray5};
  }
`;
