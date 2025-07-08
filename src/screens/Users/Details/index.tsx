// REACT
import { useState, useEffect } from 'react';

// LIBS
import { useNavigate, useParams } from 'react-router-dom';

// SERVICES
import { getUserDetails } from '@services/apis/getUserDetails';

// GLOBAL COMPONENTS
import { Tag } from '@components/Tag';
import { ReturnButton } from '@components/Buttons/ReturnButton';
import { IconButton } from '@components/Buttons/IconButton';
import { Image } from '@components/Image';
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';

// GLOBAL UTILS
import { applyMask, dateTimeFormatter } from '@utils/functions';

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
              </Style.DetailsContainer>
            </Style.ProfileContent>
          </Style.ProfileSection>

          <IconButton
            hideLabelOnMedia
            icon={icon.editWithBg}
            label="Editar"
            onClick={() => setModalEditUser(true)}
          />

          <h2>Empresas vinculadas</h2>

          <Style.CompaniesSection>
            {user.companies && user.companies.length > 0 ? (
              user.companies.map((company) => (
                <Style.CompanyCard
                  key={company.id}
                  onClick={() => navigate(`/companies/${company.id}`)}
                >
                  <Style.Avatar>
                    <Image
                      width="100%"
                      height="80%"
                      img={company.image || icon.enterprise}
                      key={company.id}
                    />
                  </Style.Avatar>

                  <Style.CompanyInfo>
                    <Style.DetailItem>
                      <h2>Nome da empresa</h2>
                      <p>{company.name}</p>
                    </Style.DetailItem>

                    <Style.DetailItem>
                      <h2>Status</h2>
                      <Tag isInvalid={company.isBlocked} />
                    </Style.DetailItem>
                  </Style.CompanyInfo>
                </Style.CompanyCard>
              ))
            ) : (
              <p>Nenhuma empresa vinculada.</p>
            )}
          </Style.CompaniesSection>

          <h2>Edificações vinculadas</h2>

          <Style.CompaniesSection>
            {user.edifications && user.edifications.length > 0 ? (
              user.edifications.map((edification) => (
                <Style.CompanyCard
                  key={edification.id}
                  onClick={() => navigate(`/buildings/${edification.id}`)}
                >
                  <Style.Avatar>
                    <Image
                      width="100%"
                      height="80%"
                      img={edification.image || icon.building}
                      key={edification.id}
                    />
                  </Style.Avatar>

                  <Style.CompanyInfo>
                    <Style.DetailItem>
                      <h2>Nome da edificação</h2>
                      <p>{edification.name}</p>
                    </Style.DetailItem>
                  </Style.CompanyInfo>
                </Style.CompanyCard>
              ))
            ) : (
              <p>Nenhuma edificação vinculada.</p>
            )}
          </Style.CompaniesSection>
        </Style.Container>
      )}
    </>
  );
};
