import { useEffect, useState } from 'react';

// LIBS
import { useNavigate, useParams } from 'react-router-dom';

// SERVICES
import { getBuildingById } from '@services/apis/getBuildingById';
import { getBuildingTypes } from '@services/apis/getBuildingTypes';

// GLOBAL COMPONENTS
import { ReturnButton } from '@components/Buttons/ReturnButton';
import { IconButton } from '@components/Buttons/IconButton';
import { Image } from '@components/Image';
import { Tag } from '@components/Tag';
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';

// GLOBAL UTILS
import { applyMask, capitalizeFirstLetter } from '@utils/functions';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// GLOBAL TYPES
import type { IUser, IBuildingType } from '@utils/types';
import type { IBuilding } from '@customTypes/IBuilding';

// COMPONENTS
import { ModalEditBuilding } from './components/ModalEditBuilding';

// STYLES
import * as Style from './styles';

export const BuildingDetails = () => {
  const { buildingId } = useParams();
  const navigate = useNavigate();
  const { search } = window.location;

  const [building, setBuilding] = useState<IBuilding | null>(null);
  const [buildingTypes, setBuildingTypes] = useState<IBuildingType[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleGetBuildingById = async (id?: string) => {
    if (!id) return;

    try {
      const data: IBuilding | null = await getBuildingById({ buildingId: id });

      if (!data) {
        setBuilding(null);
        setUsers([]);
        return;
      }

      const usersList: IUser[] = Array.isArray(data.UserBuildingsPermissions)
        ? data.UserBuildingsPermissions.filter((ubp: any) => ubp?.User).map((ubp: any) => ubp.User)
        : [];

      setBuilding(data);
      setUsers(usersList);
    } catch (error) {
      setBuilding(null);
      setUsers([]);
    }
  };

  const handleGetBuildingTypes = async () => {
    try {
      const response = await getBuildingTypes();
      setBuildingTypes(response);
    } catch (error) {
      setBuildingTypes([]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([handleGetBuildingTypes(), handleGetBuildingById(buildingId)]);
      setLoading(false);
    };

    loadData();
  }, [buildingId]);

  return (
    <>
      {showEditModal && building && (
        <ModalEditBuilding
          onClose={() => setShowEditModal(false)}
          building={building}
          buildingTypes={buildingTypes}
          requestBuildingDetailsCall={() => handleGetBuildingById(buildingId)}
        />
      )}
      {loading && <DotSpinLoading />}

      {!loading && building && (
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
                  <p>{building?.name || '-'}</p>
                </Style.DetailItem>
                <Style.DetailItem>
                  <h2>Tipo</h2>
                  <p>
                    {building?.BuildingType?.name
                      ? capitalizeFirstLetter(building.BuildingType.name)
                      : '-'}
                  </p>
                </Style.DetailItem>
                <Style.DetailItem>
                  <h2>Status</h2>
                  <Tag isInvalid={building?.isBlocked} />
                </Style.DetailItem>
                <Style.DetailItem>
                  <h2>CEP</h2>
                  <p>
                    {building?.cep ? applyMask({ mask: 'CEP', value: building.cep }).value : '-'}
                  </p>
                </Style.DetailItem>
                <Style.DetailItem>
                  <h2>Logradouro</h2>
                  <p>{building?.streetName || '-'}</p>
                </Style.DetailItem>
                <Style.DetailItem>
                  <h2>Bairro</h2>
                  <p>{building?.neighborhood || '-'}</p>
                </Style.DetailItem>
                <Style.DetailItem>
                  <h2>Cidade</h2>
                  <p>{building?.city || '-'}</p>
                </Style.DetailItem>
                <Style.DetailItem>
                  <h2>Estado</h2>
                  <p>{building?.state || '-'}</p>
                </Style.DetailItem>
                <Style.DetailItem>
                  <h2>Próxima manutenção baseada em</h2>
                  <p>
                    {building?.nextMaintenanceCreationBasis === 'notificationDate'
                      ? 'Data de notificação'
                      : 'Data de execução'}
                  </p>
                </Style.DetailItem>
                <Style.DetailItem>
                  <h2>Data de início</h2>
                  <p>
                    {building?.deliveryDate
                      ? new Date(building.deliveryDate).toLocaleDateString()
                      : '-'}
                  </p>
                </Style.DetailItem>
                <Style.DetailItem>
                  <h2>Data de Criação</h2>
                  <p>{building?.createdAt ? new Date(building.createdAt).toLocaleString() : '-'}</p>
                </Style.DetailItem>
                <Style.DetailItem>
                  <h2>Término da garantia</h2>
                  <p>
                    {building?.warrantyExpiration
                      ? new Date(building.warrantyExpiration).toLocaleDateString()
                      : '-'}
                  </p>
                </Style.DetailItem>
                <Style.DetailItem>
                  <h2>Notificar após garantia</h2>
                  <p>{building?.keepNotificationAfterWarrantyEnds ? 'Sim' : 'Não'}</p>
                </Style.DetailItem>
                <Style.DetailItem>
                  <h2>Comprovantes de relato obrigatórios?</h2>
                  <p>{building?.mandatoryReportProof ? 'Sim' : 'Não'}</p>
                </Style.DetailItem>
                <Style.DetailItem>
                  <h2>Tornar logs de atividade público</h2>
                  <p>{building?.isActivityLogPublic ? 'Sim' : 'Não'}</p>
                </Style.DetailItem>
                <Style.DetailItem>
                  <h2>Convidado pode concluir manutenção?</h2>
                  <p>{building?.guestCanCompleteMaintenance ? 'Sim' : 'Não'}</p>
                </Style.DetailItem>
              </Style.DetailsWrapper>
            </Style.DetailGrid>
          </Style.DetailsBox>

          <Style.ButtonsContainer>
            {/* <PopoverButton
              disabled={onQuery}
              actionButtonBgColor={
                building?.isBlocked ? theme.color.success : theme.color.actionDanger
              }
              type="IconButton"
              label={building?.isBlocked ? 'Ativar' : 'Desativar'}
              buttonIcon={building?.isBlocked ? icon.checked : icon.block}
              message={{
                title: `Deseja ${building?.isBlocked ? 'ativar' : 'desativar'} esta edificação?`,
                content: 'Esta ação poderá ser desfeita posteriormente.',
                contentColor: theme.color.danger,
              }}
              actionButtonClick={() => {
                requestChangeIsBlocked({
                  building,
                  setBuilding,
                  setOnQuery,
                });
              }}
            /> */}

            <IconButton
              hideLabelOnMedia
              icon={icon.editWithBg}
              label="Editar"
              onClick={() => setShowEditModal(true)}
            />
          </Style.ButtonsContainer>

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
                          <p>
                            {user.lastAccess ? new Date(user.lastAccess).toLocaleString() : '-'}
                          </p>
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
                      <Image
                        width="80%"
                        height="80%"
                        img={building.Company.image || icon.enterprise}
                      />
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
      )}
    </>
  );
};
