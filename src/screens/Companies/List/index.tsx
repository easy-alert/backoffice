/* eslint-disable no-shadow */
// LIBS
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// COMPONENTS
import { IconButton } from '../../../components/Buttons/IconButton';
import { Image } from '../../../components/Image';
import { Tag } from '../../../components/Tag';
import { Table, TableContent } from '../../../components/Table';
import { icon } from '../../../assets/icons/index';
import { Pagination } from '../../../components/Pagination';
import { DotSpinLoading } from '../../../components/Loadings/DotSpinLoading';

// STYLES
import * as Style from './styles';
import { theme } from '../../../styles/theme';

// TYPES
import { ICompany } from './utils/types';

// FUNCTIONS
import { requestUsersList } from './utils/functions';
import { dateTimeFormatter } from '../../../utils/functions';

// MODALS
import { ModalCreateCompanyAndOwner } from './utils/modals/ModalCreateCompanyAndOwner';

const flagColors: Record<string, string> = {
  red: '#e74c3c',
  yellow: '#f1c40f',
  green: '#2ecc71',
  gray: '#bdc3c7',
};

export const CompaniesList = () => {
  // UTILS
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  // FILTER
  const [filter, setFilter] = useState<string>('');

  // PAGINATION
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const offset = 20;

  // CONSTS
  const [companies, setCompanies] = useState<ICompany[] | null>(null);

  const [modalCreateCompanyAndOwnerIsOpen, setModalCreateCompanyAndOwnerIsOpen] =
    useState<boolean>(false);

  const [search] = useSearchParams();
  const queryPage = Number(search.get('page'));
  const queryFilter = search.get('filter');

  const getFlagColor = useCallback((flag?: string) => flagColors[flag ?? 'green'], [flagColors]);

  useEffect(() => {
    if (queryPage) setPage(queryPage);
    if (queryFilter) setFilter(queryFilter);

    requestUsersList({
      page: queryPage || page,
      filter: queryFilter || filter,
      setCompanies,
      setLoading,
      setCount,
    });
  }, []);

  return (
    <>
      {modalCreateCompanyAndOwnerIsOpen && (
        <ModalCreateCompanyAndOwner
          setCompanies={setCompanies}
          page={page}
          setCount={setCount}
          setModal={setModalCreateCompanyAndOwnerIsOpen}
        />
      )}

      {loading ? (
        <DotSpinLoading />
      ) : (
        <>
          <Style.Header>
            <Style.LeftSide>
              <h2>Empresas</h2>

              <Style.SearchField>
                <IconButton
                  icon={icon.search}
                  size="16px"
                  onClick={() => {
                    requestUsersList({
                      setCompanies,
                      page: 1,
                      setCount,
                      filter,
                      setPage,
                    });
                  }}
                />
                <input
                  type="text"
                  placeholder="Procurar"
                  value={filter}
                  onChange={(evt) => {
                    setFilter(evt.target.value);
                    if (evt.target.value === '') {
                      requestUsersList({
                        setCompanies,
                        page: 1,
                        setCount,
                        filter: '',
                        setPage,
                      });
                    }
                  }}
                  onKeyUp={(evt) => {
                    if (evt.key === 'Enter') {
                      requestUsersList({
                        setCompanies,
                        page: 1,
                        setCount,
                        filter,
                        setPage,
                      });
                    }
                  }}
                />
              </Style.SearchField>
            </Style.LeftSide>
            <IconButton
              hideLabelOnMedia
              fontWeight="500"
              label="Cadastrar"
              className="p2"
              icon={icon.plusWithBg}
              onClick={() => {
                setModalCreateCompanyAndOwnerIsOpen(true);
              }}
            />
          </Style.Header>

          {companies?.length ? (
            <Style.Content>
              <Table
                colsHeader={[
                  { label: '' },
                  {
                    label: 'Nome',
                    cssProps: {
                      paddingLeft: theme.size.xsm,
                    },
                  },
                  {
                    label: 'Tipo de usuário',
                  },
                  {
                    label: 'Responsável',
                    cssProps: {
                      paddingRight: theme.size.sm,
                    },
                  },
                  { label: 'Último acesso' },
                  { label: 'Status' },
                  { label: 'Atividade' },
                ]}
              >
                {companies.map((company) => (
                  <TableContent
                    onClick={() => {
                      navigate(`/companies/${company.id}?page=${page}&filter=${filter}`);
                    }}
                    key={company.id}
                    colsBody={[
                      {
                        cell: <Image size="32px" img={company.image} key={company.id} />,
                        cssProps: { width: '1%' },
                      },
                      {
                        cell: company.name,
                        cssProps: {
                          width: '30%',
                          paddingLeft: theme.size.xsm,
                          paddingRight: theme.size.sm,
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          maxWidth: '300px',
                        },
                      },
                      {
                        cell: company.clientType ?? '',
                        cssProps: { width: '15%' },
                      },
                      {
                        cell: company?.UserCompanies[0]?.User.name,
                        cssProps: {
                          width: '30%',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          maxWidth: '300px',
                          paddingRight: theme.size.sm,
                        },
                      },
                      {
                        cell: company?.UserCompanies[0]?.User.lastAccess
                          ? dateTimeFormatter(company.UserCompanies[0].User.lastAccess)
                          : '-',
                        cssProps: { width: '25%' },
                      },
                      {
                        cell: <Tag isInvalid={company.isBlocked} key={company.id} />,
                        cssProps: { width: '30%' },
                      },
                      {
                        cell: (
                          <span
                            style={{
                              display: 'inline-block',
                              width: 16,
                              height: 16,
                              borderRadius: '50%',
                              background: getFlagColor(company.maintenanceFlag),
                            }}
                          />
                        ),
                        cssProps: { width: '5%', textAlign: 'center' },
                      },
                      {
                        cell: <img src={icon.rightArrow} width="16px" height="16px" alt="" />,
                        cssProps: { textAlign: 'end' },
                      },
                    ]}
                  />
                ))}
              </Table>

              <Style.PaginationFooter>
                <Pagination
                  totalCountOfRegister={count}
                  currentPage={page}
                  registerPerPage={offset}
                  onPageChange={(page) => {
                    setPage(page);
                    requestUsersList({
                      setCompanies,
                      setLoading,
                      page,
                      setCount,
                      filter,
                    });
                  }}
                />
              </Style.PaginationFooter>
            </Style.Content>
          ) : (
            <Style.Container>
              <Image img={icon.paper} size="80px" radius="0" />
              <h3>Nenhum usuário encontrado.</h3>
            </Style.Container>
          )}
        </>
      )}
    </>
  );
};
