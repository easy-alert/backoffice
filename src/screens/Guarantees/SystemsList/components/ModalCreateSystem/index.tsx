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

interface IModalCreateSystem {
  loading: boolean;
  handleCreateGuaranteeSystem: (values: { systems: string | string[] }) => void;
  handleModalCreateSystem: (modalState: boolean) => void;
}

interface IFormValues {
  name: string;
  systems: string[];
}

const createSystemSchema = yup.object().shape({
  name: yup.string(),
  systems: yup
    .array()
    .of(yup.string())
    .test('at-least-one-system', 'Pelo menos um sistema deve ser criado', (value) =>
      Boolean(value && value.length > 0),
    )
    .required('Sistema é obrigatório'),
});

export const ModalCreateSystem = ({
  loading,
  handleCreateGuaranteeSystem,
  handleModalCreateSystem,
}: IModalCreateSystem) => (
  <Modal title="Criar um sistema" closeOutside={false} setModal={handleModalCreateSystem}>
    <Formik<IFormValues>
      validationSchema={createSystemSchema}
      onSubmit={(values) => handleCreateGuaranteeSystem(values)}
      initialValues={{
        name: '',
        systems: [],
      }}
    >
      {({ errors, values, touched, setFieldValue, setFieldTouched }) => (
        <Style.ModalFormContainer>
          <Form>
            <FormikInput
              name="name"
              label="Nome *"
              placeholder="Ex: Sistema"
              value={values.name}
              onKeyDown={async (e) => {
                if (e.key === 'Enter' && values.name.trim() !== '') {
                  e.preventDefault();

                  const toAdd: string[] = [];

                  values.name.split(',').forEach((system) => {
                    if (values.systems.includes(system)) {
                      handleToastifyMessage({
                        message: 'Sistema já cadastrado',
                        type: 'warning',
                      });

                      return;
                    }

                    toAdd.push(system.trim());
                  });

                  setFieldValue('systems', [...values.systems, ...toAdd]);
                  setFieldValue('name', '');
                  setFieldTouched('name', false);
                }
              }}
              error={touched.systems && errors.systems ? errors.systems : null}
            />

            <Style.ModalObservation>
              Obs: Para criar um sistema, basta digitar o nome e pressionar enter
            </Style.ModalObservation>

            <Style.ItemList>
              {values.systems.map((system, index) => (
                <Style.ItemContainer key={system}>
                  <Style.Item>{system}</Style.Item>

                  <IconButton
                    icon={icon.x}
                    size="16px"
                    onClick={() =>
                      setFieldValue(
                        'systems',
                        values.systems.filter((_, i) => i !== index),
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
