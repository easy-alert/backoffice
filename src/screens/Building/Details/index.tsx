import { useEffect, useState } from 'react';

// LIBS
import { useNavigate, useParams } from 'react-router-dom';

// SERVICES
import { getBuildingById } from '@services/apis/getBuildingById';
import { getBuildingTypes } from '@services/apis/getBuildingTypes';
import { updateBuildingBlockedStatus } from '@services/apis/updateBuildingBlockedStatus';

// GLOBAL COMPONENTS
import { ReturnButton } from '@components/Buttons/ReturnButton';
import { IconButton } from '@components/Buttons/IconButton';
import { PopoverButton } from '@components/Buttons/PopoverButton';
import { Image } from '@components/Image';
import { Tag } from '@components/Tag';
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';
import { CardListDetails } from '@components/CardListDetails';

// GLOBAL UTILS
import { applyMask, capitalizeFirstLetter, dateTimeFormatter } from '@utils/functions';

// GLOBAL STYLES
import { theme } from '@styles/theme';

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
  const [onQuery, setOnQuery] = useState<boolean>(false);

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

  const requestChangeIsBlocked = async () => {
    if (!building || !building.id) return;
    setOnQuery(true);

    try {
      const updated = await updateBuildingBlockedStatus(building.id);
      setBuilding((prev) => ({
        ...prev!,
        isBlocked: updated?.isBlocked ?? !prev!.isBlocked,
      }));
    } catch (error) {
      console.error('Erro ao alterar status da edificação:', error);
    } finally {
      setOnQuery(false);
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
            <PopoverButton
              label={building?.isBlocked ? 'Ativar' : 'Desativar'}
              actionButtonBgColor={
                building?.isBlocked ? theme.color.success : theme.color.actionDanger
              }
              type="IconButton"
              disabled={onQuery}
              buttonIcon={building?.isBlocked ? icon.checked : icon.block}
              message={{
                title: `Deseja ${building?.isBlocked ? 'ativar' : 'desativar'} esta edificação?`,
                content: 'Esta ação poderá ser desfeita posteriormente.',
                contentColor: theme.color.danger,
              }}
              actionButtonClick={requestChangeIsBlocked}
            />

            <IconButton
              hideLabelOnMedia
              icon={icon.editWithBg}
              label="Editar"
              onClick={() => setShowEditModal(true)}
            />
          </Style.ButtonsContainer>

          <CardListDetails
            title="Usuários vinculados"
            items={
              Array.isArray(users) && users.length > 0
                ? users.map((user: IUser) => ({
                    id: user.id,
                    image: user.image,
                    icon: icon.user,
                    onClick: () => navigate(`/users/${user.id}`),
                    details: [
                      { label: 'Nome', value: user.name },
                      { label: 'Email', value: user.email },
                      {
                        label: 'Último acesso',
                        value: user.lastAccess ? dateTimeFormatter(user.lastAccess) : '-',
                      },
                    ],
                    status: !user.isBlocked,
                  }))
                : []
            }
            emptyMessage="Nenhum usuário vinculado."
          />
          {building?.Company && (
            <CardListDetails
              title="Empresa vinculada"
              items={[
                {
                  id: building.Company?.id,
                  image: building.Company?.image,
                  icon: icon.enterprise,
                  onClick: () => navigate(`/companies/${building.Company?.id}`),
                  details: [{ label: 'Nome da empresa', value: building.Company?.name }],
                  status: !building.Company?.isBlocked,
                },
              ]}
              emptyMessage="Nenhuma empresa vinculada."
            />
          )}
        </Style.Container>
      )}
    </>
  );
};
