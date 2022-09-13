// LIBS
import { useState } from 'react';
import { Form, Formik } from 'formik';

// COMPONENTS
import { Button } from '../../../../../../components/Buttons/Button';
import { Uploader } from '../../../../../../components/Uploader';
import { FormikInput } from '../../../../../../components/Form/FormikInput';
import { Switch } from '../../../../../../components/Buttons/SwitchButton';
import { Modal } from '../../../../../../components/Modal';
import * as Style from './styles';

// TYPES
import { IFormDataCompany } from '../../types';
import { IModalCreateCompanyAndOWner } from './utils/types';

// FUNCTIONS

import { applyMask } from '../../../../../../utils/functions';
import {
  requestCreateCompanyAndOWner,
  schemaModalCreateCompanyAndOwnerWithCNPJ,
  schemaModalCreateCompanyAndOwnerWithCPF,
} from './utils/functions';

export const ModalCreateCompanyAndOwner = ({
  setCompanies,
  page,
  setCount,
  modalState,
  setModalState,
}: IModalCreateCompanyAndOWner) => {
  const [onQuery, setOnQuery] = useState<boolean>(false);
  const [isCPF, setIsCPF] = useState<boolean>(false);

  return (
    <Modal
      title="Cadastrar usuário"
      modalState={modalState}
      setModalState={setModalState}
    >
      <Formik
        initialValues={{
          image: '',
          name: '',
          email: '',
          companyName: '',
          contactNumber: '',
          CPF: '',
          CNPJ: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={
          isCPF
            ? schemaModalCreateCompanyAndOwnerWithCPF
            : schemaModalCreateCompanyAndOwnerWithCNPJ
        }
        onSubmit={async (data: IFormDataCompany) => {
          await requestCreateCompanyAndOWner({
            data,
            setModalState,
            setOnQuery,
            setCompanies,
            page,
            setCount,
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

              <Style.SwitchWrapper>
                <h6>CNPJ</h6>
                <Switch
                  checked={isCPF}
                  onChange={() => {
                    setIsCPF((state) => !state);
                  }}
                />
                <h6>CPF</h6>
              </Style.SwitchWrapper>

              {isCPF && (
                <FormikInput
                  name="CPF"
                  maxLength={
                    applyMask({ value: values.CPF, mask: 'CPF' }).length
                  }
                  value={applyMask({ value: values.CPF, mask: 'CPF' }).value}
                  error={touched.CPF && errors.CPF ? errors.CPF : null}
                  placeholder="000.000.000-00"
                />
              )}

              {!isCPF && (
                <FormikInput
                  name="CNPJ"
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
                placeholder="Crie uma senha de 8 caracteres"
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
                placeholder="Confirme a senha criada"
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
      {/* <Uploader
            label="Logo"
            error={errors.image}
            register={{ ...register('image') }}
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
            placeholder="Ex: 48 99000-0000"
            error={errors.contactNumber}
            {...register('contactNumber')}
            maxLength={applyMask({ value: masksInput.TEL, mask: 'TEL' }).length}
            value={applyMask({ value: masksInput.TEL, mask: 'TEL' }).value}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              setMasksInput({ ...masksInput, TEL: evt.target.value });
            }}
          />
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

          <Input
            type="password"
            placeholder="Crie uma senha"
            label="Senha do usuário"
            error={errors.password}
            {...register('password')}
            maxLength={120}
          />
          <Input
            type="password"
            label="Confirmar senha"
            placeholder="Repita a senha criada"
            error={errors.confirmPassword}
            {...register('confirmPassword')}
            maxLength={120}
          /> */}
    </Modal>
  );
};
