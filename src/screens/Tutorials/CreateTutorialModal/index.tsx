// LIBS
import { Form, Formik } from 'formik';
import * as yup from 'yup';

// global COMPONENTS
import { FormikInput } from '@components/Form/FormikInput';
import { Button } from '@components/Buttons/Button';
import { Modal } from '@components/Modal';

// GLOBAL TYPES
import type { ITutorial } from '@customTypes/ITutorial';

// styles
import * as Style from './styles';

interface ICreateTutorialModal {
  loading: boolean;
  handleCreateTutorial: (values: ITutorial) => void;
  handleCreateTutorialModal: (modalState: boolean) => void;
}

export const CreateTutorialModal = ({
  loading,
  handleCreateTutorial,
  handleCreateTutorialModal,
}: ICreateTutorialModal) => {
  const createTutorialSchema = yup.object().shape({
    title: yup.string().required('Campo obrigatório'),
    description: yup.string(),
    url: yup.string().required('Campo obrigatório'),
    type: yup.string().required('Campo obrigatório'),
    order: yup.number().required('Campo obrigatório').min(1, 'O valor mínimo é 1'),
  });

  return (
    <Modal title="Criar um tutorial" setModal={handleCreateTutorialModal}>
      <Formik
        validationSchema={createTutorialSchema}
        onSubmit={(values) => handleCreateTutorial(values)}
        initialValues={{
          id: '',
          title: '',
          description: '',
          url: '',
          thumbnail: '',
          type: 'video' as 'video' | 'document',
          order: 1,
        }}
      >
        {({ errors, values, touched }) => (
          <Style.FormContainer>
            <Form>
              <FormikInput
                label="Título do tutorial *"
                name="title"
                value={values.title}
                error={touched.title && errors.title ? errors.title : null}
                placeholder="Ex: Bem vindo à Easy Alert!"
              />

              <FormikInput
                label="Descrição"
                name="description"
                value={values.description}
                error={touched.description && errors.description ? errors.description : null}
                placeholder="Ex: Aprenda a usar a plataforma Easy Alert"
              />

              <FormikInput
                label="URL *"
                name="url"
                value={values.url}
                error={touched.url && errors.url ? errors.url : null}
                placeholder="Ex: https://youtu.be/67AWkVUWpPU"
              />

              {/* <FormikImageInput
              label="Thumbnail"
              name="thumbnail"
              value={values.thumbnail}
              error={touched.thumbnail && errors.thumbnail ? errors.thumbnail : null}
              setFieldValue={setFieldValue}
              /> */}

              {/* <FormikSelect selectPlaceholderValue={values.type} name="type" label="Tipo">
              <option value="video">Vídeo</option>
              <option value="document">Documento</option>
              </FormikSelect> */}

              <FormikInput
                label="Ordem *"
                name="order"
                type="number"
                value={values.order}
                error={touched.order && errors.order ? errors.order : null}
                placeholder="Ex: 1"
                min={1}
              />

              <Button center label="Cadastrar" type="submit" loading={loading} />
            </Form>
          </Style.FormContainer>
        )}
      </Formik>
    </Modal>
  );
};
