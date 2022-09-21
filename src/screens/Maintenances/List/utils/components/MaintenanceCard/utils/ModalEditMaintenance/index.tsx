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
import { IModalEditMaintenance } from './utils/types';

// FUNCTIONS
import { schemaEditMaintenance, requestEditMaintenance } from './utils/functions';

export const ModalEditMaintenance = ({
  modalState,
  setModalState,
  selectedMaintenance,
}: IModalEditMaintenance) => {
  const [onQuery, setOnQuery] = useState<boolean>(false);

  return (
    <Modal
      title="Editar manutenção"
      modalState={modalState}
      setModalState={setModalState}
    >
      <Formik
        initialValues={{
          element: selectedMaintenance.MaintenancesHistory[0].element,
          activity: selectedMaintenance.MaintenancesHistory[0].activity,
          frequency: String(selectedMaintenance.MaintenancesHistory[0].frequency),
          responsible: selectedMaintenance.MaintenancesHistory[0].responsible,
          source: selectedMaintenance.MaintenancesHistory[0].source,
          period: String(selectedMaintenance.MaintenancesHistory[0].period),
          delay: String(selectedMaintenance.MaintenancesHistory[0].delay),
          observation: selectedMaintenance.MaintenancesHistory[0].observation,
        }}
        validationSchema={schemaEditMaintenance}
        onSubmit={async (values) => {
          requestEditMaintenance({ maintenanceId: selectedMaintenance.id, values });
          // TIRAR ISSO AQUI DEPOIS, BOTAR NA FUNÇÃO
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
                maxLength={150}
              />
              <FormikTextArea
                label="Atividade"
                name="activity"
                value={values.activity}
                error={touched.activity && errors.activity ? errors.activity : null}
                placeholder=" "
                height="82px"
                maxLength={180}
              />
              <FormikInput
                label="Frequência"
                name="frequency"
                value={values.frequency}
                error={touched.frequency && errors.frequency ? errors.frequency : null}
                placeholder=" "
                maxLength={4}
              />
              <FormikInput
                label="Responsável"
                name="responsible"
                value={values.responsible}
                error={
                  touched.responsible && errors.responsible ? errors.responsible : null
                }
                placeholder=" "
                maxLength={40}
              />

              <FormikInput
                label="Fonte"
                name="source"
                value={values.source}
                error={touched.source && errors.source ? errors.source : null}
                placeholder=" "
                maxLength={40}
              />

              <FormikInput
                label="Observação"
                name="observation"
                value={values.observation}
                error={
                  touched.observation && errors.observation ? errors.observation : null
                }
                placeholder=" "
                maxLength={55}
              />

              <FormikInput
                label="Período"
                name="period"
                value={values.period}
                error={touched.period && errors.period ? errors.period : null}
                placeholder=" "
                maxLength={4}
              />

              <FormikInput
                label="Delay"
                name="delay"
                value={values.delay}
                error={touched.delay && errors.delay ? errors.delay : null}
                placeholder=" "
                maxLength={4}
              />

              <Button center label="Editar" type="submit" loading={onQuery} />
            </Form>
          </Style.FormContainer>
        )}
      </Formik>
    </Modal>
  );
};
