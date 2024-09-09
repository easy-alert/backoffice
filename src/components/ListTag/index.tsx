import { IListTag } from './types';
import * as Style from './styles';
import { icon } from '../../assets/icons';
import { theme } from '../../styles/theme';
import { Image } from '../Image';

export const ListTag = ({
  label,
  onClick,
  disabled,
  backgroundColor = theme.color.primaryL,
  color = theme.color.gray5,
  fontWeight = 400,
  fontSize = '12px',
  padding = '6px',
  lineHeight = '14px',
}: IListTag) => (
  <Style.TagContainer
    backgroundColor={backgroundColor}
    color={color}
    fontWeight={fontWeight}
    fontSize={fontSize}
    padding={padding}
    lineHeight={lineHeight}
  >
    <p className="p4" title={label}>
      {label}
    </p>
    {onClick && (
      <button onClick={onClick} disabled={disabled} type="button">
        <Image img={icon.xBlack} size="16px" />
      </button>
    )}
  </Style.TagContainer>
);
