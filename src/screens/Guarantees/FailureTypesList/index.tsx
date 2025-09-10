// REACT
import { useEffect, useState } from 'react';

// SERVICES
import { getGuaranteeFailureTypes } from '@services/apis/getGuaranteeFailureTypes';
import { createGuaranteeFailureTypes } from '@services/apis/createGuaranteeFailureTypes';
import { updateGuaranteeFailureType } from '@services/apis/updateGuaranteeFailureType';
import { deleteGuaranteeFailureType } from '@services/apis/deleteGuaranteeFailureType';

// GLOBAL COMPONENTS
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';
import { IconButton } from '@components/Buttons/IconButton';
import { ColorfulTable, ColorfulTableContent } from '@components/ColorfulTable';
import TableCell from '@components/TableCell';

// GLOBAL UTILS
// import { handleTranslate } from '@utils/handleTranslate';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// GLOBAL TYPES
import type { IGuaranteeFailureType } from '@customTypes/IGuaranteeFailureType';

// COMPONENTS
import { ModalCreateFailureType } from './components/ModalCreateFailureType';
import { ModalEditFailureType } from './components/ModalEditFailureType';

// STYLES
import * as Style from './styles';

interface IExtendedFailureType extends IGuaranteeFailureType {
  _count: {
    guaranteeToFailureTypes: number;
  };
}

export const FailureTypesList = () => {
  const [failureTypes, setFailureTypes] = useState<IExtendedFailureType[]>([]);
  const [failureTypesForSearch, setFailureTypesForSearch] = useState<IExtendedFailureType[]>([]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [modalCreateFailureType, setModalCreateFailureType] = useState(false);
  const [modalEditFailureType, setModalEditFailureType] = useState(false);

  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleModalCreateFailureType = (modalState: boolean) => {
    setModalCreateFailureType(modalState);
  };

  const handleModalEditFailureType = (modalState: boolean) => {
    setModalEditFailureType(modalState);
  };

  const handleSelectedIndex = (index: number) => {
    setSelectedIndex(index);
  };

  const handleSearch = (value: string) => {
    if (value !== '') {
      const newFailureTypes = failureTypes.filter((failureType) =>
        failureType?.name?.toLowerCase().includes(value?.toLowerCase().trim() || ''),
      );

      setFailureTypesForSearch(newFailureTypes);
    } else {
      setFailureTypesForSearch(failureTypes);
    }
  };

  // #region api
  const handleGetGuaranteeFailureTypes = async () => {
    setLoading(true);

    try {
      const responseData = await getGuaranteeFailureTypes({
        companyId: [],
      });

      setFailureTypes(responseData?.failureTypes || []);
      setFailureTypesForSearch(responseData?.failureTypes || []);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGuaranteeFailureType = async (values: { failureTypes: string | string[] }) => {
    setLoading(true);

    try {
      await createGuaranteeFailureTypes(values);

      setRefresh(!refresh);
      handleModalCreateFailureType(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEditGuaranteeFailureType = async (id: string, values: { name: string }) => {
    setLoading(true);

    try {
      await updateGuaranteeFailureType(id, values);

      setRefresh(!refresh);
      handleModalEditFailureType(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGuaranteeFailureType = async (id: string) => {
    setLoading(true);

    try {
      await deleteGuaranteeFailureType(id);
      setRefresh(!refresh);
    } finally {
      setLoading(false);
    }
  };
  // #endregion

  useEffect(() => {
    handleGetGuaranteeFailureTypes();
  }, [refresh]);

  return (
    <>
      {modalCreateFailureType && (
        <ModalCreateFailureType
          loading={loading}
          handleCreateGuaranteeFailureType={handleCreateGuaranteeFailureType}
          handleModalCreateFailureType={handleModalCreateFailureType}
        />
      )}

      {modalEditFailureType && (
        <ModalEditFailureType
          failureType={failureTypes[selectedIndex]}
          loading={loading}
          handleEditGuaranteeFailureType={handleEditGuaranteeFailureType}
          handleModalEditFailureType={handleModalEditFailureType}
        />
      )}

      {loading ? (
        <DotSpinLoading />
      ) : (
        <Style.Container>
          <Style.HeaderContainer>
            <Style.TitleContainer>
              <h2>Tipos de falha</h2>

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
              onClick={() => handleModalCreateFailureType(true)}
            />
          </Style.HeaderContainer>

          <ColorfulTable
            colsHeader={[
              { label: '#', cssProps: { width: '1%' } },
              { label: 'Nome' },
              { label: 'Usada em', cssProps: { width: '1%', textAlign: 'center' } },
              { label: 'Criada em', cssProps: { width: '1%', textAlign: 'center' } },
              { label: 'Atualizada em', cssProps: { width: '1%', textAlign: 'center' } },
              { label: 'Ações', cssProps: { width: '1%', textAlign: 'center' } },
            ]}
          >
            {failureTypesForSearch.length === 0 && !loading && (
              <ColorfulTableContent
                colsBody={[
                  {
                    colSpan: 7,
                    cell: (
                      <Style.EmptyContainer>
                        <h4>Nenhum tipo de falha encontrado</h4>
                      </Style.EmptyContainer>
                    ),
                  },
                ]}
              />
            )}

            {failureTypesForSearch.length > 0 &&
              !loading &&
              failureTypesForSearch.map((item) => (
                <ColorfulTableContent
                  key={item.id}
                  colsBody={[
                    {
                      cell: (
                        <TableCell
                          type="string"
                          value={
                            failureTypes.indexOf(item) + 1 > 9
                              ? failureTypes.indexOf(item) + 1
                              : `0${failureTypes.indexOf(item) + 1}`
                          }
                        />
                      ),
                    },
                    { cell: <TableCell type="string" value={item.name || ''} /> },
                    {
                      cell: (
                        <TableCell
                          type="string"
                          // eslint-disable-next-line no-underscore-dangle
                          value={item?._count?.guaranteeToFailureTypes || ''}
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
                              handleSelectedIndex(failureTypes.indexOf(item));
                              handleModalEditFailureType(true);
                            }}
                          />

                          <IconButton
                            icon={icon.trashWithBg}
                            size="16px"
                            hideLabelOnMedia
                            onClick={() => handleDeleteGuaranteeFailureType(item.id || '')}
                          />
                        </Style.TableButtons>
                      ),
                    },
                  ]}
                />
              ))}
          </ColorfulTable>
        </Style.Container>
      )}
    </>
  );
};
