// REACT
import { useEffect, useState } from 'react';

// SERVICES
import { getGuaranteeSystems } from '@services/apis/getGuaranteeSystems';
import { createGuaranteeSystems } from '@services/apis/createGuaranteeSystems';
import { updateGuaranteeSystem } from '@services/apis/updateGuaranteeSystem';
import { deleteGuaranteeSystem } from '@services/apis/deleteGuaranteeSystem';

// GLOBAL COMPONENTS
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';
import { IconButton } from '@components/Buttons/IconButton';
import { ColorfulTable, ColorfulTableContent } from '@components/ColorfulTable';
import TableCell from '@components/TableCell';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// GLOBAL TYPES
import type { IGuaranteeSystem } from '@customTypes/IGuaranteeSystem';

// COMPONENTS
import { ModalCreateSystem } from './components/ModalCreateSystem';
import { ModalEditSystem } from './components/ModalEditSystem';

// STYLES
import * as Style from './styles';

interface IExtendedSystem extends IGuaranteeSystem {
  _count: {
    guarantees: number;
  };
}

export const SystemsList = () => {
  const [systems, setSystems] = useState<IExtendedSystem[]>([]);
  const [systemsForSearch, setSystemsForSearch] = useState<IExtendedSystem[]>([]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [modalCreateSystem, setModalCreateSystem] = useState(false);
  const [modalEditSystem, setModalEditSystem] = useState(false);

  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleModalCreateSystem = (modalState: boolean) => {
    setModalCreateSystem(modalState);
  };

  const handleModalEditSystem = (modalState: boolean) => {
    setModalEditSystem(modalState);
  };

  const handleSelectedIndex = (index: number) => {
    setSelectedIndex(index);
  };

  const handleSearch = (value: string) => {
    if (value !== '') {
      const newSystems = systems.filter((system) =>
        system?.name?.toLowerCase().includes(value?.toLowerCase().trim() || ''),
      );

      setSystemsForSearch(newSystems);
    } else {
      setSystemsForSearch(systems);
    }
  };

  // #region api
  const handleGetGuaranteeSystems = async () => {
    setLoading(true);

    try {
      const responseData = await getGuaranteeSystems({
        companyId: [],
      });

      setSystems(responseData?.systems || []);
      setSystemsForSearch(responseData?.systems || []);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGuaranteeSystem = async (values: { systems: string | string[] }) => {
    setLoading(true);

    try {
      await createGuaranteeSystems(values);

      setRefresh(!refresh);
      handleModalCreateSystem(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEditGuaranteeSystem = async (id: string, values: { name: string }) => {
    setLoading(true);

    try {
      await updateGuaranteeSystem(id, values);

      setRefresh(!refresh);
      handleModalEditSystem(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGuaranteeSystem = async (id: string) => {
    setLoading(true);

    try {
      await deleteGuaranteeSystem(id);
      setRefresh(!refresh);
    } finally {
      setLoading(false);
    }
  };
  // #endregion

  useEffect(() => {
    handleGetGuaranteeSystems();
  }, [refresh]);

  return (
    <>
      {modalCreateSystem && (
        <ModalCreateSystem
          loading={loading}
          handleCreateGuaranteeSystem={handleCreateGuaranteeSystem}
          handleModalCreateSystem={handleModalCreateSystem}
        />
      )}

      {modalEditSystem && (
        <ModalEditSystem
          system={systems[selectedIndex]}
          loading={loading}
          handleEditGuaranteeSystem={handleEditGuaranteeSystem}
          handleModalEditSystem={handleModalEditSystem}
        />
      )}

      <Style.Container>
        <Style.HeaderContainer>
          <Style.TitleContainer>
            <h2>Sistemas</h2>

            <Style.SearchField>
              <IconButton icon={icon.search} size="16px" onClick={() => handleSearch(search)} />

              <input
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleSearch(e.target.value);
                }}
              />
            </Style.SearchField>
          </Style.TitleContainer>

          <IconButton
            icon={icon.plus}
            label="Adicionar"
            onClick={() => handleModalCreateSystem(true)}
          />
        </Style.HeaderContainer>

        {loading && <DotSpinLoading />}

        <ColorfulTable
          colsHeader={[
            { label: '#', cssProps: { width: '1%' } },
            { label: 'Nome' },
            { label: 'Usado em', cssProps: { width: '1%', textAlign: 'center' } },
            { label: 'Criado em', cssProps: { width: '1%', textAlign: 'center' } },
            { label: 'Atualizado em', cssProps: { width: '1%', textAlign: 'center' } },
            { label: 'Ações', cssProps: { width: '1%', textAlign: 'center' } },
          ]}
        >
          {systemsForSearch.length === 0 && !loading && (
            <ColorfulTableContent
              colsBody={[
                {
                  colSpan: 7,
                  cell: (
                    <Style.EmptyContainer>
                      <h4>Nenhum sistema encontrado</h4>
                    </Style.EmptyContainer>
                  ),
                },
              ]}
            />
          )}

          {systemsForSearch.length > 0 &&
            !loading &&
            systemsForSearch.map((item) => (
              <ColorfulTableContent
                key={item.id}
                colsBody={[
                  {
                    cell: (
                      <TableCell
                        type="string"
                        value={
                          systems.indexOf(item) + 1 > 9
                            ? systems.indexOf(item) + 1
                            : `0${systems.indexOf(item) + 1}`
                        }
                      />
                    ),
                  },
                  { cell: <TableCell type="string" value={item.name || ''} /> },
                  {
                    cell: (
                      <TableCell
                        type="string"
                        value={item._count.guarantees || ''}
                        alignItems="center"
                      />
                    ),
                  },
                  {
                    cell: (
                      <TableCell type="date" value={item.createdAt || ''} alignItems="center" />
                    ),
                  },
                  {
                    cell: (
                      <TableCell type="date" value={item.updatedAt || ''} alignItems="center" />
                    ),
                  },
                  {
                    cell: (
                      <Style.TableButtons>
                        <IconButton
                          icon={icon.editWithBg}
                          size="16px"
                          hideLabelOnMedia
                          onClick={() => {
                            handleSelectedIndex(systems.indexOf(item));
                            handleModalEditSystem(true);
                          }}
                        />

                        <IconButton
                          icon={icon.trashWithBg}
                          size="16px"
                          hideLabelOnMedia
                          onClick={() => handleDeleteGuaranteeSystem(item.id || '')}
                        />
                      </Style.TableButtons>
                    ),
                  },
                ]}
              />
            ))}
        </ColorfulTable>
      </Style.Container>
    </>
  );
};
