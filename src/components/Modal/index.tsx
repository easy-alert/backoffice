// LIBS
import { useEffect, useState } from 'react';

// COMPONENTS
import * as Style from './styles';
import { theme } from '../../styles/theme';
import { IconButton } from '../Buttons/IconButton';

// ICONS
import { icon } from '../../assets/icons/index';

// TYPES
import { IModal } from './utils/types';

export const Modal = ({
  children,
  title,
  size = 'md',
  modalState,
  setModalState,
}: IModal) => {
  const [animation, setAnimation] = useState<boolean>(true);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    if (modalIsOpen) {
      setAnimation(false);
      setTimeout(() => {
        setModalIsOpen(false);
        setModalState(false);
      }, 250);
    } else if (modalState) {
      setAnimation(true);
      setModalIsOpen(true);
    }
  };

  useEffect(() => {
    toggleModal();
  }, [modalState]);

  if (modalIsOpen) {
    return (
      <Style.Background
        id="background"
        animation={animation}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onMouseDown={(evt: any) => {
          if (evt.target.id === 'background') setModalState(false);
        }}
      >
        <Style.Body animation={animation} size={size}>
          <Style.Header>
            <h2>{title}</h2>
            <IconButton
              icon={icon.x}
              color={theme.color.primary}
              onClick={() => {
                setModalState(false);
              }}
            />
          </Style.Header>
          {children}
        </Style.Body>
      </Style.Background>
    );
  }
  return null;
};
