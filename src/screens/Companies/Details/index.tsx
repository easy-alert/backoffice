// LIBS
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// COMPONENTS
import * as Style from './styles';
import { ReturnButton } from '../../../components/Buttons/ReturnButton';
import { IconButton } from '../../../components/Buttons/IconButton';
import { Image } from '../../../components/Image';
import { Tag } from '../../../components/Tag';
import { PopoverButton } from '../../../components/Buttons/PopoverButton';

// THEMES
import { theme } from '../../../styles/theme';

// ICONS
import { icon } from '../../../assets/icons/index';

// TYPES
import { IUser } from '../../../types/types';

// MODAIS
import { modalEditUser } from './utils/modals/ModalEditUser';

// FUNCTIONS
import { DateFormatter } from '../../../utils/functions';
import {
  requestChangeIsBlocked,
  requestChangeIsDeleted,
} from './utils/functions';

export const UsersDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [user, setUser] = useState<IUser>(state as IUser);
  const [loading, setLoading] = useState<boolean>(true);

  const { ModalEditUser, toggleModalEditUser, modalEditIsOpen } =
    modalEditUser();

  useEffect(() => {
    if (!state) {
      navigate('/users');
    }
    setLoading(false);
  }, []);

  return (
    <>
      {modalEditIsOpen && <ModalEditUser user={user} setUser={setUser} />}

      {!loading && (
        <>
          <Style.Header>
            <h2>Detalhes de usuário</h2>
          </Style.Header>

          <ReturnButton path="/users" />
          <Style.CardSection>
            <Style.Card>
              <h6>Foto de perfil</h6>
              <Image img={user.image} size="80px" />
            </Style.Card>

            <Style.Card>
              <h6>Nome completo</h6>
              <p className="p2">{user?.name}</p>
            </Style.Card>

            <Style.Card>
              <h6>Status</h6>
              <Tag isInvalid={user.isBlocked} />
            </Style.Card>

            <Style.Card>
              <h6>E-mail</h6>
              <p className="p2">{user?.email}</p>
            </Style.Card>

            <Style.Card>
              <h6>Data de cadastro</h6>
              <p className="p2">{DateFormatter(user?.createdAt)}</p>
            </Style.Card>

            <Style.Card>
              <h6>Último acesso</h6>
              <p className="p2">
                {user.lastAccess ? DateFormatter(user.lastAccess) : '-'}
              </p>
            </Style.Card>
          </Style.CardSection>

          <Style.Footer>
            <PopoverButton
              actionButtonBgColor={
                user.isBlocked ? theme.color.success : theme.color.danger
              }
              type="IconButton"
              label={user.isBlocked ? 'Ativar' : 'Desativar'}
              buttonIcon={user.isBlocked ? icon.checked : icon.block}
              message={{
                title: `Deseja ${
                  user.isBlocked ? 'ativar' : 'desativar'
                } o acesso deste usuário?`,
                content: 'Esta ação poderá ser desfeita posteriormente.',
                contentColor: theme.color.danger,
              }}
              actionButtonClick={() => {
                requestChangeIsBlocked({
                  user,
                  setUser,
                  navigate,
                });
              }}
            />
            <PopoverButton
              actionButtonBgColor={theme.color.danger}
              type="IconButton"
              label="Excluir"
              buttonIcon={icon.trash}
              message={{
                title: 'Deseja excluir este usuário?',
                content:
                  'Atenção, essa ação não poderá ser desfeita posteriormente.',
                contentColor: theme.color.danger,
              }}
              actionButtonClick={() => {
                requestChangeIsDeleted({
                  user,
                  navigate,
                });
              }}
            />

            <IconButton
              hideLabelOnMedia
              icon={icon.editWithBg}
              label="Editar"
              onClick={() => {
                toggleModalEditUser();
              }}
            />
          </Style.Footer>
        </>
      )}
    </>
  );
};
