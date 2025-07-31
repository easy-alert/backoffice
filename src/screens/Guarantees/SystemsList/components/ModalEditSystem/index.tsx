// LIBS
import { Form, Formik } from 'formik';
import * as yup from 'yup';

// GLOBAL COMPONENTS
import { Modal } from '@components/Modal';
import { Button } from '@components/Buttons/Button';
import { FormikInput } from '@components/Form/FormikInput';

// GLOBAL TYPES
import type { IGuaranteeSystem } from '@customTypes/IGuaranteeSystem';

// STYLES
import * as Style from '../../styles';

interface IModalEditSystem {
  system: IGuaranteeSystem;
  loading: boolean;
  handleEditGuaranteeSystem: (id: string, values: { name: string }) => void;
  handleModalEditSystem: (modalState: boolean) => void;
}

interface IFormValues {
  name: string;
}

const createFailureTypeSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
});

export const ModalEditSystem = ({
  system,
  loading,
  handleEditGuaranteeSystem,
  handleModalEditSystem,
}: IModalEditSystem) => (
  <Modal title="Editar um sistema" closeOutside={false} setModal={handleModalEditSystem}>
    <Formik<IFormValues>
      validationSchema={createFailureTypeSchema}
      onSubmit={(values) => handleEditGuaranteeSystem(system.id || '', { name: values.name })}
      initialValues={{
        name: system.name || '',
      }}
    >
      {({ errors, values, touched }) => (
        <Style.ModalFormContainer>
          <Form>
            <FormikInput
              name="name"
              label="Nome *"
              placeholder="Ex: Sistema"
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
