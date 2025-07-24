import { useState, useEffect } from 'react';

// LIBS
import { useNavigate, useParams } from 'react-router-dom';

// SERVICES
import { getUserDetails } from '@services/apis/getUserDetails';
import { putIsBlockedUser } from '@services/apis/putIsblockedUser';

// GLOBAL COMPONENTS
import { Tag } from '@components/Tag';
import { ReturnButton } from '@components/Buttons/ReturnButton';
import { Image } from '@components/Image';
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';
import { PopoverButton } from '@components/Buttons/PopoverButton';
import { IconButton } from '@components/Buttons/IconButton';
import { CardListDetails } from '@components/CardListDetails';

// GLOBAL UTILS
import { applyMask, dateTimeFormatter } from '@utils/functions';

// GLOBAL STYLES
import { theme } from '@styles/theme';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// GLOBAL TYPES
import type { IUserDetails } from '@utils/types';

// COMPONENTS
import { ModalEditUser } from './components/ModalEditUser';

// STYLES
import * as Style from './styles';

export const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { search } = window.location;

  const [user, setUser] = useState<IUserDetails | null>(null);
  const [modalEditUser, setModalEditUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [onQuery, setOnQuery] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) return;

      try {
        const response = await getUserDetails(userId);
        setUser(response.user);
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [userId]);

  const handleModals = (modal: string, modalState: boolean) => {
    if (modal === 'updateUser') {
      setModalEditUser(modalState);
    }
  };

  const requestChangeIsBlocked = async () => {
    if (!user) return;
    setOnQuery(true);

    try {
      const response = await putIsBlockedUser(user.id);
      setUser((prev) => ({
        ...prev!,
        isBlocked: response?.isBlocked ?? !prev!.isBlocked,
      }));
    } catch (error) {
      console.error('Erro ao alterar status do usuário:', error);
    } finally {
      setOnQuery(false);
    }
  };

  return (
    <>
      {modalEditUser && user && (
        <ModalEditUser
          selectedUser={user}
          handleModals={handleModals}
          onUserUpdated={(updatedUser) => {
            setUser(updatedUser as IUserDetails);
          }}
        />
      )}
      {loading && <DotSpinLoading />}

      {!loading && user && (
        <Style.Container>
          <h2>Perfil do usuário</h2>
          <ReturnButton path={`/users${search}`} />

          <Style.ProfileSection>
            <Style.ProfileContent>
              <Style.Avatar>
                <Image width="80%" height="80%" img={user.image || icon.user} key={user.id} />
              </Style.Avatar>

              <Style.DetailsContainer>
                <Style.DetailItem>
                  <h2>Nome</h2>
                  <p>{user.name}</p>
                </Style.DetailItem>

                <Style.DetailItem>
                  <h2>Email</h2>
                  <p>{user.email || '-'}</p>
                </Style.DetailItem>

                <Style.DetailItem>
                  <h2>Data de cadastro</h2>
                  <p>{user.createdAt ? dateTimeFormatter(user.createdAt) : '-'}</p>
                </Style.DetailItem>

                <Style.DetailItem>
                  <h2>Cargo</h2>
                  <p>{user.role || '-'}</p>
                </Style.DetailItem>

                <Style.DetailItem>
                  <h2>Telefone</h2>
                  <p>
                    {user.phoneNumber
                      ? applyMask({ mask: 'TEL', value: user.phoneNumber }).value
                      : '-'}
                  </p>
                </Style.DetailItem>

                <Style.DetailItem>
                  <h2>Último acesso</h2>
                  <p>{user.lastAccess ? dateTimeFormatter(user.lastAccess) : '-'}</p>
                </Style.DetailItem>
                <Style.DetailItem>
                  <h2>Status</h2>
                  <Tag isInvalid={user.isBlocked} />
                </Style.DetailItem>
              </Style.DetailsContainer>
            </Style.ProfileContent>
          </Style.ProfileSection>

          <Style.ActionsWrapper>
            <PopoverButton
              disabled={onQuery}
              actionButtonBgColor={user?.isBlocked ? theme.color.success : theme.color.actionDanger}
              type="IconButton"
              label={user?.isBlocked ? 'Ativar' : 'Desativar'}
              buttonIcon={user?.isBlocked ? icon.checked : icon.block}
              message={{
                title: `Deseja ${user?.isBlocked ? 'ativar' : 'desativar'} o acesso deste usuário?`,
                content: 'Esta ação poderá ser desfeita posteriormente.',
                contentColor: theme.color.danger,
              }}
              actionButtonClick={requestChangeIsBlocked}
            />

            <IconButton
              hideLabelOnMedia
              icon={icon.editWithBg}
              label="Editar"
              onClick={() => setModalEditUser(true)}
            />
          </Style.ActionsWrapper>

          <CardListDetails
            title="Empresas vinculadas"
            items={
              Array.isArray(user.companies) && user.companies.length > 0
                ? user.companies.map((company) => ({
                    id: company.id,
                    image: company.image,
                    icon: icon.enterprise,
                    onClick: () => navigate(`/companies/${company.id}`),
                    details: [{ label: 'Nome da empresa', value: company.name }],
                    status: !company.isBlocked,
                  }))
                : []
            }
            emptyMessage="Nenhuma empresa vinculada."
          />

          <CardListDetails
            title="Edificações vinculadas"
            items={
              Array.isArray(user.edifications) && user.edifications.length > 0
                ? user.edifications.map((edification) => ({
                    id: edification.id,
                    image: edification.image,
                    icon: icon.building,
                    onClick: () => navigate(`/buildings/${edification.id}`),
                    details: [{ label: 'Nome da edificação', value: edification.name }],
                    status: !edification.isBlocked,
                  }))
                : []
            }
            emptyMessage="Nenhuma edificação vinculada."
          />
        </Style.Container>
      )}
    </>
  );
};
