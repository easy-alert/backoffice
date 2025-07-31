import styled from 'styled-components';
import { theme } from '@styles/theme';

export const CategoryContainer = styled.div`
  background: ${theme.color.white};
  border-radius: ${theme.size.xsm};
  padding: ${theme.size.md};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.size.sm};
  padding-bottom: ${theme.size.xsm};
  border-bottom: 1px solid ${theme.color.primary};
`;

export const CategoryTitle = styled.h3`
  margin: 0;
  font-size: ${theme.size.md};
  color: ${theme.color.primary};
`;

export const CategoryActions = styled.div`
  display: flex;
  gap: ${theme.size.xsm};
`;

export const GuaranteesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.xsm};
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.size.lg} 0;
  color: ${theme.color.black};
  font-style: italic;
`;
