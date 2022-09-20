// LIBS
import { useState } from 'react';
import { Form, Formik } from 'formik';

// COMPONENTS
import { Button } from '../../../../../components/Buttons/Button';
import { FormikInput } from '../../../../../components/Form/FormikInput';
import { Modal } from '../../../../../components/Modal';
import * as Style from './styles';

// TYPES
import { IModalCreateCategory } from './utils/types';

// FUNCTIONS
import { schemaCreateCategory, requestCreateCategory } from './utils/functions';

export const ModalCreateCategory = ({
  modalState,
  setModalState,
  categories,
  setCategories,
}: IModalCreateCategory) => {
  const [onQuery, setOnQuery] = useState<boolean>(false);

  return (
    <Modal
      title="Cadastrar categoria"
      modalState={modalState}
      setModalState={setModalState}
    >
      <Formik
        initialValues={{
          categoryName: '',
        }}
        validationSchema={schemaCreateCategory}
        onSubmit={async (values) => {
          requestCreateCategory({
            values,
            categories,
            setCategories,
            setOnQuery,
            setModalState,
          });
        }}
      >
        {({ errors, values, touched }) => (
          <Style.FormContainer>
            <Form>
              <FormikInput
                autoFocus
                label="Nome da categoria"
                name="categoryName"
                value={values.categoryName}
                error={
                  touched.categoryName && errors.categoryName ? errors.categoryName : null
                }
                placeholder="Digite o nome da categoria"
              />
              <Button center label="Cadastrar" type="submit" loading={onQuery} />
            </Form>
          </Style.FormContainer>
        )}
      </Formik>
    </Modal>
  );
};
