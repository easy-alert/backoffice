// REACT
import { useEffect, useState } from 'react';

// SERVICES
import { createTutorial } from '@services/apis/createTutorial';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// GLOBAL COMPONENTS
import { IconButton } from '@components/Buttons/IconButton';
import { IFrameModal } from '@components/IFrameModal/IFrameModal';

// GLOBAL UTILS
import { catchHandler } from '@utils/functions';

// GLOBAL TYPES
import type { ITutorial } from '@customTypes/ITutorial';

// COMPONENTS
import { getTutorials } from '@services/apis/getTutorials';
import { CreateTutorialModal } from './CreateTutorialModal';

// STYLES
import * as Style from './styles';

export const Tutorials = () => {
  const [tutorials, setTutorials] = useState<ITutorial[]>([]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [createTutorialModal, setCreateTutorialModal] = useState(false);
  const [iFrameModal, setIFrameModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleCreateTutorialModal = (modalState: boolean) => {
    setCreateTutorialModal(modalState);
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

  useEffect(() => {
    handleGetTutorials();
  }, []);

  return (
    <>
      {iFrameModal && !selectedIndex && (
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

      <Style.Container>
        <Style.HeaderContainer>
          <h2>Tutoriais</h2>

          <IconButton
            icon={icon.plus}
            label="Adicionar"
            onClick={() => handleCreateTutorialModal(true)}
          />
        </Style.HeaderContainer>

        <Style.Wrapper>
          {tutorials.map((tutorial, index) => (
            <Style.Card
              key={tutorial.url}
              onClick={() => {
                handleSelectedIndex(index);
                handleIFrameModal(true);
              }}
            >
              <h5>{tutorial.title}</h5>
              <img alt="" src={tutorial.thumbnail} />
            </Style.Card>
          ))}
        </Style.Wrapper>
      </Style.Container>
    </>
  );
};
