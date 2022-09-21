// LIBS
import { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';

// COMPONENTS
import { Button } from '../../../../../../../../components/Buttons/Button';
import { FormikTextArea } from '../../../../../../../../components/Form/FormikTextArea';
import { FormikInput } from '../../../../../../../../components/Form/FormikInput';
import { Modal } from '../../../../../../../../components/Modal';
import * as Style from './styles';

// TYPES
import { IModalCreateMaintenance, ITimeInterval } from './utils/types';

// FUNCTIONS
import {
  schemaCreateMaintenance,
  requestCreateMaintenance,
  requestListIntervals,
} from './utils/functions';
import { applyMask } from '../../../../../../../../utils/functions';
import { FormikSelect } from '../../../../../../../../components/Form/FormikSelect';

export const ModalCreateMaintenance = ({
  modalState,
  setModalState,
  categoryId,
  categories,
  setCategories,
}: IModalCreateMaintenance) => {
  const [onQuery, setOnQuery] = useState<boolean>(false);
  const [timeIntervals, setTimeIntervals] = useState<ITimeInterval[]>([]);

  useEffect(() => {
    requestListIntervals({ setTimeIntervals });
  }, []);

  return (
    <Modal title="Criar manutenção" modalState={modalState} setModalState={setModalState}>
      <Formik
        initialValues={{
          element: '',
          activity: '',
          frequency: '',
          frequencyTimeInterval: '',
          responsible: '',
          source: '',
          period: '',
          periodTimeInterval: '',
          delay: '',
          delayTimeInterval: '',
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
              <Style.SelectWrapper>
                <FormikInput
                  label="Frequência"
                  name="frequency"
                  value={applyMask({ mask: 'NUM', value: values.frequency }).value}
                  error={touched.frequency && errors.frequency ? errors.frequency : null}
                  placeholder="1"
                  maxLength={4}
                />
                <FormikSelect
                  name="frequencyTimeInterval"
                  label="Intervalo"
                  error={
                    touched.frequencyTimeInterval && errors.frequencyTimeInterval
                      ? errors.frequencyTimeInterval
                      : null
                  }
                >
                  <option value="Selecione" disabled>
                    Selecione
                  </option>
                  {timeIntervals.map((element) => (
                    <option key={element.id} value={element.id}>
                      {element.name}
                    </option>
                  ))}
                </FormikSelect>
              </Style.SelectWrapper>
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
              <Style.SelectWrapper>
                <FormikInput
                  label="Período"
                  name="period"
                  value={applyMask({ mask: 'NUM', value: values.period }).value}
                  error={touched.period && errors.period ? errors.period : null}
                  placeholder="10"
                  maxLength={4}
                />
                <FormikSelect
                  name="periodTimeInterval"
                  label="Intervalo"
                  error={
                    touched.periodTimeInterval && errors.periodTimeInterval
                      ? errors.periodTimeInterval
                      : null
                  }
                >
                  <option value="Selecione" disabled>
                    Selecione
                  </option>
                  {timeIntervals.map((element) => (
                    <option key={element.id} value={element.id}>
                      {element.name}
                    </option>
                  ))}
                </FormikSelect>
              </Style.SelectWrapper>
              <Style.SelectWrapper>
                <FormikInput
                  label="Delay"
                  name="delay"
                  value={applyMask({ mask: 'NUM', value: values.delay }).value}
                  error={touched.delay && errors.delay ? errors.delay : null}
                  placeholder="1"
                  maxLength={4}
                />
                <FormikSelect
                  name="delayTimeInterval"
                  label="Intervalo"
                  error={
                    touched.delayTimeInterval && errors.delayTimeInterval
                      ? errors.delayTimeInterval
                      : null
                  }
                >
                  <option value="Selecione" disabled>
                    Selecione
                  </option>
                  {timeIntervals.map((element) => (
                    <option key={element.id} value={element.id}>
                      {element.name}
                    </option>
                  ))}
                </FormikSelect>
              </Style.SelectWrapper>
              <Button center label="Cadastrar" type="submit" loading={onQuery} />
            </Form>
          </Style.FormContainer>
        )}
      </Formik>
    </Modal>
  );
};
