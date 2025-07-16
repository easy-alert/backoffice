// REACT
import { useState } from 'react';

// LIBS
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

// GLOBAL COMPONENTS
import { Modal } from '@components/Modal';
import { FormikInput } from '@components/Form/FormikInput';
import { Button } from '@components/Buttons/Button';

// STYLES
import * as Style from './styles';

// TYPES
import type { IModalCreateGuarantee } from './utils/types';

const schemaCreateCategory = Yup.object().shape({
  categoryName: Yup.string().required('Nome obrigatório'),
});

export const ModalCreateGuarantee = ({ setModal, onCreate }: IModalCreateGuarantee) => {
  const [onQuery, setOnQuery] = useState(false);

  return (
    <Modal title="Criar categoria" setModal={setModal}>
      <Formik
        initialValues={{ categoryName: '' }}
        validationSchema={schemaCreateCategory}
        onSubmit={async (values) => {
          setOnQuery(true);
          onCreate(values.categoryName);
          setOnQuery(false);
          setModal(false);
        }}
      >
        {({ errors, values, touched }) => (
          <Style.FormContainer>
            <Form>
              <FormikInput
                autoFocus
                label="Nome da categoria *"
                name="categoryName"
                value={values.categoryName}
                error={touched.categoryName && errors.categoryName ? errors.categoryName : null}
                placeholder="Digite o nome da categoria"
              />
              <Button center label="Criar" type="submit" loading={onQuery} />
            </Form>
          </Style.FormContainer>
        )}
      </Formik>
    </Modal>
  );
};
