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
import { applyMask, dateTimeFormatter } from '@utils/functions';

// GLOBAL STYLES
import { theme } from '@styles/theme';

// GLOBAL ASSETS
import { icon } from '@assets/icons/index';

// UTILS
import { requestUsersList } from './utils/functions';
import { UserCreateModal } from './utils/modals';

// STYLES
import * as Style from './styles';

// TYPES
import type { IUser } from './utils/types';

export const UsersList = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate();

  const [users, setUsers] = useState<IUser[]>([]);

  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);

  const offset = 20;
  const queryPage = Number(search.get('page'));
  const queryFilter = search.get('filter');

  const loadUsers = async ({ searchPage = 1 }: { searchPage?: number }) => {
    try {
      setLoading(true);

      const responseData = await requestUsersList({
        page: searchPage || queryPage || page,
        filter: queryFilter || filter,
      });

      setUsers(responseData.users);
      setCount(responseData.usersCount);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers({});
  }, [page]);

  useEffect(() => {
    if (queryPage) setPage(queryPage);
    if (queryFilter) setFilter(queryFilter);

    loadUsers({});
  }, []);

  const formatPhoneNumber = (contactNumber: string | undefined) => {
    if (!contactNumber) return 'Não informado';
    return applyMask({ mask: 'TEL', value: contactNumber }).value;
  };

  if (loading) return <DotSpinLoading />;

  return (
    <div>
      <Style.Header>
        <Style.LeftSide>
          <h2>Usuários</h2>

          <Style.SearchField>
            <IconButton
              icon={icon.search}
              size="16px"
              onClick={() => {
                loadUsers({
                  searchPage: 1,
                });
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
                loadUsers({
                  searchPage: 1,
                });
              }}
              onKeyUp={(evt) => {
                if (evt.key === 'Enter') {
                  loadUsers({
                    searchPage: 1,
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
          onClick={() => setShowUserModal(true)}
        />
      </Style.Header>

      {showUserModal && (
        <UserCreateModal
          setModal={setShowUserModal}
          reloadUsers={() => loadUsers({ searchPage: 1 })}
        />
      )}

      {users?.length ? (
        <Style.Content>
          <Table
            colsHeader={[
              { label: '' },
              {
                label: 'Nome',
                cssProps: { paddingLeft: theme.size.sm },
              },
              {
                label: 'Telefone',
                cssProps: { paddingRight: theme.size.xsm },
              },
              {
                label: 'E-mail',
                cssProps: { paddingLeft: theme.size.xsm },
              },
              { label: 'Último acesso' },
              { label: 'Status' },
            ]}
          >
            {users?.map((user) => (
              <TableContent
                onClick={() => {
                  navigate(`/users/${user.id}`, {
                    state: {
                      from: '/users',
                      search: `?page=${page}&filter=${filter}`,
                    },
                  });
                }}
                key={user.id}
                colsBody={[
                  {
                    cell: (
                      <Image size="32px" img={user.image || icon.personPlaceholder} key={user.id} />
                    ),
                    cssProps: { width: '5%' },
                  },
                  {
                    cell: user.name,
                    cssProps: {
                      width: '25%',
                      paddingLeft: theme.size.xsm,
                      paddingRight: theme.size.sm,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      maxWidth: '100px',
                    },
                  },
                  {
                    cell: formatPhoneNumber(user.phoneNumber),
                    cssProps: {
                      width: '20%',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      maxWidth: '200px',
                      paddingRight: theme.size.xsm,
                    },
                  },
                  {
                    cell: user.email ?? 'Não informado',
                    cssProps: {
                      width: '25%',
                      paddingLeft: theme.size.xsm,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    },
                  },
                  {
                    cell: user.lastAccess ? dateTimeFormatter(user.lastAccess) : '-',
                    cssProps: { width: '15%' },
                  },
                  {
                    cell: <Tag isInvalid={user.isBlocked} key={user.id} />,
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
                loadUsers({
                  searchPage: page,
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
    </div>
  );
};
