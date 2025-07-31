import styled from 'styled-components';
import { theme } from '@styles/theme';

export const Card = styled.div`
  background: ${theme.color.white};
  border-radius: ${theme.size.xsm};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
  overflow: hidden;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }
`;

export const CardContent = styled.div`
  padding: ${theme.size.sm};
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: ${theme.size.xsm};
`;

export const CardTitle = styled.h4`
  margin: 0;
  font-size: ${theme.size.sm};
  font-weight: 500;
  color: ${theme.color.black};
`;

export const CardActions = styled.div`
  display: flex;
  gap: ${theme.size.xsm};
`;

export const CardDetails = styled.div`
  display: grid;
  gap: ${theme.size.xsm};
  font-size: ${theme.size.csm2};
  color: ${theme.color.black};
`;

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  gap: ${theme.size.xsm};

  & > span:first-child {
    font-weight: 500;
    color: ${theme.color.black};
    min-width: fit-content;
  }
`;

export const FailureTypeTagsContainer = styled.div`
  display: flex;
  gap: ${theme.size.xsm};
  flex-wrap: wrap;
`;

export const FailureTypeTag = styled.div`
  background: ${theme.color.primary};
  color: ${theme.color.white};
  border-radius: ${theme.size.xsm};
  padding: ${theme.size.xxsm} ${theme.size.sm};
`;
