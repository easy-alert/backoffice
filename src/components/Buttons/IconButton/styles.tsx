import styled, { css } from 'styled-components';

export const ContainerButton = styled.div<{
  labelPos?: string;
  selected?: boolean;
  opacity?: string;
  gap?: string;
  color?: string;
  hideLabelOnMedia?: boolean;
  fontWeight?: string;
  disable?: boolean;
}>`
  display: flex;
  min-width: fit-content;
  align-items: center;
  cursor: pointer;
  transition: 0.25s cubic-bezier(0.39, 0.575, 0.565, 1);

  > p {
    ${({ color }) => color && `color: ${color};`}
    ${({ fontWeight }) => fontWeight && `font-weight: ${fontWeight};`}


    @media (max-width: 900px) {
      ${({ hideLabelOnMedia }) => hideLabelOnMedia && `display: none;`}
    }
  }

  ${({ gap }) => gap && `gap: ${gap};`}

  ${({ disable }) =>
    disable &&
    css`
      opacity: 0.4 !important;
      :hover {
        opacity: 0.4 !important;
      }
      cursor: not-allowed;
    `}
  ${({ opacity }) =>
    opacity ? `opacity:${opacity}; :hover { opacity: 1; };` : ':hover { opacity: 0.7; };'}
  ${({ selected }) => selected && ' opacity: 1;'}
  ${({ labelPos }) => labelPos === 'top' && 'flex-direction:column-reverse;'}
  ${({ labelPos }) => labelPos === 'right' && 'flex-direction: row;'}
  ${({ labelPos }) => labelPos === 'left' && 'flex-direction: row-reverse;'}
  ${({ labelPos }) => labelPos === 'bottom' && 'flex-direction: column;'}
`;
