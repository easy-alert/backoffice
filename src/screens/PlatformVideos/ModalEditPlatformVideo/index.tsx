// LIBS
import { Form, Formik } from 'formik';
import * as yup from 'yup';

// global COMPONENTS
import { FormikInput } from '@components/Form/FormikInput';
import { Button } from '@components/Buttons/Button';
import { Modal } from '@components/Modal';

// GLOBAL TYPES
import { PLATFORM_VIDEO_TYPE_VALUES } from '@customTypes/TPlatformVideoType';
import { PLATFORM_VIDEO_STATUS_VALUES } from '@customTypes/TPlatformVideoStatus';
import type { IPlatformVideo } from '@customTypes/IPlatformVideo';

// styles
import { FormikSelect } from '@components/Form/FormikSelect';
import * as Style from '../styles';

interface ICreateTutorialModal {
  platformVideo: IPlatformVideo;
  loading: boolean;
  handleEditPlatformVideo: (id: string, values: IPlatformVideo) => void;
  handleModalEditTutorialModal: (modalState: boolean) => void;
}

const editPlatformVideoSchema = yup.object().shape({
  title: yup.string().required('Título é obrigatório'),
  description: yup.string(),
  url: yup.string().url('URL inválida').required('URL é obrigatória'),
  youtubeId: yup.string().when('url', {
    is: (url: string) => url?.includes('youtube'),
    then: yup.string().required('ID do YouTube é obrigatório quando a URL é do YouTube'),
    otherwise: yup.string().notRequired(),
  }),
  thumbnail: yup.string(),
  type: yup.string().oneOf([...PLATFORM_VIDEO_TYPE_VALUES]),
  status: yup.string().oneOf([...PLATFORM_VIDEO_STATUS_VALUES]),
  order: yup.number().min(1, 'A ordem deve ser pelo menos 1').default(1),
  publishedAt: yup.date().required('Data de publicação é obrigatória'),
});

export const ModalEditPlatformVideo = ({
  platformVideo,
  loading,
  handleEditPlatformVideo,
  handleModalEditTutorialModal,
}: ICreateTutorialModal) => (
  <Modal title="Atualizar um tutorial" setModal={handleModalEditTutorialModal}>
    <Formik
      validationSchema={editPlatformVideoSchema}
      onSubmit={(values) => handleEditPlatformVideo(platformVideo.id || '', values)}
      initialValues={{
        id: platformVideo.id,
        title: platformVideo.title,
        description: platformVideo?.description,
        url: platformVideo.url,
        youtubeId: platformVideo.youtubeId,
        thumbnail: platformVideo.thumbnail,
        type: platformVideo.type,
        status: platformVideo.status,
        order: platformVideo.order,
        publishedAt: platformVideo.publishedAt?.split('T')[0] || '',
      }}
    >
      {({ errors, values, touched }) => (
        <Style.ModalFormContainer>
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

            <FormikInput
              label="ID do YouTube"
              name="youtubeId"
              value={values.youtubeId}
              error={touched.youtubeId && errors.youtubeId ? errors.youtubeId : null}
              placeholder="Ex: 67AWkVUWpPU"
            />

            <FormikInput
              label="Ordem *"
              name="order"
              type="number"
              value={values.order}
              error={touched.order && errors.order ? errors.order : null}
              placeholder="Ex: 1"
              min={1}
            />

            <FormikInput
              label="Thumbnail"
              name="thumbnail"
              value={values.thumbnail}
              error={touched.thumbnail && errors.thumbnail ? errors.thumbnail : null}
              placeholder="Ex: https://example.com/thumbnail.jpg"
            />

            <FormikSelect selectPlaceholderValue={values.type} name="type" label="Tipo">
              <option value="tutorial">Tutorial</option>
              <option value="news">Novidades</option>
              <option value="feature">Funcionalidade</option>
            </FormikSelect>

            <FormikSelect selectPlaceholderValue={values.status} name="status" label="Status">
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="archived">Arquivado</option>
            </FormikSelect>

            <FormikInput
              label="Data de publicação *"
              name="publishedAt"
              type="date"
              value={values.publishedAt}
              error={touched.publishedAt && errors.publishedAt ? errors.publishedAt : null}
              placeholder="Ex: 2023-10-01"
            />

            <Button center label="Atualizar" type="submit" loading={loading} />
          </Form>
        </Style.ModalFormContainer>
      )}
    </Formik>
  </Modal>
);
