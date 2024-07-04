// LIBS
import * as yup from 'yup';
import { useState } from 'react';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { Button } from '../../../../components/Buttons/Button';
import { FormikImageInput } from '../../../../components/Form/FormikImageInput';
import { FormikInput } from '../../../../components/Form/FormikInput';
import { Modal } from '../../../../components/Modal';
import {
  addInitialSlashesToURL,
  applyMask,
  catchHandler,
  isURLValid,
  unMask,
  unMaskBRL,
  uploadFile,
} from '../../../../utils/functions';
import * as Style from './styles';
import { Api } from '../../../../services/api';
import { FormikTextArea } from '../../../../components/Form/FormikTextArea';

interface IModalCreateSupplier {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  onThenRequest: () => Promise<void>;
}

export const schemaCreateSupplier = yup
  .object({
    image: yup
      .mixed()
      .required('Campo obrigatório.')
      .test(
        'FileSize',
        'O tamanho da imagem excedeu o limite.',
        (value) => !value || (value && value.size <= 5000000),
      )
      .test(
        'FileType',
        'Formato inválido.',
        (value) =>
          !value ||
          (value &&
            (value.type === 'image/png' ||
              value.type === 'image/jpeg' ||
              value.type === 'image/jpg')),
      ),

    name: yup.string().required('Campo obrigatório.'),

    description: yup.string().required('Campo obrigatório.'),

    link: yup.string().required('Campo obrigatório.'),

    occupationArea: yup.string().required('Campo obrigatório.'),

    phone: yup.string().min(14, 'O número de telefone deve conter no mínimo 14 caracteres.'),

    email: yup.string().email('Informe um e-mail válido'),

    contractedValue: yup.string(),
  })
  .required();

export const ModalCreateSupplier = ({ setModal, onThenRequest }: IModalCreateSupplier) => {
  const [onQuery, setOnQuery] = useState<boolean>(false);

  return (
    <Modal title="Cadastrar fornecedor" setModal={setModal}>
      <Formik
        initialValues={{
          name: '',
          description: '',
          image: '',
          link: '',
          occupationArea: '',

          email: '',
          phone: '',
          contractedValue: 'R$ 0,00',
        }}
        validationSchema={schemaCreateSupplier}
        onSubmit={async (data) => {
          const URLValid = isURLValid(data.link);
          if (!URLValid) {
            toast.error(
              <div>
                Informe um link válido.
                <br />
                Ex: www.easyalert.com.br
              </div>,
            );
            return;
          }

          setOnQuery(true);

          const { Location } = await uploadFile(data.image);
          const imageURL = Location;

          await Api.post('/suppliers', {
            ...data,
            image: imageURL,
            contractedValue: Number(unMaskBRL(data.contractedValue)),
            phone: unMask(data.phone),
            link: addInitialSlashesToURL(data.link),
          })
            .then((res) => {
              onThenRequest();
              setModal(false);
              toast.success(res.data.ServerMessage.message);
            })
            .catch((err) => {
              catchHandler(err);
            })
            .finally(() => {
              setOnQuery(false);
            });
        }}
      >
        {({ errors, values, touched, setFieldValue }) => (
          <Style.FormContainer>
            <Form>
              <FormikImageInput
                name="image"
                label="Imagem/Logo *"
                error={touched.image && errors.image ? errors.image : null}
                defaultImage={values.image}
                onChange={(event: any) => {
                  if (event.target.files?.length) {
                    setFieldValue('image', event.target.files[0]);
                  }
                }}
              />

              <FormikInput
                label="Nome *"
                name="name"
                value={values.name}
                error={touched.name && errors.name ? errors.name : null}
                placeholder="Ex: João Silva"
              />

              <FormikTextArea
                name="description"
                error={touched.description && errors.description ? errors.description : null}
                label="Descrição *"
                placeholder="Informe a descrição"
              />

              <FormikInput
                label="Link *"
                name="link"
                value={values.link}
                error={touched.link && errors.link ? errors.link : null}
                placeholder="Ex: www.easyalert.com.br"
              />

              <FormikInput
                label="Área de atuação"
                name="occupationArea"
                value={values.occupationArea}
                error={
                  touched.occupationArea && errors.occupationArea ? errors.occupationArea : null
                }
                placeholder="Informe a área de atuação"
              />

              <FormikInput
                label="E-mail"
                name="email"
                value={values.email}
                error={touched.email && errors.email ? errors.email : null}
                placeholder="Informe o email"
              />

              <FormikInput
                label="Telefone/Celular"
                name="phone"
                maxLength={
                  applyMask({
                    value: values.phone,
                    mask: 'TEL',
                  }).length
                }
                value={values.phone}
                error={touched.phone && errors.phone ? errors.phone : null}
                placeholder="Ex: (00) 00000-0000"
                onChange={(e) => {
                  setFieldValue('phone', applyMask({ value: e.target.value, mask: 'TEL' }).value);
                }}
              />

              <FormikInput
                label="Valor contratado"
                name="contractedValue"
                value={values.contractedValue}
                error={
                  touched.contractedValue && errors.contractedValue ? errors.contractedValue : null
                }
                placeholder="R$ 1000,00"
                maxLength={14}
                onChange={(e) => {
                  setFieldValue(
                    'contractedValue',
                    applyMask({ value: e.target.value, mask: 'BRL' }).value,
                  );
                }}
              />

              <Button center label="Cadastrar" type="submit" loading={onQuery} />
            </Form>
          </Style.FormContainer>
        )}
      </Formik>
    </Modal>
  );
};
