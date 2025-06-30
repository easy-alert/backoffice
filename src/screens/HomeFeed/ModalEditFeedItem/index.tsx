// LIBS
import { Form, Formik } from 'formik';
import * as yup from 'yup';

// global COMPONENTS
import { Modal } from '@components/Modal';
import { Button } from '@components/Buttons/Button';
import { FormikInput } from '@components/Form/FormikInput';
import { FormikSelect } from '@components/Form/FormikSelect';
import { FormikCheckbox } from '@components/Form/FormikCheckbox';

// GLOBAL UTILS
import { handleTranslate } from '@utils/handleTranslate';

// GLOBAL TYPES
import { FEED_ITEM_TYPE_VALUES } from '@customTypes/TFeedItemType';
import { IFeedItem } from '@customTypes/IFeedItem';

// STYLES
import * as Style from '../styles';

interface IModalEditPlatformVideo {
  feedItem: IFeedItem;
  loading: boolean;
  handleEditFeedItem: (id: string, values: IFeedItem) => void;
  handleModalEditFeedItem: (modalState: boolean) => void;
}

const editFeedItemSchema = yup.object().shape({
  title: yup.string().required('Título é obrigatório'),
  description: yup.string(),
  imageUrl: yup.string().url('URL inválida'),
  videoUrl: yup.string().url('URL inválida'),
  ctaLink: yup.string().url('URL inválida'),
  ctaText: yup
    .string()
    .when('ctaLink', (ctaLink, schema) =>
      ctaLink ? schema.required('Texto do CTA é obrigatório') : schema,
    ),
  type: yup
    .string()
    .oneOf([...FEED_ITEM_TYPE_VALUES])
    .required('Tipo é obrigatório'),
  order: yup.number().min(1, 'Ordem deve ser maior ou igual a 1').required('Ordem é obrigatória'),
  startsAt: yup.date().nullable(),
  expiresAt: yup.date().nullable(),
  isPinned: yup.boolean(),
});

export const ModalEditFeedItem = ({
  feedItem,
  loading,
  handleEditFeedItem,
  handleModalEditFeedItem,
}: IModalEditPlatformVideo) => (
  <Modal title="Atualizar uma notícia" setModal={handleModalEditFeedItem}>
    <Formik
      validationSchema={editFeedItemSchema}
      onSubmit={(values) => handleEditFeedItem(values.id || '', values)}
      initialValues={{
        id: feedItem.id,
        title: feedItem.title,
        description: feedItem.description || '',
        imageUrl: feedItem.imageUrl || '',
        videoUrl: feedItem.videoUrl || '',
        ctaLink: feedItem.ctaLink || '',
        ctaText: feedItem.ctaText || '',
        type: feedItem.type || 'alert',
        isPinned: feedItem.isPinned || false,
        order: feedItem.order || 1,
        startsAt: feedItem.startsAt,
        expiresAt: feedItem.expiresAt,
      }}
    >
      {({ errors, values, touched }) => (
        <Style.ModalFormContainer>
          <Form>
            <FormikInput
              label="Título da notícia *"
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
              placeholder="Ex: A Easy Alert é uma plataforma de alertas..."
            />

            <FormikInput
              label="URL da imagem"
              name="imageUrl"
              value={values.imageUrl}
              error={touched.imageUrl && errors.imageUrl ? errors.imageUrl : null}
              placeholder="Ex: https://example.com/image.jpg"
            />

            <FormikInput
              label="URL do vídeo"
              name="videoUrl"
              value={values.videoUrl}
              error={touched.videoUrl && errors.videoUrl ? errors.videoUrl : null}
              placeholder="Ex: https://example.com/video.mp4"
            />

            <FormikInput
              label="Link do CTA"
              name="ctaLink"
              value={values.ctaLink}
              error={touched.ctaLink && errors.ctaLink ? errors.ctaLink : null}
              placeholder="Ex: https://example.com/cta"
            />

            <FormikInput
              label="Texto do CTA"
              name="ctaText"
              value={values.ctaText}
              error={touched.ctaText && errors.ctaText ? errors.ctaText : null}
              placeholder="Ex: Saiba mais"
            />

            <FormikSelect name="type" label="Tipo *" selectPlaceholderValue={values.type}>
              {FEED_ITEM_TYPE_VALUES.map((type) => (
                <option key={type} value={type}>
                  {handleTranslate(type)}
                </option>
              ))}
            </FormikSelect>

            <FormikInput
              label="Ordem *"
              name="order"
              type="number"
              value={values.order}
              error={touched.order && errors.order ? errors.order : null}
              placeholder="Ex: 1"
            />

            <FormikInput
              label="Início (opcional)"
              name="startsAt"
              type="datetime-local"
              value={
                values.startsAt
                  ? new Date(
                      new Date(values.startsAt).getTime() -
                        new Date(values.startsAt).getTimezoneOffset() * 60000,
                    )
                      .toISOString()
                      .slice(0, 16)
                  : ''
              }
              error={touched.startsAt && errors.startsAt ? errors.startsAt : null}
            />

            <FormikInput
              label="Término (opcional)"
              name="expiresAt"
              type="datetime-local"
              value={
                values.expiresAt
                  ? new Date(
                      new Date(values.expiresAt).getTime() -
                        new Date(values.expiresAt).getTimezoneOffset() * 60000,
                    )
                      .toISOString()
                      .slice(0, 16)
                  : ''
              }
              error={touched.expiresAt && errors.expiresAt ? errors.expiresAt : null}
            />

            <FormikCheckbox
              label="Fixar no topo"
              name="isPinned"
              error={touched.isPinned && errors.isPinned ? errors.isPinned : null}
              checked={values.isPinned}
            />

            <Button center label="Atualizar" type="submit" loading={loading} />
          </Form>
        </Style.ModalFormContainer>
      )}
    </Formik>
  </Modal>
);
