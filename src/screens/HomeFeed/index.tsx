// REACT
import { useEffect, useState } from 'react';

// SERVICES
import { getFeedItems } from '@services/apis/getFeedItems';
import { createFeedItem } from '@services/apis/createFeedItem';
import { updateFeedItem } from '@services/apis/updateFeedItem';
import { deleteFeedItem } from '@services/apis/deleteFeedItem';

// GLOBAL COMPONENTS
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';
import { IconButton } from '@components/Buttons/IconButton';
import { ColorfulTable, ColorfulTableContent } from '@components/ColorfulTable';
import TableCell from '@components/TableCell';

// GLOBAL UTILS
import { handleTranslate } from '@utils/handleTranslate';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// GLOBAL TYPES
import type { IFeedItem } from '@customTypes/IFeedItem';

// COMPONENTS
import { ModalCreateFeedItem } from './ModalCreateFeedItem';

// STYLES
import * as Style from './styles';
import { ModalEditFeedItem } from './ModalEditFeedItem';

export const HomeFeed = () => {
  const [feedItems, setFeedItems] = useState<IFeedItem[]>([]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [modalCreateFeedItem, setModalCreateFeedItem] = useState(false);
  const [modalEditFeedItem, setModalEditFeedItem] = useState(false);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleModalCreateFeedItem = (modalState: boolean) => {
    setModalCreateFeedItem(modalState);
  };

  const handleModalEditFeedItem = (modalState: boolean) => {
    setModalEditFeedItem(modalState);
  };

  const handleSelectedIndex = (index: number) => {
    setSelectedIndex(index);
  };

  // #region api
  const handleGetFeedItems = async () => {
    setLoading(true);

    try {
      const responseData = await getFeedItems();

      setFeedItems(responseData.feedItems);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFeedItem = async (values: IFeedItem) => {
    setLoading(true);

    try {
      await createFeedItem(values);

      setRefresh(!refresh);
      handleModalCreateFeedItem(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEditFeedItem = async (id: string, values: IFeedItem) => {
    setLoading(true);

    try {
      await updateFeedItem(id, values);

      setRefresh(!refresh);
      handleModalEditFeedItem(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFeedItem = async (id: string) => {
    setLoading(true);

    try {
      await deleteFeedItem(id);
      setRefresh(!refresh);
    } finally {
      setLoading(false);
    }
  };
  // #endregion

  useEffect(() => {
    handleGetFeedItems();
  }, [refresh]);

  return (
    <>
      {modalCreateFeedItem && (
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
      )}

      <Style.Container>
        <Style.HeaderContainer>
          <h2>Notícias</h2>

          <IconButton
            icon={icon.plus}
            label="Adicionar"
            onClick={() => handleModalCreateFeedItem(true)}
          />
        </Style.HeaderContainer>

        {loading && <DotSpinLoading />}

        <ColorfulTable
          colsHeader={[
            { label: 'Título' },
            { label: 'Descrição' },
            { label: 'Tipo', cssProps: { width: '1%' } },
            { label: 'Início', cssProps: { width: '100px', textAlign: 'center' } },
            { label: 'Fim', cssProps: { width: '100px', textAlign: 'center' } },
            { label: 'Fixado', cssProps: { width: '1%', textAlign: 'center' } },
            { label: 'Ações', cssProps: { width: '1%', textAlign: 'center' } },
          ]}
        >
          {feedItems.length === 0 && !loading && (
            <ColorfulTableContent
              colsBody={[
                {
                  colSpan: 7,
                  cell: (
                    <Style.EmptyContainer>
                      <h4>Nenhuma notícia encontrada</h4>
                    </Style.EmptyContainer>
                  ),
                },
              ]}
            />
          )}

          {feedItems.length > 0 &&
            !loading &&
            feedItems.map((item) => (
              <ColorfulTableContent
                key={item.id}
                colsBody={[
                  { cell: <TableCell type="string" value={item.title || ''} /> },
                  {
                    cell: (
                      <TableCell
                        type="string"
                        value={item.description || ''}
                        style={{
                          textOverflow: 'ellipsis',
                          whiteSpace: 'break-spaces',
                        }}
                      />
                    ),
                  },
                  { cell: <TableCell type="string" value={handleTranslate(item.type || '')} /> },
                  {
                    cell: <TableCell value={item.startsAt} type="date" alignItems="center" />,
                  },
                  {
                    cell: <TableCell value={item.expiresAt} type="date" alignItems="center" />,
                  },
                  {
                    cell: <TableCell value={item.isPinned ? 'Sim' : 'Não'} />,
                  },
                  {
                    cell: (
                      <Style.TableButtons>
                        <IconButton
                          icon={icon.editWithBg}
                          size="16px"
                          hideLabelOnMedia
                          onClick={() => {
                            handleSelectedIndex(feedItems.indexOf(item));
                            handleModalEditFeedItem(true);
                          }}
                        />

                        <IconButton
                          icon={icon.trashWithBg}
                          size="16px"
                          hideLabelOnMedia
                          onClick={() => handleDeleteFeedItem(item.id || '')}
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
