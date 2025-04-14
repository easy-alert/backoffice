import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ReturnButton } from '@components/Buttons/ReturnButton';
import { Image } from '@components/Image';
import { Tag } from '@components/Tag';

import { icon } from '@assets/icons';
import * as Style from './styles';

// Tipagens fictícias
type IUser = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

type ICompany = {
  id: string;
  name: string;
  isBlocked: boolean;
  image?: string;
};

type IBuildingDetails = {
  id: string;
  users: IUser[];
  companies: ICompany[];
  type?: string;
  startDate?: string;
  warrantyEnd?: string;
  notifyAfterWarranty?: boolean;
  maintenanceBasedOn?: string;
  guestCanFinish?: boolean;
  zipCode?: string;
  city?: string;
  neighborhood?: string;
  street?: string;
  proofRequired?: boolean;
  publicLogs?: boolean;
};

export const BuildingDetails = () => {
  const { buildingId } = useParams();
  const navigate = useNavigate();
  const [building, setBuilding] = useState<IBuildingDetails | null>(null);
  const { search } = window.location;

  useEffect(() => {
    const fetchData = async () => {
      // API ainda será definida, então simulação por enquanto
      // const data = await fetchBuildingDetails(buildingId);
      // setBuilding(data);
      setBuilding({
        id: '1',
        users: [
          { id: '1', name: 'João Silva', email: 'joao@email.com' },
          { id: '2', name: 'Maria Souza', email: 'maria@email.com' },
        ],
        companies: [{ id: '1', name: 'Empresa Alpha', isBlocked: true }],
      });
    };

    fetchData();
  }, [buildingId]);

  if (!building) return null;

  return (
    <Style.Container>
      <h2>Detalhes da Edificação</h2>
      <ReturnButton path={`/buildings${search}`} />
      <Style.DetailsBox>
        <Style.DetailGrid>
          <Style.Avatar>
            <Image
              width="100%"
              height="100%"
              img={icon.personPlaceholder}
              //   key={user.id}
            />
          </Style.Avatar>

          <Style.DetailsWrapper>
            <Style.DetailItem>
              <h2>Nome</h2>
            </Style.DetailItem>

            <Style.DetailItem>
              <h2>Tipo</h2>
              <p>{building.type || 'Não informado'}</p>
            </Style.DetailItem>

            <Style.DetailItem>
              <h2>CEP</h2>
              <p>{building.zipCode || 'Não informado'}</p>
            </Style.DetailItem>

            <Style.DetailItem>
              <h2>Logradouro</h2>
              <p>{building.street || 'Não informado'}</p>
            </Style.DetailItem>

            <Style.DetailItem>
              <h2>Bairro</h2>
              <p>{building.neighborhood || 'Não informado'}</p>
            </Style.DetailItem>

            <Style.DetailItem>
              <h2>Local</h2>
              <p>{building.city || 'Não informado'}</p>
            </Style.DetailItem>

            <Style.DetailItem>
              <h2>Data de Início</h2>
              <p>{building.startDate || 'Não informado'}</p>
            </Style.DetailItem>

            <Style.DetailItem>
              <h2>Término da Garantia</h2>
              <p>{building.warrantyEnd || 'Não informado'}</p>
            </Style.DetailItem>

            <Style.DetailItem>
              <h2>Notificar Após Garantia</h2>
              <p>{building.notifyAfterWarranty ? 'Sim' : 'Não'}</p>
            </Style.DetailItem>

            <Style.DetailItem>
              <h2>Próxima Manutenção Baseada em</h2>
              <p>{building.maintenanceBasedOn || 'Não informado'}</p>
            </Style.DetailItem>

            <Style.DetailItem>
              <h2>Convidado Pode Concluir Manutenção</h2>
              <p>{building.guestCanFinish ? 'Sim' : 'Não'}</p>
            </Style.DetailItem>

            <Style.DetailItem>
              <h2>Comprovante de Relato Obrigatório</h2>
              <p>{building.proofRequired ? 'Sim' : 'Não'}</p>
            </Style.DetailItem>

            <Style.DetailItem>
              <h2>Tornar Logs de Atividades Públicos?</h2>
              <p>{building.publicLogs ? 'Sim' : 'Não'}</p>
            </Style.DetailItem>
          </Style.DetailsWrapper>
        </Style.DetailGrid>
      </Style.DetailsBox>

      <h2>Usuários Vinculados</h2>
      <Style.DetailsBox>
        <Style.CardGrid>
          {building.users.map((user) => (
            <Style.CompanyCard key={user.id} onClick={() => navigate(`/users/${user.id}`)}>
              <Style.CompanyLogo>
                <Image
                  size="100%"
                  width="100%"
                  height="100%"
                  img={user.image || icon.personPlaceholder}
                  radius="50%"
                />
              </Style.CompanyLogo>
              <Style.CompanyInfo>
                <Style.DetailItem>
                  <h2>Nome</h2>
                  <p>{user.name}</p>
                </Style.DetailItem>
                <Style.DetailItem>
                  <h2>Email</h2>
                  <p>{user.email}</p>
                </Style.DetailItem>
              </Style.CompanyInfo>
            </Style.CompanyCard>
          ))}
        </Style.CardGrid>
      </Style.DetailsBox>

      <h2>Empresa Relacionada</h2>
      <Style.DetailsBox>
        <Style.CardGrid>
          {building.companies.map((company) => (
            <Style.CompanyCard
              key={company.id}
              onClick={() => navigate(`/companies/${company.id}`)}
            >
              <Style.CompanyLogo>
                {company.image ? (
                  <img
                    src={company.image}
                    alt={`Logo ${company.name}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <img src={icon.block} alt="Placeholder" />
                )}
              </Style.CompanyLogo>

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
        </Style.CardGrid>
      </Style.DetailsBox>
    </Style.Container>
  );
};
