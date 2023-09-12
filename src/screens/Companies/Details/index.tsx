// LIBS
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

// FUNCTIONS
import { applyMask, dateTimeFormatter } from '../../../utils/functions';

// TYPES
import { ICompany } from '../List/utils/types';

// MODAIS

import {
  requestChangeIsBlocked,
  requestDeleteCompany,
  requestUserDetails,
} from './utils/functions';
import { ModalEditCompanyAndOwner } from './utils/modals/ModalEditCompanyAndOwner';
import { ModalBuildingAccessHistories } from './utils/modals/ModalBuildingAccessHistories';

export const CompanyDetails = () => {
  // UTILS
  const [loading, setLoading] = useState<boolean>(true);
  const [onQuery, setOnQuery] = useState<boolean>(false);
  const navigate = useNavigate();
  const { companyId } = useParams();

  // CONSTS
  const [company, setCompany] = useState<ICompany>();
  const [modalEditCompanyAndOwnerIsOpen, setModalEditCompanyAndOwnerIsOpen] =
    useState<boolean>(false);

  const [modalBuildingAccessHistories, setModalBuildingAccessHistories] = useState<boolean>(false);

  const { search } = window.location;

  useEffect(() => {
    requestUserDetails({ companyId: companyId!, setCompany, setLoading });
  }, []);

  return (
    <>
      {modalEditCompanyAndOwnerIsOpen && company && (
        <ModalEditCompanyAndOwner
          company={company}
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

      {!loading && (
        <>
          <Style.Header>
            <h2>Detalhes de usuário</h2>
          </Style.Header>

          <ReturnButton path={`/companies${search}`} />
          <Style.CardSection>
            <Style.Card>
              <h6>Logo</h6>
              <Image img={company?.image} size="80px" />
            </Style.Card>

            <Style.Card>
              <h6>Nome do responsável</h6>
              <p className="p2">{company?.UserCompanies[0].User.name}</p>
            </Style.Card>

            <Style.Card>
              <h6>E-mail</h6>
              <p className="p2">{company?.UserCompanies[0].User.email}</p>
            </Style.Card>

            <Style.Card>
              <h6>Nome da empresa</h6>
              <p className="p2">{company?.name}</p>
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
                {company?.UserCompanies[0].User.lastAccess
                  ? dateTimeFormatter(company?.UserCompanies[0].User.lastAccess)
                  : '-'}
              </p>
            </Style.Card>

            <Style.Card>
              <h6>Frequência de notificações</h6>
              <p className="p2">{company?.isNotifyingOnceAWeek ? 'Semanalmente' : 'Diariamente'}</p>
            </Style.Card>
          </Style.CardSection>

          <Style.Footer disabled={onQuery}>
            <IconButton
              disabled={onQuery}
              hideLabelOnMedia
              icon={icon.count}
              label="Contagem"
              onClick={() => {
                setModalBuildingAccessHistories(true);
              }}
            />

            <IconButton
              disabled={onQuery}
              hideLabelOnMedia
              icon={icon.access}
              label="Acessar"
              onClick={() => {
                window.open(
                  `${
                    import.meta.env.VITE_COMPANY_URL ?? 'http://localhost:3000/account'
                  }?backofficeToken=${localStorage.getItem('authToken')}&userId=${
                    company?.UserCompanies[0].User.id
                  }
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
              onClick={() => {
                setModalEditCompanyAndOwnerIsOpen(true);
              }}
            />
          </Style.Footer>
        </>
      )}
    </>
  );
};
