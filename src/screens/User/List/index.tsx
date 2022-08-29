// LIBS
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// COMPONENTS
import * as Style from './styles';
import { IconButton } from '../../../components/Buttons/IconButton';
import { Image } from '../../../components/Image';
import { Tag } from '../../../components/Tag';
import { Table, TableContent } from '../../../components/Table';
import { icon } from '../../../assets/icons/index';
import { Pagination } from '../../../components/Pagination';
import { DotSpinLoading } from '../../../components/Loadings/DotSpinLoading';

// TYPES
import { IUser } from '../../../types/types';

// MODALS
import { modalCreateUser } from './utils/modals/ModalCreateUser';

// FUNCTIONS
import { requestUsersList } from './utils/functions';
import { DateFormatter } from '../../../utils/functions';

// THEMES
import { theme } from '../../../styles/theme';

export const UsersList = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [users, setUsers] = useState<IUser[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('');

  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const offset = 20;

  useEffect(() => {
    requestUsersList({
      setUsers,
      setLoading,
      page,
      setCount,
    });
  }, [state]);

  const { ModalCreateUser, toggleModalCreateUser, modalCreateUserIsOpen } =
    modalCreateUser();

  return (
    <>
      {modalCreateUserIsOpen && (
        <ModalCreateUser setUsers={setUsers} page={page} setCount={setCount} />
      )}

      {loading ? (
        <DotSpinLoading />
      ) : (
        <>
          <Style.Header>
            <Style.LeftSide>
              <h2>Usuários</h2>

              <Style.SearchField>
                <IconButton
                  icon={icon.search}
                  size="16px"
                  onClick={() => {
                    requestUsersList({
                      setUsers,
                      page: 1,
                      setCount,
                      filter,
                      setPage,
                    });
                  }}
                />
                <input
                  type="text"
                  maxLength={40}
                  placeholder="Procurar"
                  value={filter}
                  onChange={(evt) => {
                    setFilter(evt.target.value);
                    if (evt.target.value === '') {
                      requestUsersList({
                        setUsers,
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
                        setUsers,
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
                toggleModalCreateUser();
              }}
            />
          </Style.Header>

          {users?.length ? (
            <>
              <Table
                colsHeader={[
                  { label: '' },
                  {
                    label: 'Nome',
                    cssProps: { paddingLeft: theme.size.xsm },
                  },
                  { label: 'Último acesso' },
                  { label: 'Status' },
                ]}
              >
                {users.map((user) => (
                  <TableContent
                    onClick={() => {
                      navigate(`/users/${user.id}`, { state: user });
                    }}
                    key={user.id}
                    colsBody={[
                      {
                        cell: (
                          <Image size="32px" img={user.image} key={user.id} />
                        ),
                        cssProps: { width: '1%' },
                      },
                      {
                        cell: user.name,
                        cssProps: {
                          width: '30%',
                          paddingLeft: theme.size.xsm,
                          paddingRight: theme.size.sm,
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          maxWidth: '150px',
                        },
                      },

                      {
                        cell: user.lastAccess
                          ? DateFormatter(user.lastAccess)
                          : '-',
                        cssProps: { width: '25%' },
                      },
                      {
                        cell: <Tag isInvalid={user.isBlocked} key={user.id} />,
                        cssProps: { width: '30%' },
                      },
                      {
                        cell: (
                          <img
                            src={icon.rightArrow}
                            width="16px"
                            height="16px"
                            alt=""
                          />
                        ),
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
                  // eslint-disable-next-line no-shadow
                  onPageChange={(page) => {
                    setPage(page);
                    requestUsersList({
                      setUsers,
                      setLoading,
                      page,
                      setCount,
                      filter,
                    });
                  }}
                />
              </Style.PaginationFooter>
            </>
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
