// LIBS
import { Form, Formik } from 'formik';
import * as yup from 'yup';

// GLOBAL COMPONENTS
import { Modal } from '@components/Modal';
import { Button } from '@components/Buttons/Button';
import { FormikInput } from '@components/Form/FormikInput';
import { IconButton } from '@components/Buttons/IconButton';

// GLOBAL UTILS
import { handleToastifyMessage } from '@utils/toastifyResponses';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// STYLES
import * as Style from '../../styles';

interface IModalCreateFailureType {
  loading: boolean;
  handleCreateGuaranteeFailureType: (values: { failureTypes: string | string[] }) => void;
  handleModalCreateFailureType: (modalState: boolean) => void;
}

interface IFormValues {
  name: string;
  failureTypes: string[];
}

const createFailureTypeSchema = yup.object().shape({
  name: yup.string(),
  failureTypes: yup.array().of(yup.string()).required('Tipo de falha é obrigatório'),
});

export const ModalCreateFailureType = ({
  loading,
  handleCreateGuaranteeFailureType,
  handleModalCreateFailureType,
}: IModalCreateFailureType) => (
  <Modal
    title="Criar um tipo de falha"
    closeOutside={false}
    setModal={handleModalCreateFailureType}
  >
    <Formik<IFormValues>
      validationSchema={createFailureTypeSchema}
      onSubmit={(values) => handleCreateGuaranteeFailureType(values)}
      initialValues={{
        name: '',
        failureTypes: [],
      }}
    >
      {({ errors, values, touched, setFieldValue, setFieldTouched }) => (
        <Style.ModalFormContainer>
          <Form>
            <FormikInput
              name="name"
              label="Nome *"
              placeholder="Ex: Tipo de falha"
              value={values.name}
              onKeyDown={async (e) => {
                if (e.key === 'Enter' && values.name.trim() !== '') {
                  e.preventDefault();

                  const toAdd: string[] = [];

                  values.name.split(',').forEach((failureType) => {
                    if (values.failureTypes.includes(failureType)) {
                      handleToastifyMessage({
                        message: 'Tipo de falha já cadastrado',
                        type: 'warning',
                      });

                      return;
                    }

                    toAdd.push(failureType.trim());
                  });

                  setFieldValue('failureTypes', [...values.failureTypes, ...toAdd]);
                  setFieldValue('name', '');
                  setFieldTouched('name', false);
                }
              }}
              error={touched.name && errors.name ? errors.name : null}
            />

            <Style.ItemList>
              {values.failureTypes.map((failureType, index) => (
                <Style.ItemContainer key={failureType}>
                  <Style.Item>{failureType}</Style.Item>

                  <IconButton
                    icon={icon.x}
                    size="16px"
                    onClick={() =>
                      setFieldValue(
                        'failureTypes',
                        values.failureTypes.filter((_, i) => i !== index),
                      )
                    }
                  />
                </Style.ItemContainer>
              ))}
            </Style.ItemList>

            <Button center label="Criar" type="submit" loading={loading} />
          </Form>
        </Style.ModalFormContainer>
      )}
    </Formik>
  </Modal>
);
