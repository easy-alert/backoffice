import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Modal } from '../../../../components/Modal';
import { Button } from '../../../../components/Buttons/Button';
import { FormContainer } from '../ModalEditSupplier/styles';
import { FormikSelect } from '../../../../components/Form/FormikSelect';
import { Api } from '../../../../services/api';
import { catchHandler, convertStateName } from '../../../../utils/functions';
import { ReactSelectComponent } from '../../../../components/ReactSelectComponent';
import { useBrasilStates } from '../../../../hooks/useBrasilStates';
import { useBrasilCities } from '../../../../hooks/useBrasilCities';

interface IModalCreateRegion {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  onThenRequest: () => Promise<void>;
}

const schema = yup
  .object({
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

export const ModalCreateRegion = ({ setModal, onThenRequest }: IModalCreateRegion) => {
  const { supplierId } = useParams() as { supplierId: string };
  const { states } = useBrasilStates();
  const [onQuery, setOnQuery] = useState<boolean>(false);
  const [tempState, setTempState] = useState('');

  const { cities } = useBrasilCities({ UF: convertStateName(tempState) });

  return (
    <Modal setModal={setModal} title="Cadastrar região">
      <Formik
        initialValues={{
          type: '',
          states: [],
          cities: [],
        }}
        validationSchema={schema}
        onSubmit={async (values: TSchema) => {
          setOnQuery(true);

          await Api.post('/suppliers/regions', { ...values, supplierId })
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
                onChange={(evt) => {
                  setFieldValue('type', evt.target.value);
                  setFieldValue('states', []);
                  setFieldValue('cities', []);
                }}
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
                  options={states.map(({ nome }) => ({
                    label: nome,
                    value: nome,
                  }))}
                  placeholder="Selecione"
                  isMulti
                  onChange={(evt) => {
                    const newStates = evt?.map(({ value }: { value: string }) => ({
                      state: value,
                    }));
                    setFieldValue('states', newStates);
                  }}
                />
              )}

              {values.type === 'city' && (
                <>
                  <ReactSelectComponent
                    isClearable={false}
                    label="Estado"
                    id="state2"
                    name="state2"
                    options={states.map(({ nome }) => ({
                      label: nome,
                      value: nome,
                    }))}
                    placeholder="Selecione"
                    onChange={(evt) => {
                      setTempState(evt.value);
                      setFieldValue('states', [{ state: evt.value }]);
                      setFieldValue('cities', []);
                    }}
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
                    value={values.cities?.map(({ city }) => ({
                      label: city,
                      value: city,
                    }))}
                    onChange={(evt) => {
                      const newCities = evt?.map(({ value }: { value: string }) => ({
                        city: value,
                      }));
                      setFieldValue('cities', newCities);
                    }}
                  />
                </>
              )}

              <Button center label="Cadastrar" type="submit" loading={onQuery} />
            </Form>
          </FormContainer>
        )}
      </Formik>
    </Modal>
  );
};
