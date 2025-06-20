import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// SERVICES
import { getBuildingById } from '@services/apis/getBuildingById';

// GLOBAL COMPONENTS
import { ReturnButton } from '@components/Buttons/ReturnButton';
import { Image } from '@components/Image';
import { Tag } from '@components/Tag';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// GLOBAL TYPES
import { IUser } from '@utils/types';
import { IBuilding } from '@customTypes/IBuilding';

// STYLES
import * as Style from './styles';

export const BuildingDetails = () => {
  const { buildingId } = useParams();
  const navigate = useNavigate();
  const { search } = window.location;

  const [building, setBuilding] = useState<IBuilding | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);

  const handleGetBuildingById = async (id?: string) => {
    if (!id) return;
    try {
      const data = await getBuildingById(id);

      const usersList: IUser[] = Array.isArray(data.UserBuildingsPermissions)
        ? data.UserBuildingsPermissions.filter((ubp: any) => ubp && ubp.User).map(
            (ubp: any) => ubp.User,
          )
        : [];

      setBuilding(data);
      setUsers(usersList);
    } catch (err) {
      setBuilding(null);
      setUsers([]);
    }
  };

  useEffect(() => {
    handleGetBuildingById(buildingId);
  }, [buildingId]);

  return (
    <Style.Container>
      <h2>Detalhes da edificação</h2>
      <ReturnButton path={`/buildings${search}`} />
      <Style.DetailsBox>
        <Style.DetailGrid>
          <Style.Avatar>
            <Image width="80%" height="80%" img={building?.image || icon.building} />
          </Style.Avatar>

          <Style.DetailsWrapper>
            <Style.DetailItem>
              <h2>Nome</h2>
              <p>{building?.name || ''}</p>
            </Style.DetailItem>
            <Style.DetailItem>
              <h2>Data de Criação</h2>
              <p>{building?.createdAt ? new Date(building.createdAt).toLocaleString() : ''}</p>
            </Style.DetailItem>
            <Style.DetailItem>
              <h2>Status</h2>
              <Tag isInvalid={building?.isBlocked} />
            </Style.DetailItem>
            <Style.DetailItem>
              <h2>CEP</h2>
              <p>{building?.cep || ''}</p>
            </Style.DetailItem>
            <Style.DetailItem>
              <h2>Logradouro</h2>
              <p>{building?.streetName || ''}</p>
            </Style.DetailItem>
            <Style.DetailItem>
              <h2>Cidade</h2>
              <p>{building?.city || ''}</p>
            </Style.DetailItem>
          </Style.DetailsWrapper>
        </Style.DetailGrid>
      </Style.DetailsBox>

      {users.length > 0 && (
        <>
          <h2>Usuários vinculados</h2>
          <Style.DetailsBox>
            <Style.CardGrid>
              {users.map((user: IUser) => (
                <Style.CompanyCard key={user.id} onClick={() => navigate(`/users/${user.id}`)}>
                  <Style.Avatar>
                    <Image width="80%" height="80%" img={user.image || icon.user} />
                  </Style.Avatar>
                  <Style.CompanyInfo>
                    <Style.DetailItem>
                      <h2>Nome</h2>
                      <p>{user.name}</p>
                    </Style.DetailItem>
                    <Style.DetailItem>
                      <h2>Email</h2>
                      <p>{user.email}</p>
                    </Style.DetailItem>
                    <Style.DetailItem>
                      <h2>Último acesso</h2>
                      <p>{user.lastAccess ? new Date(user.lastAccess).toLocaleString() : '-'}</p>
                    </Style.DetailItem>
                  </Style.CompanyInfo>
                </Style.CompanyCard>
              ))}
            </Style.CardGrid>
          </Style.DetailsBox>
        </>
      )}

      {building?.Company && (
        <>
          <h2>Empresa vinculada</h2>
          <Style.DetailsBox>
            <Style.CardGrid>
              <Style.CompanyCard
                key={building.Company.id}
                onClick={() => navigate(`/companies/${building.Company?.id}`)}
              >
                <Style.Avatar>
                  <Image width="80%" height="80%" img={building.Company.image || icon.enterprise} />
                </Style.Avatar>
                <Style.CompanyInfo>
                  <Style.DetailItem>
                    <h2>Nome da empresa</h2>
                    <p>{building.Company.name}</p>
                  </Style.DetailItem>
                  <Style.DetailItem>
                    <h2>Status</h2>
                    <Tag isInvalid={building.Company.isBlocked} />
                  </Style.DetailItem>
                </Style.CompanyInfo>
              </Style.CompanyCard>
            </Style.CardGrid>
          </Style.DetailsBox>
        </>
      )}
    </Style.Container>
  );
};
