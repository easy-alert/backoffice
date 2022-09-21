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
import { IModalCreateMaintenance } from './utils/types';

// FUNCTIONS
import { schemaCreateMaintenance, requestCreateMaintenance } from './utils/functions';
import { applyMask } from '../../../../../../../../utils/functions';

export const ModalCreateMaintenance = ({
  modalState,
  setModalState,
  categoryId,
  categories,
  setCategories,
}: IModalCreateMaintenance) => {
  const [onQuery, setOnQuery] = useState<boolean>(false);

  return (
    <Modal title="Criar manutenção" modalState={modalState} setModalState={setModalState}>
      <Formik
        initialValues={{
          element: '',
          activity: '',
          frequency: '',
          responsible: '',
          source: '',
          period: '',
          delay: '',
          observation: '',
        }}
        validationSchema={schemaCreateMaintenance}
        onSubmit={async (values) => {
          requestCreateMaintenance({
            values,
            categoryId,
            setModalState,
            categories,
            setCategories,
            setOnQuery,
          });
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
                placeholder="Rejuntamento e vedações"
                height="60px"
                maxLength={150}
              />
              <FormikTextArea
                label="Atividade"
                name="activity"
                value={values.activity}
                error={touched.activity && errors.activity ? errors.activity : null}
                placeholder="Verificar sua integridade e reconstruir os rejuntamentos internos e externos dos pisos"
                height="82px"
                maxLength={180}
              />
              <FormikInput
                label="Periodicidade"
                name="frequency"
                value={applyMask({ mask: 'NUM', value: values.frequency }).value}
                error={touched.frequency && errors.frequency ? errors.frequency : null}
                placeholder="1"
                // check maxlength
              />
              <FormikInput
                label="Responsável"
                name="responsible"
                value={values.responsible}
                error={
                  touched.responsible && errors.responsible ? errors.responsible : null
                }
                placeholder="Equipe de manutenção local"
                maxLength={40}
              />

              <FormikInput
                label="Fonte"
                name="source"
                value={values.source}
                error={touched.source && errors.source ? errors.source : null}
                placeholder="NBR 5674:2012"
                maxLength={40}
              />

              <FormikInput
                label="Observação"
                name="observation"
                value={values.observation}
                error={
                  touched.observation && errors.observation ? errors.observation : null
                }
                placeholder="Atenção no acabamento"
                maxLength={55}
              />

              <FormikInput
                label="Período"
                name="period"
                value={applyMask({ mask: 'NUM', value: values.period }).value}
                error={touched.period && errors.period ? errors.period : null}
                placeholder="10"
              />

              <FormikInput
                label="Delay"
                name="delay"
                value={applyMask({ mask: 'NUM', value: values.delay }).value}
                error={touched.delay && errors.delay ? errors.delay : null}
                placeholder="1"
              />

              <Button center label="Cadastrar" type="submit" loading={onQuery} />
            </Form>
          </Style.FormContainer>
        )}
      </Formik>
    </Modal>
  );
};
