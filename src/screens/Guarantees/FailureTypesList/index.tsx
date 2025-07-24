// REACT
import { useEffect, useState } from 'react';

// SERVICES
import { getGuaranteeFailureTypes } from '@services/apis/getGuaranteeFailureTypes';

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
// import { ModalEditFeedItem } from './ModalEditFeedItem';
// import { ModalCreateFeedItem } from './ModalCreateFeedItem';

// STYLES
import { dateTimeFormatter } from '@utils/functions';
import * as Style from './styles';

export const FailureTypesList = () => {
  const [failureTypes, setFailureTypes] = useState<IGuaranteeFailureType[]>([]);

  // const [selectedIndex, setSelectedIndex] = useState(0);

  // const [modalCreateFeedItem, setModalCreateFeedItem] = useState(false);
  // const [modalEditFeedItem, setModalEditFeedItem] = useState(false);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);


  // const handleModalCreateFeedItem = (modalState: boolean) => {
  //   setModalCreateFeedItem(modalState);
  // };

  // const handleModalEditFeedItem = (modalState: boolean) => {
  //   setModalEditFeedItem(modalState);
  // };

  // const handleSelectedIndex = (index: number) => {
  //   setSelectedIndex(index);
  // };

  // #region api
  const handleGetGuaranteeFailureTypes = async () => {
    setLoading(true);

    try {
      const responseData = await getGuaranteeFailureTypes({
        companyId: [],
      });

      setFailureTypes(responseData.failureTypes);
    } finally {
      setLoading(false);
    }
  };

  // const handleCreateFeedItem = async (values: IFeedItem) => {
  //   setLoading(true);

  //   try {
  //     await createFeedItem(values);

  //     setRefresh(!refresh);
  //     handleModalCreateFeedItem(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleEditFeedItem = async (id: string, values: IFeedItem) => {
  //   setLoading(true);

  //   try {
  //     await updateFeedItem(id, values);

  //     setRefresh(!refresh);
  //     handleModalEditFeedItem(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleDeleteFeedItem = async (id: string) => {
  //   setLoading(true);

  //   try {
  //     await deleteFeedItem(id);
  //     setRefresh(!refresh);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // #endregion

  useEffect(() => {
    handleGetGuaranteeFailureTypes();
  }, [refresh]);

  return (
    <>
      {/* {modalCreateFeedItem && (
        <ModalCreateFeedItem
          handleCreateFeedItem={handleCreateFeedItem}
          handleModalCreateFeedItem={handleModalCreateFeedItem}
          loading={loading}
        />
      )}

      {modalEditFeedItem && (
        <ModalEditFeedItem
          feedItem={feedItems[selectedIndex]}
          handleEditFeedItem={handleEditFeedItem}
          handleModalEditFeedItem={handleModalEditFeedItem}
          loading={loading}
        />
      )} */}

      <Style.Container>
        <Style.HeaderContainer>
          <h2>Tipos de falha</h2>

          <IconButton
            icon={icon.plus}
            label="Adicionar"
            onClick={() => console.log('Adicionar')}
          />
        </Style.HeaderContainer>

        {loading && <DotSpinLoading />}

        <ColorfulTable
          colsHeader={[
            { label: 'Nome' },
            { label: 'Criado em', cssProps: { width: '1%', textAlign: 'center' } },
            { label: 'Ações', cssProps: { width: '1%', textAlign: 'center' } },
          ]}
        >
          {failureTypes.length === 0 && !loading && (
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

          {failureTypes.length > 0 &&
            !loading &&
            failureTypes.map((item) => (
              <ColorfulTableContent
                key={item.id}
                colsBody={[
                  { cell: <TableCell type="string" value={item.name || ''} /> },
                  {
                    cell: (
                      <TableCell
                        value={dateTimeFormatter(item.createdAt || '')}
                        type="date"
                        alignItems="center"
                      />
                    ),
                  },

                  // {
                  //   cell: (
                  //     <Style.TableButtons>
                  //       <IconButton
                  //         icon={icon.editWithBg}
                  //         size="16px"
                  //         hideLabelOnMedia
                  //         onClick={() => {
                  //           handleSelectedIndex(feedItems.indexOf(item));
                  //           handleModalEditFeedItem(true);
                  //         }}
                  //       />

                  //       <IconButton
                  //         icon={icon.trashWithBg}
                  //         size="16px"
                  //         hideLabelOnMedia
                  //         onClick={() => handleDeleteFeedItem(item.id || '')}
                  //       />
                  //     </Style.TableButtons>
                  //   ),
                  // },
                ]}
              />
            ))}
        </ColorfulTable>
      </Style.Container>
    </>
  );
};
