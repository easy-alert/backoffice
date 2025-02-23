import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const TagContainer = styled.div<{
  backgroundColor: string;
  color: string;
  fontWeight: number;
  fontSize: string;
  lineHeight: string;
  padding: string;
}>`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: ${({ padding }) => padding};
  width: fit-content;
  height: fit-content;
  border-radius: ${theme.size.xxsm};

  > button {
    all: unset;
    cursor: pointer;
    padding: 0;
    background-color: unset;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
      opacity: 0.7;
    }
  }

  > p {
    color: ${({ color }) => color};
    font-weight: ${({ fontWeight }) => fontWeight};
    font-size: ${({ fontSize }) => fontSize};
    line-height: ${({ lineHeight }) => lineHeight};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 145px;

    text-align: center;
  }
`;
