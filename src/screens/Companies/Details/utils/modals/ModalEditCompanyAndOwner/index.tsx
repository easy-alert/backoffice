// LIBS
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// COMPONENTS
import { Form, Formik } from 'formik';
import * as Style from './styles';
import { Button } from '../../../../../../components/Buttons/Button';
import { Uploader } from '../../../../../../components/Uploader';
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

  console.log(company.CNPJ);

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
          contactNumber: company.contactNumber,
          CPF: applyMask({ value: company.CNPJ, mask: 'CPF' }).value,
          CNPJ: applyMask({ value: company.CNPJ, mask: 'CNPJ' }).value,
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
        {({ errors, values, touched }) => (
          <Style.FormContainer>
            <Form>
              <Uploader
                name="image"
                label="Logo"
                error={touched.image && errors.image ? errors.image : null}
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
                <>
                  {console.log('CPF')}
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
                </>
              )}

              {company.CNPJ && (
                <>
                  {(console.log('CNPJ'), console.log(values.CNPJ))}

                  <FormikInput
                    name="CNPJ"
                    label="CNPJ"
                    maxLength={
                      applyMask({ value: values.CNPJ, mask: 'CNPJ' }).length
                    }
                    value={
                      applyMask({ value: values.CNPJ, mask: 'CNPJ' }).value
                    }
                    error={touched.CNPJ && errors.CNPJ ? errors.CNPJ : null}
                    placeholder="00.000.000/0000-00"
                  />
                </>
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

      {/* <Style.FormContainer as="form" onSubmit={onSubmit}>
        <Uploader
          label="Logo"
          error={errors.image}
          register={{ ...register('image') }}
          defaultImage={company.image}
        />
        <Input
          label="Nome do responsável"
          placeholder="Ex: João Silva"
          error={errors.name}
          {...register('name')}
          maxLength={40}
        />

        <Input
          label="E-mail"
          placeholder="Ex: joao.silva@ada.com.br"
          error={errors.email}
          {...register('email')}
          maxLength={50}
        />

        <Input
          label="Nome da empresa"
          placeholder="Ex: SATC"
          error={errors.companyName}
          {...register('companyName')}
          maxLength={40}
        />

        <Input
          label="Telefone"
          placeholder="Ex: (48) 9 9000-0000"
          error={errors.contactNumber}
          {...register('contactNumber')}
          maxLength={applyMask({ value: masksInput.TEL, mask: 'TEL' }).length}
          value={applyMask({ value: masksInput.TEL, mask: 'TEL' }).value}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setMasksInput({ ...masksInput, TEL: evt.target.value });
          }}
        />

        {company.CPF && (
          <Input
            label="CPF"
            placeholder="Ex: 000.000.000.00"
            error={errors.CPF}
            {...register('CPF')}
            maxLength={applyMask({ value: masksInput.CPF, mask: 'CPF' }).length}
            value={applyMask({ value: masksInput.CPF, mask: 'CPF' }).value}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              setMasksInput({ ...masksInput, CPF: evt.target.value });
            }}
          />
        )}

        {company.CNPJ && (
          <Input
            label="CNPJ"
            placeholder="Ex: 00.000.000/0000-00"
            error={errors.CNPJ}
            {...register('CNPJ')}
            maxLength={
              applyMask({ value: masksInput.CNPJ, mask: 'CNPJ' }).length
            }
            value={applyMask({ value: masksInput.CNPJ, mask: 'CNPJ' }).value}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              setMasksInput({ ...masksInput, CNPJ: evt.target.value });
            }}
          />
        )}

        <Input
          type="password"
          placeholder="••••••••••"
          passwordPlaceholder
          label="Senha do usuário"
          error={errors.password}
          {...register('password')}
          maxLength={120}
        />
        <Input
          type="password"
          placeholder="••••••••••"
          passwordPlaceholder
          label="Confirmar senha"
          error={errors.confirmPassword}
          {...register('confirmPassword')}
          maxLength={120}
        />

        <Button center label="Salvar" type="submit" loading={onQuery} />
      </Style.FormContainer> */}
    </Modal>
  );
};
