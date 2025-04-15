/* eslint-disable no-shadow */
import { useEffect, useState } from 'react';

// LIBS
import { useNavigate, useSearchParams } from 'react-router-dom';

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

// STYLES
import * as Style from './styles';

// TYPES
interface IBuilding {
  id: string;
  name: string;
  address?: string;
  createdAt?: string;
  isActive?: boolean;
}

// MOCK
const mockBuildings: IBuilding[] = [
  {
    id: '1',
    name: 'Edifício Central',
    address: 'Rua das Flores, 123',
    createdAt: '2024-04-01T10:00:00Z',
    isActive: true,
  },
  {
    id: '2',
    name: 'Residencial Bela Vista',
    address: 'Av. Brasil, 456',
    createdAt: '2024-03-20T14:30:00Z',
    isActive: false,
  },
];

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

  const loadBuildings = async ({ searchPage = 1 }: { searchPage?: number }) => {
    try {
      setLoading(true);

      const filtered = mockBuildings.filter((b) =>
        b.name.toLowerCase().includes((queryFilter || filter).toLowerCase()),
      );

      const startIndex = (searchPage - 1) * offset;
      const paginated = filtered.slice(startIndex, startIndex + offset);

      setBuildings(paginated);
      setCount(filtered.length);
    } catch (error) {
      console.error('Erro ao carregar edificações:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBuildings({});
  }, [page]);

  useEffect(() => {
    if (queryPage) setPage(queryPage);
    if (queryFilter) setFilter(queryFilter);

    loadBuildings({});
  }, []);

  if (loading) return <DotSpinLoading />;

  return (
    <div>
      <Style.Header>
        <Style.LeftSide>
          <h2>Edificações</h2>

          <Style.SearchField>
            <IconButton
              icon={icon.search}
              size="16px"
              onClick={() => {
                loadBuildings({ searchPage: 1 });
              }}
            />
            <input
              type="text"
              placeholder="Procurar"
              value={filter}
              onChange={(evt) => {
                setFilter(evt.target.value);
              }}
              onBlur={() => {
                loadBuildings({ searchPage: 1 });
              }}
              onKeyUp={(evt) => {
                if (evt.key === 'Enter') {
                  loadBuildings({ searchPage: 1 });
                }
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
                cssProps: { paddingLeft: theme.size.xsm },
              },
              {
                label: 'Data de criação',
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
                        img={icon.paper || icon.personPlaceholder}
                        key={building.id}
                      />
                    ),
                    cssProps: { width: '5%' },
                  },
                  {
                    cell: building.name,
                    cssProps: {
                      width: '30%',
                      paddingLeft: theme.size.xsm,
                      paddingRight: theme.size.sm,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      maxWidth: '160px',
                    },
                  },
                  {
                    cell: building.address ?? 'Não informado',
                    cssProps: {
                      width: '30%',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    },
                  },
                  {
                    cell: building.createdAt ? dateTimeFormatter(building.createdAt) : '-',
                    cssProps: {
                      width: '20%',
                    },
                  },
                  {
                    cell: <Tag isInvalid={!building.isActive} key={building.id} />,
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
                loadBuildings({ searchPage: page });
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
