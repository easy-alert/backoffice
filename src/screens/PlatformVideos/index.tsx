// REACT
import { useEffect, useState } from 'react';

// SERVICES
import { getPlatformVideos } from '@services/apis/getPlatformVideos';
import { createPlatformVideo } from '@services/apis/createPlatformVideo';
import { updatePlatformVideo } from '@services/apis/updatePlatformVideo';
import { deletePlatformVideo } from '@services/apis/deletePlatformVideo';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// GLOBAL COMPONENTS
import { IconButton } from '@components/Buttons/IconButton';
import { IFrameModal } from '@components/IFrameModal/IFrameModal';
import { PopoverButton } from '@components/Buttons/PopoverButton';
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';

// GLOBAL UTILS
import { catchHandler } from '@utils/functions';

// GLOBAL TYPES
import type { IPlatformVideo } from '@customTypes/IPlatformVideo';

// COMPONENTS
import { ModalCreatePlatformVideo } from './ModalCreatePlatformVideo';
import { ModalEditPlatformVideo } from './ModalEditPlatformVideo';

// STYLES
import * as Style from './styles';

export const PlatformVideos = () => {
  const [platformVideos, setPlatformVideos] = useState<IPlatformVideo[]>([]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [modalCreatePlatformVideo, setModalCreatePlatformVideo] = useState(false);
  const [modalEditTutorialModal, setModalEditTutorialModal] = useState(false);
  const [iFrameModal, setIFrameModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleModalCreatePlatformVideo = (modalState: boolean) => {
    setModalCreatePlatformVideo(modalState);
  };

  const handleModalEditTutorialModal = (modalState: boolean) => {
    setModalEditTutorialModal(modalState);
  };

  const handleIFrameModal = (modalState: boolean) => {
    setIFrameModal(modalState);
  };

  const handleSelectedIndex = (index: number) => {
    setSelectedIndex(index);
  };

  // #region api
  const handleGetPlatformVideos = async () => {
    setLoading(true);

    try {
      const responseData = await getPlatformVideos();

      setPlatformVideos(responseData.platformVideos);
    } catch (error) {
      catchHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlatformVideo = async (values: IPlatformVideo) => {
    setLoading(true);

    try {
      await createPlatformVideo(values);

      setRefresh(!refresh);
      handleModalCreatePlatformVideo(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPlatformVideo = async (id: string, values: IPlatformVideo) => {
    setLoading(true);

    try {
      await updatePlatformVideo(id, values);

      setRefresh(!refresh);
      handleModalEditTutorialModal(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlatformVideo = async (id: string) => {
    setLoading(true);

    try {
      await deletePlatformVideo(id);
      setRefresh(!refresh);
    } finally {
      setLoading(false);
    }
  };
  // #endregion

  useEffect(() => {
    handleGetPlatformVideos();
  }, [refresh]);

  return (
    <>
      {iFrameModal && selectedIndex !== null && (
        <IFrameModal
          name={platformVideos[selectedIndex].title || ''}
          link={platformVideos[selectedIndex].url || ''}
          handleIFrameModal={handleIFrameModal}
        />
      )}

      {modalCreatePlatformVideo && (
        <ModalCreatePlatformVideo
          loading={loading}
          handleCreatePlatformVideo={handleCreatePlatformVideo}
          handleModalCreatePlatformVideo={handleModalCreatePlatformVideo}
        />
      )}

      {modalEditTutorialModal && (
        <ModalEditPlatformVideo
          platformVideo={platformVideos[selectedIndex]}
          loading={loading}
          handleEditPlatformVideo={handleEditPlatformVideo}
          handleModalEditTutorialModal={handleModalEditTutorialModal}
        />
      )}

      <Style.Container>
        <Style.HeaderContainer>
          <h2>Vídeos</h2>

          <IconButton
            icon={icon.plus}
            label="Adicionar"
            onClick={() => handleModalCreatePlatformVideo(true)}
          />
        </Style.HeaderContainer>

        {loading && <DotSpinLoading />}

        {!loading && (
          <Style.Wrapper>
            {platformVideos.length === 0 && (
              <Style.EmptyContainer>
                <h4>Nenhum vídeo encontrado</h4>
              </Style.EmptyContainer>
            )}

            {platformVideos.map((platformVideo, index) => (
              <Style.Card key={platformVideo.id}>
                <Style.CardHeader>
                  <h5>{platformVideo.title}</h5>

                  <Style.CardHeaderButtons>
                    <IconButton
                      icon={icon.editWithBg}
                      onClick={() => {
                        handleSelectedIndex(index);
                        handleModalEditTutorialModal(true);
                      }}
                    />

                    <PopoverButton
                      label="Excluir"
                      buttonIcon={icon.trashWithPrimaryBg}
                      hiddenIconButtonLabel
                      type="IconButton"
                      message={{
                        title: 'Tem certeza que deseja excluir este tutorial?',
                        content: '',
                      }}
                      actionButtonClick={() => handleDeletePlatformVideo(platformVideo.id || '')}
                    />
                  </Style.CardHeaderButtons>
                </Style.CardHeader>

                <Style.CardImageContainer
                  onClick={() => {
                    handleSelectedIndex(index);
                    handleIFrameModal(true);
                  }}
                >
                  <img alt="" src={platformVideo.thumbnail} />
                </Style.CardImageContainer>

                <p>
                  {platformVideo.type} - {platformVideo.status} - {platformVideo.order}
                </p>
              </Style.Card>
            ))}
          </Style.Wrapper>
        )}
      </Style.Container>
    </>
  );
};
