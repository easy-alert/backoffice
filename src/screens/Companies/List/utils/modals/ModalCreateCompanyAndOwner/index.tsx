// LIBS
import { useState } from 'react';
import { Form, Formik } from 'formik';

// COMPONENTS
import { Button } from '../../../../../../components/Buttons/Button';
import { FormikImageInput } from '../../../../../../components/Form/FormikImageInput';
import { FormikInput } from '../../../../../../components/Form/FormikInput';
import { Modal } from '../../../../../../components/Modal';
import * as Style from './styles';

// TYPES
import { IFormDataCompany } from '../../types';
import { IModalCreateCompanyAndOwner } from './utils/types';

// FUNCTIONS

import { applyMask } from '../../../../../../utils/functions';
import { requestCreateCompanyAndOWner, schemaModalCreateCompanyAndOwner } from './utils/functions';
import { FormikSelect } from '../../../../../../components/Form/FormikSelect';

export const ModalCreateCompanyAndOwner = ({
  setCompanies,
  page,
  setCount,
  setModal,
}: IModalCreateCompanyAndOwner) => {
  const [onQuery, setOnQuery] = useState<boolean>(false);

  return (
    <Modal title="Cadastrar usuário" setModal={setModal}>
      <Formik
        initialValues={{
          image: '',
          name: '',
          email: '',
          companyName: '',
          contactNumber: '',
          CNPJorCPF: '',
          password: '',
          confirmPassword: '',
          isNotifyingOnceAWeek: 'diariamente',
        }}
        validationSchema={schemaModalCreateCompanyAndOwner}
        onSubmit={async (data: IFormDataCompany) => {
          await requestCreateCompanyAndOWner({
            data,
            setModal,
            setOnQuery,
            setCompanies,
            page,
            setCount,
          });
        }}
      >
        {({ errors, values, touched, setFieldValue }) => (
          <Style.FormContainer>
            <Form>
              <FormikImageInput
                name="image"
                label="Logo"
                error={touched.image && errors.image ? errors.image : null}
                defaultImage={values.image}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(event: any) => {
                  if (event.target.files?.length) {
                    setFieldValue('image', event.target.files[0]);
                  }
                }}
              />
              <FormikInput
                label="Nome do responsável"
                name="name"
                value={values.name}
                error={touched.name && errors.name ? errors.name : null}
                placeholder="Ex: João Silva"
                maxLength={40}
              />
              <FormikInput
                label="E-mail"
                name="email"
                value={values.email}
                error={touched.email && errors.email ? errors.email : null}
                placeholder="Ex:  joao.silva@easyalert.com"
                maxLength={40}
              />
              <FormikInput
                label="Nome da empresa"
                name="companyName"
                value={values.companyName}
                error={touched.companyName && errors.companyName ? errors.companyName : null}
                placeholder="Ex: Easy Alert"
                maxLength={40}
              />

              <FormikInput
                label="Telefone"
                name="contactNumber"
                maxLength={
                  applyMask({
                    value: values.contactNumber,
                    mask: 'TEL',
                  }).length
                }
                value={values.contactNumber}
                error={touched.contactNumber && errors.contactNumber ? errors.contactNumber : null}
                placeholder="Ex: (00) 00000-0000"
                onChange={(e) => {
                  setFieldValue(
                    'contactNumber',
                    applyMask({ value: e.target.value, mask: 'TEL' }).value,
                  );
                }}
              />

              <FormikInput
                label="CNPJ/CPF"
                name="CNPJorCPF"
                placeholder="Insira o CNPJ ou CPF"
                error={touched.CNPJorCPF && errors.CNPJorCPF ? errors.CNPJorCPF : null}
                maxLength={
                  applyMask({
                    mask: 'CNPJ',
                    value: values.CNPJorCPF,
                  }).length
                }
                onChange={(e) => {
                  setFieldValue(
                    'CNPJorCPF',
                    applyMask({
                      mask: e.target.value.length > 14 ? 'CNPJ' : 'CPF',
                      value: e.target.value,
                    }).value,
                  );
                }}
              />

              <FormikSelect
                selectPlaceholderValue={values.isNotifyingOnceAWeek}
                name="isNotifyingOnceAWeek"
                label="Frequência de notificações"
              >
                <option value="diariamente">Diariamente</option>
                <option value="semanalmente">Semanalmente</option>
              </FormikSelect>

              <FormikInput
                type="password"
                label="Senha"
                name="password"
                value={values.password}
                error={touched.password && errors.password ? errors.password : null}
                placeholder="Crie uma senha de 8 caracteres"
                maxLength={120}
              />
              <FormikInput
                type="password"
                label="Confirmar senha"
                name="confirmPassword"
                value={values.confirmPassword}
                error={
                  touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : null
                }
                placeholder="Confirme a senha criada"
                maxLength={120}
              />
              <Button center label="Cadastrar" type="submit" loading={onQuery} />
            </Form>
          </Style.FormContainer>
        )}
      </Formik>
    </Modal>
  );
};
