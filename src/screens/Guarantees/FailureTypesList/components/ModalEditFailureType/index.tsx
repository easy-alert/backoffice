// LIBS
import { Form, Formik } from 'formik';
import * as yup from 'yup';

// GLOBAL COMPONENTS
import { Modal } from '@components/Modal';
import { Button } from '@components/Buttons/Button';
import { FormikInput } from '@components/Form/FormikInput';

// GLOBAL TYPES
import type { IGuaranteeFailureType } from '@customTypes/IGuaranteeFailureType';

// STYLES
import * as Style from '../../styles';

interface IModalEditFailureType {
  failureType: IGuaranteeFailureType;
  loading: boolean;
  handleEditGuaranteeFailureType: (id: string, values: { name: string }) => void;
  handleModalEditFailureType: (modalState: boolean) => void;
}

interface IFormValues {
  name: string;
}

const createFailureTypeSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
});

export const ModalEditFailureType = ({
  failureType,
  loading,
  handleEditGuaranteeFailureType,
  handleModalEditFailureType,
}: IModalEditFailureType) => (
  <Modal title="Editar um tipo de falha" closeOutside={false} setModal={handleModalEditFailureType}>
    <Formik<IFormValues>
      validationSchema={createFailureTypeSchema}
      onSubmit={(values) =>
        handleEditGuaranteeFailureType(failureType.id || '', { name: values.name })
      }
      initialValues={{
        name: failureType.name || '',
      }}
    >
      {({ errors, values, touched }) => (
        <Style.ModalFormContainer>
          <Form>
            <FormikInput
              name="name"
              label="Nome *"
              placeholder="Ex: Tipo de falha"
              value={values.name}
              error={touched.name && errors.name ? errors.name : null}
            />

            <Button center label="Atualizar" type="submit" loading={loading} />
          </Form>
        </Style.ModalFormContainer>
      )}
    </Formik>
  </Modal>
);
