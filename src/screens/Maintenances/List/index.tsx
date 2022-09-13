/* eslint-disable no-alert */
// LIBS
import { useEffect, useState } from 'react';

// COMPONENTS
import * as Style from './styles';
import { IconButton } from '../../../components/Buttons/IconButton';
import { Image } from '../../../components/Image';
import { icon } from '../../../assets/icons/index';
import { Pagination } from '../../../components/Pagination';
import { DotSpinLoading } from '../../../components/Loadings/DotSpinLoading';
import { Button } from '../../../components/Buttons/Button';

// FUNCTIONS
// import { requestUsersList } from './utils/functions';
// import { DateFormatter } from '../../../utils/functions';

// THEMES

// MODALS

export const MaintenancesList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const offset = 20;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [maintenances, setMaintenances] = useState<any>();

  const [createMaintenancesIsOpen, setCreateMaintenancesIsOpen] =
    useState<boolean>(false);

  useEffect(() => {
    setMaintenances([1]);
    setCount(1);
    setLoading(false);
    // requestUsersList({
    //   setCompanies,
    //   setLoading,
    //   page,
    //   setCount,
    // });
  }, []);

  return (
    <>
      {/* {Modal} */}
      {loading ? (
        <DotSpinLoading />
      ) : (
        <>
          <Style.Header>
            <Style.LeftSide>
              <Style.HeaderTitle>
                <h2>Manutenção</h2>

                <Style.SearchField>
                  <IconButton
                    icon={icon.search}
                    size="16px"
                    onClick={() => {
                      alert('buscando');
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
                        alert('buscando');
                      }
                    }}
                    onKeyUp={(evt) => {
                      if (evt.key === 'Enter') {
                        alert('buscando');
                      }
                    }}
                  />
                </Style.SearchField>
              </Style.HeaderTitle>

              <IconButton
                hideLabelOnMedia
                fontWeight="500"
                label={
                  createMaintenancesIsOpen ? 'Cancelar' : 'Criar categoria'
                }
                className="p2"
                icon={icon.plusWithBg}
                onClick={() => {
                  setCreateMaintenancesIsOpen((prevState) => !prevState);
                }}
              />
            </Style.LeftSide>

            <Style.CreateMaintenancesContainer
              as="form"
              createMaintenancesIsOpen={createMaintenancesIsOpen}
            >
              <Style.CreateMaintenancesContent>
                {/* <Input
                  placeholder="Digite o nome da categoria"
                  maxLength={40}
                /> */}
                <Style.ButtonsMaintenancesContainer>
                  <Button label="Criar" />
                  <Button label="Excluir" borderless />
                </Style.ButtonsMaintenancesContainer>
              </Style.CreateMaintenancesContent>
            </Style.CreateMaintenancesContainer>
          </Style.Header>

          {maintenances?.length ? (
            <>
              <h1>Conteudo</h1>
              <h1>Conteudo</h1>
              <h1>Conteudo</h1>
              <h1>Conteudo</h1>

              <Style.PaginationFooter>
                <Pagination
                  totalCountOfRegister={count}
                  currentPage={page}
                  registerPerPage={offset}
                  // eslint-disable-next-line no-shadow
                  onPageChange={(page) => {
                    setPage(page);
                    alert('buscando');
                  }}
                />
              </Style.PaginationFooter>
            </>
          ) : (
            <Style.NoMaintenancesContainer>
              <Image img={icon.paper} size="80px" radius="0" />
              <h3>Nenhuma manutenção encontrada.</h3>
            </Style.NoMaintenancesContainer>
          )}
        </>
      )}
    </>
  );
};
