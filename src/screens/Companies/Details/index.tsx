// LIBS
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// COMPONENTS
import { ReturnButton } from '@components/Buttons/ReturnButton';
import { IconButton } from '@components/Buttons/IconButton';
import { Image } from '@components/Image';
import { Tag } from '@components/Tag';
import { PopoverButton } from '@components/Buttons/PopoverButton';
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';
import { CardListDetails } from '@components/CardListDetails';

// THEMES
import { theme } from '@styles/theme';

// ICONS
import { icon } from '@assets/icons/index';

// FUNCTIONS
import { applyMask, dateTimeFormatter } from '@utils/functions';

// TYPES
import type { IUser } from '@utils/types';

// MODAIS
import {
  requestChangeIsBlocked,
  requestDeleteCompany,
  requestUserDetails,
} from './utils/functions';

import { ModalEditCompanyAndOwner } from './utils/modals/ModalEditCompanyAndOwner';
import { ModalBuildingAccessHistories } from './utils/modals/ModalBuildingAccessHistories';

import * as Style from './styles';

import type { ILinkedCompanies, ILinkedUsers } from './utils/types';
import type { ICompany } from '../List/utils/types';

const clientTypeLabels: { [key: string]: string } = {
  residentSyndic: 'Síndico Morador',
  professionalSyndic: 'Síndico Profissional',
  constructionCompany: 'Construtora',
  administrationCompany: 'Administradora',
  others: 'Outros',
};

