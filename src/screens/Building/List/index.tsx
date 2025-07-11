/* eslint-disable no-shadow */
// REACT
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// SERVICES
import { getBuildings } from '@services/apis/getBuildings';

// GLOBAL COMPONENTS
import { IconButton } from '@components/Buttons/IconButton';
import { Image } from '@components/Image';
import { Tag } from '@components/Tag';
import { Table, TableContent } from '@components/Table';
import { Pagination } from '@components/Pagination';
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';

// GLOBAL UTILS
import { dateTimeFormatter } from '@utils/functions';

// GLOBAL STYLES
import { theme } from '@styles/theme';

// GLOBAL ASSETS
import { icon } from '@assets/icons/index';

// GLOBAL TYPES
import type { IBuilding } from '@customTypes/IBuilding';

// STYLES
import * as Style from './styles';

export const BuildingsList = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate();

  const [buildings, setBuildings] = useState<IBuilding[]>([]);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const offset = 20;
  const queryPage = Number(search.get('page'));
  const queryFilter = search.get('filter');

  const handleGetBuildings = async ({
    searchPage,
    searchFilter,
  }: { searchPage?: number; searchFilter?: string } = {}) => {
    try {
      setLoading(true);

      const responseData = await getBuildings({
        page: searchPage ?? page,
        filter: searchFilter ?? filter,
      });

      setBuildings(responseData.buildings);
      setCount(responseData.buildingsCount);
    } catch (error) {
      console.error('Erro ao carregar edificações:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetBuildings({ searchPage: page, searchFilter: filter });
  }, [page, filter]);

  useEffect(() => {
    if (queryPage) setPage(queryPage);
    if (queryFilter) setFilter(queryFilter);

    handleGetBuildings({});
  }, []);

  if (loading) return <DotSpinLoading />;

  return (
    <div>
      <Style.Header>
        <Style.LeftSide>
          <h2>Edificações</h2>

          <Style.SearchField>
            <IconButton icon={icon.search} size="16px" onClick={() => setPage(1)} />
            <input
              type="text"
              placeholder="Procurar"
              value={filter}
              onChange={(evt) => setFilter(evt.target.value)}
              onBlur={() => setPage(1)}
              onKeyUp={(evt) => {
                if (evt.key === 'Enter') setPage(1);
              }}
            />
          </Style.SearchField>
        </Style.LeftSide>
      </Style.Header>

      {buildings?.length ? (
        <Style.Content>
          <Table
            colsHeader={[
              { label: '' },
              {
                label: 'Nome',
                cssProps: { paddingLeft: theme.size.sm },
              },
              {
                label: 'Endereço',
              },
              {
                label: 'Cidade',
              },
              {
                label: 'Último acesso',
              },
              {
                label: 'Status',
              },
            ]}
          >
            {buildings.map((building) => (
              <TableContent
                key={building.id}
                onClick={() =>
                  navigate(`/buildings/${building.id}`, {
                    state: {
                      from: '/buildings',
                      search: `?page=${page}&filter=${filter}`,
                    },
                  })
                }
                colsBody={[
                  {
                    cell: (
                      <Image
                        size="32px"
                        img={building.image || icon.personPlaceholder}
                        key={building.id}
                      />
                    ),
                    cssProps: { width: '5%' },
                  },
                  {
                    cell: building.name,
                    cssProps: {
                      width: '20%',
                      paddingLeft: theme.size.xsm,
                      paddingRight: theme.size.sm,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      maxWidth: '160px',
                    },
                  },
                  {
                    cell: building.streetName ?? 'Não informado',
                    cssProps: {
                      width: '25%',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    },
                  },
                  {
                    cell: building.city ?? 'Não informado',
                    cssProps: {
                      width: '15%',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    },
                  },
                  {
                    cell: building.createdAt ? dateTimeFormatter(building.createdAt) : '-',
                    cssProps: {
                      width: '15%',
                    },
                  },
                  {
                    cell: <Tag isInvalid={building.isBlocked} key={building.id} />,
                    cssProps: { width: '10%' },
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
              }}
            />
          </Style.PaginationFooter>
        </Style.Content>
      ) : (
        <Style.Container>
          <Image img={icon.paper} size="80px" radius="0" />
          <h3>Nenhuma edificação encontrada.</h3>
        </Style.Container>
      )}
    </div>
  );
};
