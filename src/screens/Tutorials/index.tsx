// REACT
import { useEffect, useState } from 'react';

// SERVICES
import { getTutorials } from '@services/apis/getTutorials';
import { createTutorial } from '@services/apis/createTutorial';
import { updateTutorial } from '@services/apis/updateTutorial';
import { deleteTutorial } from '@services/apis/deleteTutorial';

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
import type { ITutorial } from '@customTypes/ITutorial';

// COMPONENTS
import ChatWidget from '@components/ChatWidget';
import { CreateTutorialModal } from './CreateTutorialModal';
import { EditTutorialModal } from './EditTutorialModal';

// STYLES
import * as Style from './styles';

export const Tutorials = () => {
  const [tutorials, setTutorials] = useState<ITutorial[]>([]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [createTutorialModal, setCreateTutorialModal] = useState(false);
  const [editTutorialModal, setEditTutorialModal] = useState(false);
  const [iFrameModal, setIFrameModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleCreateTutorialModal = (modalState: boolean) => {
    setCreateTutorialModal(modalState);
  };

  const handleEditTutorialModal = (modalState: boolean) => {
    setEditTutorialModal(modalState);
  };

  const handleIFrameModal = (modalState: boolean) => {
    setIFrameModal(modalState);
  };

  const handleSelectedIndex = (index: number) => {
    setSelectedIndex(index);
  };

  const handleGetTutorials = async () => {
    setLoading(true);

    try {
      const responseData = await getTutorials();

      setTutorials(responseData.tutorials);
    } catch (error) {
      catchHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTutorial = async (values: ITutorial) => {
    setLoading(true);

    try {
      await createTutorial(values);

      handleCreateTutorialModal(false);
    } catch (error) {
      catchHandler(error);
    } finally {
      handleGetTutorials();
      setLoading(false);
    }
  };

  const handleEditTutorial = async (id: string, values: ITutorial) => {
    setLoading(true);

    try {
      await updateTutorial(id, values);

      handleEditTutorialModal(false);
      handleGetTutorials();
    } catch (error) {
      catchHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTutorial = async (id: string) => {
    setLoading(true);

    try {
      await deleteTutorial(id);
    } catch (error) {
      catchHandler(error);
    } finally {
      handleGetTutorials();
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetTutorials();
  }, []);

  return (
    <>
      {iFrameModal && selectedIndex !== null && (
        <IFrameModal
          name={tutorials[selectedIndex].title}
          link={tutorials[selectedIndex].url}
          handleIFrameModal={handleIFrameModal}
        />
      )}

      {createTutorialModal && (
        <CreateTutorialModal
          loading={loading}
          handleCreateTutorial={handleCreateTutorial}
          handleCreateTutorialModal={handleCreateTutorialModal}
        />
      )}

      {editTutorialModal && (
        <EditTutorialModal
          tutorial={tutorials[selectedIndex]}
          loading={loading}
          handleEditTutorial={handleEditTutorial}
          handleEditTutorialModal={handleEditTutorialModal}
        />
      )}

      <Style.Container>
        <Style.HeaderContainer>
          <h2>Tutoriais</h2>

          <IconButton
            icon={icon.plus}
            label="Adicionar"
            onClick={() => handleCreateTutorialModal(true)}
          />
        </Style.HeaderContainer>

        {loading && <DotSpinLoading />}

        <ChatWidget />

        {!loading && (
          <Style.Wrapper>
            {tutorials.length === 0 && (
              <Style.EmptyContainer>
                <h4>Nenhum tutorial encontrado</h4>
              </Style.EmptyContainer>
            )}

            {tutorials.map((tutorial, index) => (
              <Style.Card key={tutorial.id}>
                <Style.CardHeader>
                  <h5>{tutorial.title}</h5>

                  <Style.CardHeaderButtons>
                    <IconButton
                      icon={icon.editWithBg}
                      onClick={() => {
                        handleSelectedIndex(index);
                        handleEditTutorialModal(true);
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
                      actionButtonClick={() => {
                        handleDeleteTutorial(tutorial.id);
                      }}
                    />
                  </Style.CardHeaderButtons>
                </Style.CardHeader>

                <Style.CardImageContainer
                  onClick={() => {
                    handleSelectedIndex(index);
                    handleIFrameModal(true);
                  }}
                >
                  <img alt="" src={tutorial.thumbnail} />
                </Style.CardImageContainer>

                <p>Ordem: {tutorial.order}</p>
              </Style.Card>
            ))}
          </Style.Wrapper>
        )}
      </Style.Container>
    </>
  );
};
