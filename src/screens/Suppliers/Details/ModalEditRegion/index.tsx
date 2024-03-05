import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Modal } from '../../../../components/Modal';
import { Button } from '../../../../components/Buttons/Button';
import { FormContainer } from '../ModalEditSupplier/styles';
import { FormikSelect } from '../../../../components/Form/FormikSelect';
import { Api } from '../../../../services/api';
import { catchHandler } from '../../../../utils/functions';
import { ReactSelectComponent } from '../../../../components/ReactSelectComponent';
import { useBrasilStates } from '../../../../hooks/useBrasilStates';
import { useBrasilCities } from '../../../../hooks/useBrasilCities';
// eslint-disable-next-line import/no-cycle
import { IRegion } from '..';

interface IModalEditRegion {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  onThenRequest: () => Promise<void>;
  region: IRegion;
}

const schema = yup
  .object({
    id: yup.string(),
    type: yup.string().required('Campo obrigatório.'),
    states: yup.array().of(
      yup.object({
        state: yup.string(),
      }),
    ),
    cities: yup.array().of(
      yup.object({
        city: yup.string(),
      }),
    ),
  })
  .required();

type TSchema = yup.InferType<typeof schema>;

export const ModalEditRegion = ({ setModal, onThenRequest, region }: IModalEditRegion) => {
  const { states } = useBrasilStates();
  const [onQuery, setOnQuery] = useState<boolean>(false);
  const [tempState, setTempState] = useState('');

  const { cities } = useBrasilCities({ UF: tempState || region.states[0].state || '' });

  return (
    <Modal setModal={setModal} title="Editar região">
      <Formik
        initialValues={{
          id: region.id,
          type: region.type,
          states: region.states,
          cities: region.cities,
        }}
        validationSchema={schema}
        onSubmit={async (values: TSchema) => {
          setOnQuery(true);

          await Api.put('/suppliers/regions', values)
            .then((res) => {
              onThenRequest();
              setModal(false);
              toast.success(res.data.ServerMessage.message);
            })
            .catch((err) => {
              catchHandler(err);
            })
            .finally(() => {
              setOnQuery(false);
            });
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <FormContainer>
            <Form>
              <FormikSelect
                selectPlaceholderValue={values.type}
                name="type"
                label="Tipo"
                error={touched.type && errors.type ? errors.type : null}
              >
                <option value="" disabled hidden>
                  Selecione
                </option>
                <option value="country">Brasil</option>
                <option value="state">Estado</option>
                <option value="city">Cidade</option>
              </FormikSelect>

              {values.type === 'state' && (
                <ReactSelectComponent
                  isClearable={false}
                  label="Estados"
                  id="state"
                  name="state"
                  options={states.map(({ sigla }) => ({
                    label: sigla,
                    value: sigla,
                  }))}
                  placeholder="Selecione"
                  isMulti
                  onChange={(evt) => {
                    const newStates = evt?.map(({ value }: { value: string }) => ({
                      state: value,
                    }));
                    setFieldValue('states', newStates);
                  }}
                  defaultValue={region.states.map(({ state }) => ({
                    label: state,
                    value: state,
                  }))}
                />
              )}

              {values.type === 'city' && (
                <>
                  <ReactSelectComponent
                    isClearable={false}
                    label="Estado"
                    id="state2"
                    name="state2"
                    options={states.map(({ sigla }) => ({
                      label: sigla,
                      value: sigla,
                    }))}
                    placeholder="Selecione"
                    onChange={(evt) => {
                      setTempState(evt.value);
                      setFieldValue('states', [{ state: evt.value }]);
                    }}
                    defaultValue={region.states.map(({ state }) => ({
                      label: state,
                      value: state,
                    }))}
                  />

                  <ReactSelectComponent
                    isClearable={false}
                    label="Cidades"
                    id="city"
                    name="city"
                    options={cities.map(({ nome }) => ({
                      label: nome,
                      value: nome,
                    }))}
                    placeholder="Selecione"
                    isMulti
                    onChange={(evt) => {
                      const newCities = evt?.map(({ value }: { value: string }) => ({
                        city: value,
                      }));
                      setFieldValue('cities', newCities);
                    }}
                    defaultValue={region.cities.map(({ city }) => ({
                      label: city,
                      value: city,
                    }))}
                  />
                </>
              )}

              <Button center label="Salvar" type="submit" loading={onQuery} />
            </Form>
          </FormContainer>
        )}
      </Formik>
    </Modal>
  );
};
