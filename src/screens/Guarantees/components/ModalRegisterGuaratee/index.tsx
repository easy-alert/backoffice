// REACT
import { useState } from 'react';

// LIBS
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

// GLOBAL COMPONENTS
import { Modal } from '@components/Modal';
import { FormikInput } from '@components/Form/FormikInput';
import { FormikTextArea } from '@components/Form/FormikTextArea';
import { Button } from '@components/Buttons/Button';

// STYLES
import * as Style from './styles';

// TYPES
import type { Guarantee } from '../GuaranteeCategory/utils/types';
import type { ModalRegisterGuaranteeProps } from './utils/types';

const schema = Yup.object().shape({
  description: Yup.string().required('Descrição obrigatória'),
  failures: Yup.string().required('Falhas obrigatórias'),
  term: Yup.string().required('Prazo obrigatório'),
  source: Yup.string().required('Fonte obrigatória'),
  observation: Yup.string(),
});

export const ModalRegisterGuarantee = ({
  open,
  onClose,
  onCreate,
}: ModalRegisterGuaranteeProps) => {
  const [onQuery, setOnQuery] = useState(false);

  if (!open) return null;

  return (
    <Modal title="Cadastrar garantia" setModal={onClose}>
      <Formik
        initialValues={{
          description: '',
          failures: '',
          term: '',
          source: '',
          observation: '',
        }}
        validationSchema={schema}
        onSubmit={async (values, actions) => {
          setOnQuery(true);
          const newGuarantee: Guarantee = {
            id: Date.now(),
            ...values,
          };
          onCreate(newGuarantee);
          setOnQuery(false);
          actions.resetForm();
          onClose();
        }}
      >
        {({ errors, values, touched }) => (
          <Style.FormContainer>
            <Form>
              <FormikInput
                label="Descrição *"
                name="description"
                value={values.description}
                error={touched.description && errors.description ? errors.description : null}
                placeholder="Ex: Camada de regularização (contrapiso)"
              />
              <FormikTextArea
                label="Falhas *"
                name="failures"
                value={values.failures}
                error={touched.failures && errors.failures ? errors.failures : null}
                placeholder="Ex: Dessolidarização, desagregação..."
                height="60px"
              />
              <FormikInput
                label="Prazo *"
                name="term"
                value={values.term}
                error={touched.term && errors.term ? errors.term : null}
                placeholder="Ex: 1 ano"
              />
              <FormikInput
                label="Fonte *"
                name="source"
                value={values.source}
                error={touched.source && errors.source ? errors.source : null}
                placeholder="Ex: ABNT NBR 17170:2022"
              />
              <FormikInput
                label="Observação"
                name="observation"
                value={values.observation}
                error={touched.observation && errors.observation ? errors.observation : null}
                placeholder="Ex: Atenção especial..."
              />
              <Button center label="Cadastrar" type="submit" loading={onQuery} />
            </Form>
          </Style.FormContainer>
        )}
      </Formik>
    </Modal>
  );
};
