// REACT
import { useState, useEffect } from 'react';

// LIBS
import { useNavigate, useParams } from 'react-router-dom';

// GLOBAL COMPONENTS
import { Tag } from '@components/Tag';
import { ReturnButton } from '@components/Buttons/ReturnButton';
import { Image } from '@components/Image';

// GLOBAL UTILS
import { applyMask } from '@utils/functions';

// GLOBAL STYLES
import { icon } from '@assets/icons';
import * as Style from './styles';

// SERVICES
import { fetchUserDetails, formatDate, formatDateTime } from './utils/functions';

// TYPES
import type { IUserDetails } from './utils/types';

export const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<IUserDetails | null>(null);
  const { search } = window.location;
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) return;

      try {
        const response = await fetchUserDetails(userId);
        setUser(response.user);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadUserData();
  }, [userId]);

  if (!user) return null;

  return (
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
              <p>{user.createdAt ? formatDate(user.createdAt) : '-'}</p>
            </Style.DetailItem>

            <Style.DetailItem>
              <h2>Cargo</h2>
              <p>{user.role || '-'}</p>
            </Style.DetailItem>

            <Style.DetailItem>
              <h2>Telefone</h2>
              <p>
                {user.phoneNumber ? applyMask({ mask: 'TEL', value: user.phoneNumber }).value : '-'}
              </p>
            </Style.DetailItem>

            <Style.DetailItem>
              <h2>Último acesso</h2>
              <p>{user.lastAccess ? formatDateTime(user.lastAccess) : '-'}</p>
            </Style.DetailItem>
          </Style.DetailsContainer>
        </Style.ProfileContent>
      </Style.ProfileSection>

      <h2>Empresas vinculadas</h2>

      <Style.CompaniesSection>
        {user.companies && user.companies.length > 0 && (
          <table>
            {user.companies.map((company) => (
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
            ))}
          </table>
        )}
      </Style.CompaniesSection>

      <h2>Edificações vinculadas</h2>

      <Style.CompaniesSection>
        {user.edifications && user.edifications.length > 0 && (
          <table>
            {user.edifications.map((edification) => (
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
            ))}
          </table>
        )}
      </Style.CompaniesSection>
    </Style.Container>
  );
};
