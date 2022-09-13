// LIBS
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// COMPONENTS
import { Form, Formik } from 'formik';
import * as Style from './styles';
import { Button } from '../../../../../../components/Buttons/Button';
import { FormikImageInput } from '../../../../../../components/Form/FormikImageInput';
import { FormikInput } from '../../../../../../components/Form/FormikInput';
import { Modal } from '../../../../../../components/Modal';

// TYPES
import { IModalEditCompanyAndOwner } from './utils/types';

// FUNCTIONS
import { IFormDataCompany } from '../../../../List/utils/types';

import { applyMask } from '../../../../../../utils/functions';
import {
  requestEditCompanyAndOwner,
  schemaModalCreateCompanyAndOwnerWithCNPJ,
  schemaModalCreateCompanyAndOwnerWithCPF,
} from './utils/functions';

export const ModalEditCompanyAndOwner = ({
  setCompany,
  company,
  setModalState,
  modalState,
}: IModalEditCompanyAndOwner) => {
  const navigate = useNavigate();
  const [onQuery, setOnQuery] = useState<boolean>(false);

  return (
    <Modal
      title="Editar usuário"
      modalState={modalState}
      setModalState={setModalState}
    >
      <Formik
        initialValues={{
          image: company.image,
          name: company.UserCompanies[0].User.name,
          email: company.UserCompanies[0].User.email,
          companyName: company.name,
          contactNumber: applyMask({
            value: company.contactNumber,
            mask: 'CPF',
          }).value,
          CPF:
            company.CPF && applyMask({ value: company.CPF, mask: 'CPF' }).value,
          CNPJ:
            company.CNPJ &&
            applyMask({ value: company.CNPJ, mask: 'CNPJ' }).value,
          password: '',
          confirmPassword: '',
        }}
        validationSchema={
          company.CPF
            ? schemaModalCreateCompanyAndOwnerWithCPF
            : schemaModalCreateCompanyAndOwnerWithCNPJ
        }
        onSubmit={async (data: IFormDataCompany) => {
          await requestEditCompanyAndOwner({
            data,
            company,
            setCompany,
            navigate,
            setOnQuery,
            setModalState,
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
              />
              <FormikInput
                label="E-mail"
                name="email"
                value={values.email}
                error={touched.email && errors.email ? errors.email : null}
                placeholder="Ex:  joao.silva@easyalert.com"
              />
              <FormikInput
                label="Nome da empresa"
                name="companyName"
                value={values.companyName}
                error={
                  touched.companyName && errors.companyName
                    ? errors.companyName
                    : null
                }
                placeholder="Ex: SATC"
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
                value={
                  applyMask({
                    value: values.contactNumber,
                    mask: 'TEL',
                  }).value
                }
                error={
                  touched.contactNumber && errors.contactNumber
                    ? errors.contactNumber
                    : null
                }
                placeholder="Ex: (00) 0 0000-0000"
              />

              {company.CPF && (
                <FormikInput
                  name="CPF"
                  label="CPF"
                  maxLength={
                    applyMask({ value: values.CPF, mask: 'CPF' }).length
                  }
                  value={applyMask({ value: values.CPF, mask: 'CPF' }).value}
                  error={touched.CPF && errors.CPF ? errors.CPF : null}
                  placeholder="000.000.000-00"
                />
              )}

              {company.CNPJ && (
                <FormikInput
                  name="CNPJ"
                  label="CNPJ"
                  maxLength={
                    applyMask({ value: values.CNPJ, mask: 'CNPJ' }).length
                  }
                  value={applyMask({ value: values.CNPJ, mask: 'CNPJ' }).value}
                  error={touched.CNPJ && errors.CNPJ ? errors.CNPJ : null}
                  placeholder="00.000.000/0000-00"
                />
              )}
              <FormikInput
                type="password"
                label="Senha"
                name="password"
                value={values.password}
                error={
                  touched.password && errors.password ? errors.password : null
                }
                passwordPlaceholder
                placeholder="••••••••••"
              />
              <FormikInput
                type="password"
                label="Confirmar senha"
                name="confirmPassword"
                value={values.confirmPassword}
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : null
                }
                passwordPlaceholder
                placeholder="••••••••••"
              />
              <Button
                center
                label="Cadastrar"
                type="submit"
                loading={onQuery}
              />
            </Form>
          </Style.FormContainer>
        )}
      </Formik>
    </Modal>
  );
};