export const CompanyDetails = () => {
  // UTILS
  const [loading, setLoading] = useState<boolean>(true);
  const [onQuery, setOnQuery] = useState<boolean>(false);
  const navigate = useNavigate();
  const { companyId } = useParams();

  // CONSTS
  const [company, setCompany] = useState<ICompany>();
  const [companyOwner, setCompanyOwner] = useState<IUser>();
  const [modalEditCompanyAndOwnerIsOpen, setModalEditCompanyAndOwnerIsOpen] =
    useState<boolean>(false);
  const [linkedUsers, setLinkedUsers] = useState<ILinkedUsers[]>([]);
  const [linkedCompanies, setLinkedCompanies] = useState<ILinkedCompanies[]>([]);

  const [modalBuildingAccessHistories, setModalBuildingAccessHistories] = useState<boolean>(false);

  const { search } = window.location;

  useEffect(() => {
    requestUserDetails({
      companyId: companyId!,
      setCompany,
      setCompanyOwner,
      setLoading,
      setLinkedUsers,
      setLinkedCompanies,
    });
  }, []);

  return (
    <>
      {modalEditCompanyAndOwnerIsOpen && company && (
        <ModalEditCompanyAndOwner
          company={company}
          companyOwner={companyOwner!}
          setCompany={setCompany}
          setModal={setModalEditCompanyAndOwnerIsOpen}
        />
      )}

      {modalBuildingAccessHistories && company && (
        <ModalBuildingAccessHistories
          companyId={company.id}
          setModal={setModalBuildingAccessHistories}
        />
      )}

      {loading && <DotSpinLoading />}

      {!loading && (
        <Style.Container>
          <h2>Detalhes da empresa</h2>
          <ReturnButton path={`/companies${search}`} />
          <Style.CardSection>
            <Style.Image>
              <Image img={company?.image} width="100%" height="100%" />
            </Style.Image>
            <Style.Details>
              <Style.Card>
                <h6>Nome do responsável</h6>
                <p className="p2">{companyOwner?.name}</p>
              </Style.Card>

              <Style.Card>
                <h6>E-mail</h6>
                <p className="p2">{companyOwner?.email}</p>
              </Style.Card>

              <Style.Card>
                <h6>Nome da empresa</h6>
                <p className="p2">{company?.name}</p>
              </Style.Card>

              <Style.Card>
                <h6>Tipo de cliente</h6>
                <p className="p2">
                  {company && company.clientType
                    ? clientTypeLabels[company.clientType] || company.clientType
                    : '-'}
                </p>
              </Style.Card>

              <Style.Card>
                <h6>Telefone</h6>
                <p className="p2">
                  {applyMask({ value: company?.contactNumber ?? '', mask: 'TEL' }).value}
                </p>
              </Style.Card>

              {company?.CPF && (
                <Style.Card>
                  <h6>CPF</h6>
                  <p className="p2">{applyMask({ value: company?.CPF, mask: 'CPF' }).value}</p>
                </Style.Card>
              )}

              {company?.CNPJ && (
                <Style.Card>
                  <h6>CNPJ</h6>
                  <p className="p2">{applyMask({ value: company?.CNPJ, mask: 'CNPJ' }).value}</p>
                </Style.Card>
              )}

              <Style.Card>
                <h6>Status</h6>
                <Tag isInvalid={company?.isBlocked ?? false} />
              </Style.Card>

              <Style.Card>
                <h6>Data de cadastro</h6>
                <p className="p2">
                  {company?.createdAt ? dateTimeFormatter(company?.createdAt) : '-'}
                </p>
              </Style.Card>

              <Style.Card>
                <h6>Último acesso</h6>
                <p className="p2">
                  {companyOwner?.lastAccess ? dateTimeFormatter(companyOwner?.lastAccess) : '-'}
                </p>
              </Style.Card>

              <Style.Card>
                <h6>Frequência de notificações</h6>
                <p className="p2">
                  {company?.isNotifyingOnceAWeek ? 'Semanalmente' : 'Diariamente'}
                </p>
              </Style.Card>

              <Style.Card>
                <h6>Acesso às checklists</h6>
                <p className="p2">{company?.canAccessChecklists ? 'Sim' : 'Não'}</p>
              </Style.Card>

              <Style.Card>
                <h6>Acesso aos chamados</h6>
                <p className="p2">{company?.canAccessTickets ? 'Sim' : 'Não'}</p>
              </Style.Card>

              <Style.Card>
                <h6>Receber relatórios mensais</h6>
                <p className="p2">{company?.receiveDailyDueReports ? 'Sim' : 'Não'}</p>
              </Style.Card>

              <Style.Card>
                <h6>Receber vencimentos diários</h6>
                <p className="p2">{company?.receivePreviousMonthReports ? 'Sim' : 'Não'}</p>
              </Style.Card>

              <Style.Card>
                <h6>Pagantes externos</h6>
                <p className="p2">
                  {company?.linkedExternalForPayment.length === 0
                    ? 'Nenhum'
                    : company?.linkedExternalForPayment.length}
                </p>
              </Style.Card>
            </Style.Details>
          </Style.CardSection>
          <Style.Footer disabled={onQuery}>
            <IconButton
              disabled={onQuery}
              hideLabelOnMedia
              icon={icon.count}
              label="Contagem"
              onClick={() => setModalBuildingAccessHistories(true)}
            />

            <IconButton
              disabled={onQuery}
              hideLabelOnMedia
              icon={icon.access}
              label="Acessar"
              onClick={() => {
                window.open(
                  `${
                    import.meta.env.VITE_COMPANY_URL ?? 'http://localhost:3000/home'
                  }?companyId=${companyId}&backofficeToken=${localStorage.getItem(
                    'authToken',
                  )}&userId=${companyOwner?.id}
                  `,
                  '_blank',
                );
              }}
            />

            <PopoverButton
              disabled={onQuery}
              actionButtonBgColor={
                company?.isBlocked ? theme.color.success : theme.color.actionDanger
              }
              type="IconButton"
              label={company?.isBlocked ? 'Ativar' : 'Desativar'}
              buttonIcon={company?.isBlocked ? icon.checked : icon.block}
              message={{
                title: `Deseja ${
                  company?.isBlocked ? 'ativar' : 'desativar'
                } o acesso deste usuário?`,
                content: 'Esta ação poderá ser desfeita posteriormente.',
                contentColor: theme.color.danger,
              }}
              actionButtonClick={() => {
                requestChangeIsBlocked({
                  company: company!,
                  setCompany,
                  setOnQuery,
                });
              }}
            />
            <PopoverButton
              disabled={onQuery}
              actionButtonBgColor={theme.color.actionDanger}
              type="IconButton"
              label="Excluir"
              buttonIcon={icon.trashWithBg}
              message={{
                title: 'Deseja excluir este usuário?',
                content: 'Atenção, essa ação não poderá ser desfeita posteriormente.',
                contentColor: theme.color.danger,
              }}
              actionButtonClick={() => {
                requestDeleteCompany({
                  company: company!,
                  navigate,
                  setOnQuery,
                });
              }}
            />

            <IconButton
              disabled={onQuery}
              hideLabelOnMedia
              icon={icon.editWithBg}
              label="Editar"
              onClick={() => setModalEditCompanyAndOwnerIsOpen(true)}
            />

            <IconButton
              className="p4"
              size="24px"
              hideLabelOnMedia
              icon={icon.eyeWithBlueBg}
              label="Permissões"
              onClick={() => navigate(`/companies/${company?.id}/permissions/${companyOwner?.id}`)}
            />
          </Style.Footer>

          <CardListDetails
            title="Usuários vinculados"
            items={
              Array.isArray(linkedUsers) && linkedUsers.length > 0
                ? linkedUsers.map((user) => ({
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
                      ...(user.owner ? [{ label: 'Dono', value: 'Sim' }] : []),
                    ],
                    status: !user.isBlocked,
                  }))
                : []
            }
            emptyMessage="Nenhum usuário vinculado."
          />
          <CardListDetails
            title="Edificações vinculadas"
            items={
              Array.isArray(linkedCompanies) && linkedCompanies.length > 0
                ? linkedCompanies.map((building) => ({
                    id: building.id,
                    image: building.image,
                    icon: icon.building,
                    onClick: () => navigate(`/buildings/${building.id}`),
                    details: [{ label: 'Nome da edificação', value: building.name }],
                    status: !building.isBlocked,
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
