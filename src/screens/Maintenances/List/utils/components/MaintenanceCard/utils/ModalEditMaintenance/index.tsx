// LIBS
import { useState } from 'react';
import { Form, Formik } from 'formik';

// COMPONENTS
import { Button } from '../../../../../../../../components/Buttons/Button';
import { FormikTextArea } from '../../../../../../../../components/Form/FormikTextArea';
import { FormikInput } from '../../../../../../../../components/Form/FormikInput';
import { Modal } from '../../../../../../../../components/Modal';
import * as Style from './styles';

// TYPES
import { IModalCreateCompanyAndOwner } from './utils/types';

// FUNCTIONS
import { schemaEditMaintenance } from './utils/functions';

export const ModalEditMaintenance = ({
  modalState,
  setModalState,
  selectedMaintenance,
}: IModalCreateCompanyAndOwner) => {
  const [onQuery, setOnQuery] = useState<boolean>(false);

  return (
    <Modal
      title="Editar manutenção"
      modalState={modalState}
      setModalState={setModalState}
    >
      <Formik
        initialValues={{
          element: selectedMaintenance[0].element,
          activity: selectedMaintenance[0].activity,
          frequency: String(selectedMaintenance[0].frequency),
          responsible: selectedMaintenance[0].responsible,
          source: selectedMaintenance[0].source,
          period: String(selectedMaintenance[0].period),
          delay: String(selectedMaintenance[0].delay),
          observation: selectedMaintenance[0].observation,
        }}
        validationSchema={schemaEditMaintenance}
        onSubmit={async (values) => {
          // eslint-disable-next-line no-console
          console.log(values);
          setOnQuery(false);
        }}
      >
        {({ errors, values, touched }) => (
          <Style.FormContainer>
            <Form>
              <FormikTextArea
                label="Elemento"
                name="element"
                value={values.element}
                error={touched.element && errors.element ? errors.element : null}
                placeholder=" "
                height="60px"
              />
              <FormikTextArea
                label="Atividade"
                name="activity"
                value={values.activity}
                error={touched.activity && errors.activity ? errors.activity : null}
                placeholder=" "
                height="80px"
              />
              <FormikInput
                label="Periodicidade"
                name="frequency"
                value={values.frequency}
                error={touched.frequency && errors.frequency ? errors.frequency : null}
                placeholder=" "
              />
              <FormikInput
                label="Responsável"
                name="responsible"
                value={values.responsible}
                error={
                  touched.responsible && errors.responsible ? errors.responsible : null
                }
                placeholder=" "
              />

              <FormikInput
                label="Fonte"
                name="source"
                value={values.source}
                error={touched.source && errors.source ? errors.source : null}
                placeholder=" "
              />

              <FormikInput
                label="Observação"
                name="observation"
                value={values.observation}
                error={
                  touched.observation && errors.observation ? errors.observation : null
                }
                placeholder=" "
              />

              <FormikInput
                label="Período"
                name="period"
                value={values.period}
                error={touched.period && errors.period ? errors.period : null}
                placeholder=" "
              />

              <FormikInput
                label="Delay"
                name="delay"
                value={values.delay}
                error={touched.delay && errors.delay ? errors.delay : null}
                placeholder=" "
              />

              <Button center label="Editar" type="submit" loading={onQuery} />
            </Form>
          </Style.FormContainer>
        )}
      </Formik>
    </Modal>
  );
};
