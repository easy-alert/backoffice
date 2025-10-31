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
import { requestCreateCompanyAndOwner, schemaModalCreateCompanyAndOwner } from './utils/functions';
import { FormikSelect } from '../../../../../../components/Form/FormikSelect';
import { FormikCheckbox } from '../../../../../../components/Form/FormikCheckbox';

export const ModalCreateCompanyAndOwner = ({
  setCompanies,
  page,
  setCount,
  setModal,
}: IModalCreateCompanyAndOwner) => {
  const [onQuery, setOnQuery] = useState<boolean>(false);

  return (
    <Modal title="Cadastrar empresa" setModal={setModal}>
      <Formik
        initialValues={{
          image: '',
          name: '',
          email: '',
          companyName: '',
          clientType: '',
          contactNumber: '',
          CNPJorCPF: '',
          password: '',
          confirmPassword: '',
          isNotifyingOnceAWeek: 'diariamente',
          canAccessChecklists: false,
          canAccessTickets: false,
          receiveDailyDueReports: false,
          receivePreviousMonthReports: false,
        }}
        validationSchema={schemaModalCreateCompanyAndOwner}
        onSubmit={async (data: IFormDataCompany) => {
          await requestCreateCompanyAndOwner({
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
                label="Nome do responsável *"
                name="name"
                value={values.name}
                error={touched.name && errors.name ? errors.name : null}
                placeholder="Ex: João Silva"
              />
              <FormikInput
                label="E-mail *"
                name="email"
                value={values.email}
                error={touched.email && errors.email ? errors.email : null}
                placeholder="Ex:  joao.silva@easyalert.com"
              />
              <FormikInput
                label="Nome da empresa *"
                name="companyName"
                value={values.companyName}
                error={touched.companyName && errors.companyName ? errors.companyName : null}
                placeholder="Ex: Easy Alert"
              />

              <FormikSelect
                name="clientType"
                label="Tipo de cliente *"
                selectPlaceholderValue={values.clientType}
                error={touched.clientType && errors.clientType ? errors.clientType : null}
              >
                <option value="">Selecione o tipo</option>
                <option value="síndico morador">Síndico morador</option>
                <option value="síndico profissional">Síndico profissional</option>
                <option value="construtora">Construtora</option>
                <option value="adm">Administradora</option>
                <option value="outros">Outros</option>
                <option value="teste">Conta teste</option>
              </FormikSelect>

              <FormikInput
                label="Telefone *"
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
                label="CNPJ/CPF *"
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
                label="Senha *"
                name="password"
                value={values.password}
                error={touched.password && errors.password ? errors.password : null}
                placeholder="Crie uma senha de 8 caracteres"
                maxLength={120}
              />
              <FormikInput
                type="password"
                label="Confirmar senha *"
                name="confirmPassword"
                value={values.confirmPassword}
                error={
                  touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : null
                }
                placeholder="Confirme a senha criada"
                maxLength={120}
              />

              <FormikCheckbox label="Acesso às checklists" name="canAccessChecklists" />

              <FormikCheckbox label="Acesso aos chamados" name="canAccessTickets" />

              <FormikCheckbox label="Receber relatórios mensais" name="receiveDailyDueReports" />

              <FormikCheckbox
                label="Receber vencimentos diários"
                name="receivePreviousMonthReports"
              />

              <Button center label="Cadastrar" type="submit" loading={onQuery} />
            </Form>
          </Style.FormContainer>
        )}
      </Formik>
    </Modal>
  );
};
