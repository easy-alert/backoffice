// REACT
import { useState } from 'react';

// LIBS
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

// HOOKS
import { useGuaranteeSystemForSelect } from '@hooks/useGuaranteeSystemForSelect';
import { useGuaranteeFailureTypesForSelect } from '@hooks/useGuaranteeFailureTypesForSelect';

// GLOBAL COMPONENTS
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';
import { Button } from '@components/Buttons/Button';
import { Modal } from '@components/Modal';
import { FormikInput } from '@components/Form/FormikInput';
import { FormikSelect } from '@components/Form/FormikSelect';
import { FormikError } from '@components/Form/FormikError';
import { FormikTextArea } from '@components/Form/FormikTextArea';
import { ReactSelectComponent } from '@components/ReactSelectComponent';

// GLOBAL TYPES
import type { ICreateGuaranteePlan } from '@services/apis/createGuaranteePlan';

// STYLES
import * as Style from './styles';

interface IModalCreateGuarantee {
  selectedSystemId?: string;
  handleCreateGuaranteePlan: (values: ICreateGuaranteePlan) => Promise<void>;
  handleModalCreateGuarantee: (state: boolean) => void;
}

const schema = Yup.object().shape({
  systemId: Yup.string().required('Sistema obrigatório'),
  description: Yup.string().required('Descrição obrigatória'),
  observation: Yup.string().optional(),
  failureTypesIds: Yup.array()
    .of(Yup.string())
    .test('at-least-one-failure', 'Pelo menos uma falha deve ser selecionada', (value) =>
      Boolean(value && value.length > 0),
    )
    .required('Falhas obrigatórias'),
  warrantyPeriod: Yup.number().required('Prazo obrigatório').min(1, 'Prazo deve ser maior que 0'),
  warrantyPeriodUnit: Yup.string().required('Unidade obrigatória'),
});

export const ModalCreateGuarantee = ({
  selectedSystemId,
  handleCreateGuaranteePlan,
  handleModalCreateGuarantee,
}: IModalCreateGuarantee) => {
  const { guaranteeSystemsForSelect, loadingGuaranteeSystemsForSelect } =
    useGuaranteeSystemForSelect({
      companyId: '',
      getDefault: true,
    });

  const { guaranteeFailureTypesForSelect, loadingGuaranteeFailureTypesForSelect } =
    useGuaranteeFailureTypesForSelect({
      companyId: '',
      getDefault: true,
    });

  const [onQuery, setOnQuery] = useState(false);

  return (
    <Modal title="Cadastrar garantia" setModal={handleModalCreateGuarantee}>
      <Formik
        initialValues={{
          systemId: selectedSystemId || '',
          description: '',
          observation: '',
          failureTypesIds: [],
          warrantyPeriod: 1,
          warrantyPeriodUnit: 'year',
        }}
        validationSchema={schema}
        onSubmit={async (values, actions) => {
          setOnQuery(true);

          await handleCreateGuaranteePlan({
            systemId: values.systemId,
            description: values.description,
            observation: values.observation,
            failureTypesIds: values.failureTypesIds,
            warrantyPeriod:
              values.warrantyPeriodUnit === 'year'
                ? values.warrantyPeriod * 12
                : values.warrantyPeriod,
          });

          setOnQuery(false);
          actions.resetForm();
          handleModalCreateGuarantee(false);
        }}
      >
        {({ errors, values, touched, setFieldValue }) => (
          <Style.FormContainer>
            {loadingGuaranteeSystemsForSelect && loadingGuaranteeFailureTypesForSelect && (
              <DotSpinLoading />
            )}

            {!loadingGuaranteeSystemsForSelect && !loadingGuaranteeFailureTypesForSelect && (
              <Form>
                <FormikSelect
                  label="Sistema *"
                  name="systemId"
                  value={values.systemId}
                  selectPlaceholderValue={values.systemId}
                  error={touched.systemId && errors.systemId ? errors.systemId : null}
                >
                  <option value="" disabled hidden>
                    Selecione
                  </option>

                  {guaranteeSystemsForSelect &&
                    guaranteeSystemsForSelect.map((system) => (
                      <option key={system.id} value={system.id}>
                        {system.name}
                      </option>
                    ))}
                </FormikSelect>

                <FormikInput
                  name="description"
                  label="Descrição *"
                  placeholder="Ex: Garantia de 1 ano"
                  value={values.description}
                  error={touched.description && errors.description ? errors.description : null}
                />

                <FormikTextArea
                  name="observation"
                  label="Observação"
                  placeholder="Ex: Observação"
                  value={values.observation}
                  error={touched.observation && errors.observation ? errors.observation : null}
                />

                <div>
                  <ReactSelectComponent
                    selectPlaceholderValue={values.failureTypesIds?.length}
                    isMulti
                    id="failureTypesIds"
                    name="failureTypesIds"
                    placeholder="Selecione um ou mais falhas"
                    label="Falha(s) *"
                    options={guaranteeFailureTypesForSelect.map(({ id, name }) => ({
                      label: name,
                      value: id,
                    }))}
                    value={values.failureTypesIds
                      ?.map((failureTypeId) => {
                        const failureType = guaranteeFailureTypesForSelect.find(
                          ({ id }) => id === failureTypeId,
                        );
                        return failureType
                          ? { label: failureType.name, value: failureType.id }
                          : null;
                      })
                      .filter(Boolean)}
                    onChange={(e) => {
                      const selectedValues = e.map((option: { value: string }) => option.value);
                      setFieldValue('failureTypesIds', selectedValues);
                    }}
                  />

                  {errors.failureTypesIds && touched.failureTypesIds && (
                    <FormikError name="failureTypesIds" />
                  )}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <FormikInput
                    name="warrantyPeriod"
                    label="Prazo*"
                    type="number"
                    value={values.warrantyPeriod}
                    error={
                      touched.warrantyPeriod && errors.warrantyPeriod ? errors.warrantyPeriod : null
                    }
                  />

                  <FormikSelect
                    name="warrantyPeriodUnit"
                    label="Unidade*"
                    selectPlaceholderValue={values.warrantyPeriodUnit}
                    value={values.warrantyPeriodUnit}
                    error={
                      touched.warrantyPeriodUnit && errors.warrantyPeriodUnit
                        ? errors.warrantyPeriodUnit
                        : null
                    }
                  >
                    <option value="" disabled hidden>
                      Selecione
                    </option>

                    <option value="year">Anos</option>
                    <option value="month">Meses</option>
                  </FormikSelect>
                </div>

                <Button center label="Cadastrar" type="submit" loading={onQuery} />
              </Form>
            )}
          </Style.FormContainer>
        )}
      </Formik>
    </Modal>
  );
};
