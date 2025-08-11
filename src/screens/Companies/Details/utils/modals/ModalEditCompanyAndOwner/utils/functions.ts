/* eslint-disable @typescript-eslint/no-explicit-any */
// LIBS
import * as yup from 'yup';

// FUNCTIONS
import { handleToastify } from '@utils/toastifyResponses';
import { Api } from '@services/api';
import { unMask, uploadFile } from '@utils/functions';

// TYPES
import type { ICompany } from '../../../../../List/utils/types';
import type { IRequestEditCompanyAndOwner } from './types';

export const requestEditCompanyAndOwner = async ({
  data,
  setModal,
  company,
  setCompany,
  setOnQuery,
}: IRequestEditCompanyAndOwner) => {
  setOnQuery(true);

  const uri = 'account/companies/edit';

  let imageUrl: any;

  if (!data.image.length) {
    const { Location } = await uploadFile(data.image);
    imageUrl = Location;
  } else {
    imageUrl = company.image;
  }

  const body = {
    userId: company.UserCompanies[0].User.id,
    companyId: company.id,
    image: imageUrl,
    name: data.name,
    email: data.email,
    companyName: data.companyName,
    CNPJ: data.CNPJ !== '' ? unMask(data.CNPJ) : null,
    CPF: data.CPF !== '' ? unMask(data.CPF) : null,
    linkedExternalForPayment: data.linkedExternalForPayment.length
      ? data.linkedExternalForPayment.map((item) => unMask(item))
      : null,
    contactNumber: unMask(data.contactNumber),
    password: data.password !== '' ? data.password : null,
    isNotifyingOnceAWeek: data.isNotifyingOnceAWeek === 'semanalmente',
    canAccessChecklists: data.canAccessChecklists,
    canAccessTickets: data.canAccessTickets,
    receiveDailyDueReports: data.receiveDailyDueReports,
    receivePreviousMonthReports: data.receivePreviousMonthReports,
  };

  await Api.put(uri, body)
    .then((res) => {
      const updatedCompany: ICompany = {
        canAccessTickets: data.canAccessTickets,
        id: company.id,
        image: imageUrl,
        name: data.companyName,
        contactNumber: data.contactNumber,
        CNPJ: data.CNPJ,
        CPF: data.CPF,
        linkedExternalForPayment: data.linkedExternalForPayment,
        isBlocked: company.isBlocked,
        canAccessChecklists: data.canAccessChecklists,
        createdAt: company.createdAt,
        isNotifyingOnceAWeek: data.isNotifyingOnceAWeek === 'semanalmente',
        receiveDailyDueReports: data.receiveDailyDueReports,
        receivePreviousMonthReports: data.receivePreviousMonthReports,
        UserCompanies: [
          {
            User: {
              id: company.UserCompanies[0].User.id,
              name: data.name,
              email: data.email,
              lastAccess: company.UserCompanies[0].User.lastAccess,
            },
          },
        ],
      };

      setCompany(updatedCompany);
      setModal(false);
      handleToastify(res);
    })
    .catch((err: any) => {
      setOnQuery(false);
      handleToastify(err.response);
    });
};

// YUP
export const schemaModalEditCompanyAndOwnerWithCNPJ = yup
  .object({
    image: yup
      .mixed()
      .nullable()
      .notRequired()
      .test(
        'FileSize',
        'O tamanho da imagem excedeu o limite.',
        (value) => value.length || (value && value.size <= 5000000),
      )
      .test(
        'FileType',
        'Formato inválido.',
        (value) =>
          value.length ||
          (value &&
            (value.type === 'image/png' ||
              value.type === 'image/jpeg' ||
              value.type === 'image/jpg')),
      ),

    name: yup
      .string()
      .required('O nome deve ser preenchido.')
      .min(3, 'O nome deve conter 3 ou mais caracteres.'),

    email: yup
      .string()
      .email('Informe um e-mail válido.')
      .required('O e-mail deve ser preenchido.'),

    companyName: yup
      .string()
      .required('O nome da empresa deve ser preenchido.')
      .min(3, 'O nome da empresa deve conter 3 ou mais caracteres.'),

    contactNumber: yup
      .string()
      .required('O número de telefone deve ser preenchido.')
      .min(14, 'O número de telefone deve conter no mínimo 14 caracteres.'),

    CNPJ: yup.string().required('O CNPJ deve ser preenchido.').min(18, 'O CNPJ deve ser válido.'),

    linkedExternalForPayment: yup.array().of(yup.string()),

    password: yup.string().matches(/^(|.{8,})$/, 'A senha deve ter pelo menos 8 caracteres.'),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas não coincidem.')
      .when('password', {
        is: (password: string) => password && password.length > 0,
        then: yup.string().required('Confirme a nova senha.'),
      }),
  })
  .required();

// YUP
export const schemaModalEditCompanyAndOwnerWithCPF = yup
  .object({
    image: yup
      .mixed()
      .nullable()
      .notRequired()
      .test(
        'FileSize',
        'O tamanho da imagem excedeu o limite.',
        (value) => value.length || (value && value.size <= 5000000),
      )
      .test(
        'FileType',
        'Formato inválido.',
        (value) =>
          value.length ||
          (value &&
            (value.type === 'image/png' ||
              value.type === 'image/jpeg' ||
              value.type === 'image/jpg')),
      ),

    name: yup
      .string()
      .required('O nome deve ser preenchido.')
      .min(3, 'O nome deve conter 3 ou mais caracteres.'),

    email: yup
      .string()
      .email('Informe um e-mail válido.')
      .required('O e-mail deve ser preenchido.'),

    companyName: yup
      .string()
      .required('O nome da empresa deve ser preenchido.')
      .min(3, 'O nome da empresa deve conter 3 ou mais caracteres.'),

    contactNumber: yup
      .string()
      .required('O número de telefone deve ser preenchido.')
      .min(14, 'O número de telefone deve conter no mínimo 14 caracteres.'),

    CPF: yup.string().required('O CPF deve ser preenchido.').min(14, 'O CPF deve ser válido.'),

    linkedExternalForPayment: yup.array().of(yup.string()),

    password: yup.string().matches(/^(|.{8,})$/, 'A senha deve ter pelo menos 8 caracteres.'),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas não coincidem.')
      .when('password', {
        is: (password: string) => password && password.length > 0,
        then: yup.string().required('Confirme a nova senha.'),
      }),
  })
  .required();
