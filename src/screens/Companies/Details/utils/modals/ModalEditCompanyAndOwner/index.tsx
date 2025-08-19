// LIBS
import { useState } from 'react';

// LIBS
import { Form, Formik } from 'formik';

// GLOBAL COMPONENTS
import { IconButton } from '@components/Buttons/IconButton';
import { Button } from '@components/Buttons/Button';
import { FormikImageInput } from '@components/Form/FormikImageInput';
import { FormikInput } from '@components/Form/FormikInput';
import { Modal } from '@components/Modal';
import { FormikSelect } from '@components/Form/FormikSelect';
import { FormikCheckbox } from '@components/Form/FormikCheckbox';

// GLOBAL UTILS
import { applyMask, unMask } from '@utils/functions';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// UTILS
import { handleToastifyMessage } from '@utils/toastifyResponses';
import {
  requestEditCompanyAndOwner,
  schemaModalEditCompanyAndOwnerWithCPFAndCNPJ,
} from './utils/functions';

// STYLES
import * as Style from './styles';

// TYPES
import type { IFormDataCompanyForEdit } from '../../../../List/utils/types';
import type { IModalEditCompanyAndOwner } from './utils/types';

export const ModalEditCompanyAndOwner = ({
  company,
  companyOwner,
  setCompany,
  setModal,
}: IModalEditCompanyAndOwner) => {
  console.log('🚀 ~ ModalEditCompanyAndOwner ~ company:', company);
  const [onQuery, setOnQuery] = useState<boolean>(false);

  return (
    <Modal title="Editar empresa" setModal={setModal}>
      <Formik
        initialValues={{
          image: company.image,
          name: companyOwner.name,
          email: companyOwner.email,
          companyName: company.name,
          contactNumber: applyMask({
            value: company.contactNumber,
            mask: 'TEL',
          }).value,
          CPF: company.CPF ? applyMask({ value: company.CPF, mask: 'CPF' }).value : '',
          CNPJ: company.CNPJ ? applyMask({ value: company.CNPJ, mask: 'CNPJ' }).value : '',
          externalForPayment: '',
          linkedExternalForPayment: company.linkedExternalForPayment,
          password: '',
          confirmPassword: '',
          isNotifyingOnceAWeek: company.isNotifyingOnceAWeek ? 'semanalmente' : 'diariamente',
          canAccessChecklists: company.canAccessChecklists,
          canAccessTickets: company.canAccessTickets,
          receiveDailyDueReports: company.receiveDailyDueReports,
          receivePreviousMonthReports: company.receivePreviousMonthReports,
        }}
        validationSchema={schemaModalEditCompanyAndOwnerWithCPFAndCNPJ}
        onSubmit={async (data: IFormDataCompanyForEdit) => {
          await requestEditCompanyAndOwner({
            data,
            company,
            setCompany,
            setOnQuery,
            setModal,
          });
        }}
      >
        {({ errors, values, touched, setFieldValue, setFieldTouched }) => (
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
                placeholder="Ex: joao.silva@easyalert.com"
              />

              <FormikInput
                label="Nome da empresa"
                name="companyName"
                value={values.companyName}
                error={touched.companyName && errors.companyName ? errors.companyName : null}
                placeholder="Ex: Easy Alert"
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
                placeholder="Ex: (00) 0 0000-0000"
                onChange={(e) => {
                  setFieldValue(
                    'contactNumber',
                    applyMask({ value: e.target.value, mask: 'TEL' }).value,
                  );
                }}
              />

              <FormikInput
                name="CPF"
                label="CPF"
                maxLength={applyMask({ value: values.CPF, mask: 'CPF' }).length}
                value={values.CPF}
                error={touched.CPF && errors.CPF ? errors.CPF : null}
                placeholder="000.000.000-00"
                onChange={(e) =>
                  setFieldValue('CPF', applyMask({ value: e.target.value, mask: 'CPF' }).value)
                }
              />

              <FormikInput
                name="CNPJ"
                label="CNPJ"
                maxLength={applyMask({ value: values.CNPJ, mask: 'CNPJ' }).length}
                value={values.CNPJ}
                error={touched.CNPJ && errors.CNPJ ? errors.CNPJ : null}
                placeholder="00.000.000/0000-00"
                onChange={(e) =>
                  setFieldValue('CNPJ', applyMask({ value: e.target.value, mask: 'CNPJ' }).value)
                }
              />

              <div>
                <FormikInput
                  name="externalForPayment"
                  label="Outros pagantes"
                  maxLength={applyMask({ value: values.externalForPayment, mask: 'CNPJ' }).length}
                  value={
                    unMask(values.externalForPayment).length === 14
                      ? applyMask({ value: values.externalForPayment, mask: 'CNPJ' }).value
                      : applyMask({ value: values.externalForPayment, mask: 'CPF' }).value
                  }
                  error={
                    touched.externalForPayment && errors.externalForPayment
                      ? errors.externalForPayment
                      : null
                  }
                  placeholder="Insira o CNPJ ou CPF"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && values.externalForPayment.trim() !== '') {
                      e.preventDefault();

                      const toAdd: string[] = [];

                      values.externalForPayment.split(',').forEach((externalForPayment) => {
                        if (values.linkedExternalForPayment.includes(externalForPayment)) {
                          handleToastifyMessage({
                            message: 'Tipo de falha já cadastrado',
                            type: 'warning',
                          });

                          return;
                        }

                        toAdd.push(externalForPayment.trim());
                      });

                      setFieldValue('linkedExternalForPayment', [
                        ...values.linkedExternalForPayment,
                        ...toAdd,
                      ]);
                      setFieldValue('externalForPayment', '');
                      setFieldTouched('externalForPayment', false);
                    }
                  }}
                />

                <Style.ItemList>
                  {values.linkedExternalForPayment.map((externalPayment, index) => (
                    <Style.ItemContainer key={externalPayment}>
                      <Style.Item>
                        {unMask(externalPayment).length === 14
                          ? applyMask({ value: externalPayment, mask: 'CNPJ' }).value
                          : applyMask({ value: externalPayment, mask: 'CPF' }).value}
                      </Style.Item>

                      <IconButton
                        icon={icon.x}
                        size="16px"
                        onClick={() =>
                          setFieldValue(
                            'linkedExternalForPayment',
                            values.linkedExternalForPayment.filter((_, i) => i !== index),
                          )
                        }
                      />
                    </Style.ItemContainer>
                  ))}
                </Style.ItemList>
              </div>

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
                passwordPlaceholder
                placeholder="••••••••••"
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
                passwordPlaceholder
                placeholder="••••••••••"
                maxLength={120}
              />

              <FormikCheckbox label="Acesso às checklists" name="canAccessChecklists" />

              <FormikCheckbox label="Acesso aos chamados" name="canAccessTickets" />

              <FormikCheckbox label="Receber relatórios mensais" name="receiveDailyDueReports" />

              <FormikCheckbox
                label="Receber vencimentos diários"
                name="receivePreviousMonthReports"
              />

              <Button center label="Salvar" type="submit" loading={onQuery} />
            </Form>
          </Style.FormContainer>
        )}
      </Formik>
    </Modal>
  );
};
