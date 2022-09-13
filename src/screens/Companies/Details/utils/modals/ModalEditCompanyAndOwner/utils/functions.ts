/* eslint-disable @typescript-eslint/no-explicit-any */
// LIBS
import { toast } from 'react-toastify';
import * as yup from 'yup';

// FUNCTIONS
import { Api } from '../../../../../../../services/api';
import { unMask, uploadFile } from '../../../../../../../utils/functions';

// TYPES
import { ICompany } from '../../../../../List/utils/types';
import { IRequestEditCompanyAndOwner } from './types';

export const requestEditCompanyAndOwner = async ({
  data,
  setModalState,
  company,
  setCompany,
  navigate,
  setOnQuery,
}: IRequestEditCompanyAndOwner) => {
  setOnQuery(true);
  let imageUrl: any;

  if (data.image.length) {
    const { Location } = await uploadFile(data.image);
    imageUrl = Location;
  } else {
    imageUrl = company.image;
  }

  await Api.put('/backoffice/companies/edit', {
    userId: company.UserCompanies[0].User.id,
    companyId: company.id,
    image: imageUrl,
    name: data.name,
    email: data.email,
    companyName: data.companyName,
    contactNumber: unMask(data.contactNumber),
    CNPJ: unMask(data.CNPJ),
    CPF: unMask(data.CPF),
    password: data.password,
  })
    .then((res) => {
      const updatedCompany: ICompany = {
        id: company.id,
        image: imageUrl,
        name: data.companyName,
        contactNumber: data.contactNumber,
        CNPJ: data.CNPJ,
        CPF: data.CPF,
        isBlocked: data.isBlocked,
        createdAt: company.createdAt,
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

      navigate(window.location.pathname, { state: updatedCompany });
      setCompany(updatedCompany);
      setModalState(false);
      toast.success(res.data.ServerMessage.message);
    })
    .catch((err) => {
      setOnQuery(false);
      if (err.response.data) {
        toast.error(err.response.data.ServerMessage.message);
      } else {
        toast.error('Erro de comunicação');
      }
    });
};

// YUP
export const schemaModalCreateCompanyAndOwnerWithCNPJ = yup
  .object({
    image: yup.mixed(),

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
      .min(15, 'O número de telefone deve conter  no mínimo 15 caracteres.'),

    CNPJ: yup
      .string()
      .required('O CNPJ deve ser preenchido.')
      .min(18, 'O CNPJ deve ser válido.'),

    password: yup
      .string()
      .required('Informe a senha.')
      .min(8, 'Sua senha deve possuir 8 ou mais caracteres.'),

    confirmPassword: yup
      .string()
      .required('Informe a senha.')
      .min(8, 'Sua senha deve possuir 8 ou mais caracteres.')
      .oneOf([yup.ref('password'), null], 'As senhas não coincidem.'),
  })
  .required();

export const schemaModalCreateCompanyAndOwnerWithCPF = yup
  .object({
    image: yup.mixed(),

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
      .min(15, 'O número de telefone deve conter  no mínimo 15 caracteres.'),

    CPF: yup
      .string()
      .required('O CPF deve ser preenchido.')
      .min(14, 'O CPF deve ser válido.'),

    password: yup
      .string()
      .required('Informe a senha.')
      .min(8, 'Sua senha deve possuir 8 ou mais caracteres.'),

    confirmPassword: yup
      .string()
      .required('Informe a senha.')
      .min(8, 'Sua senha deve possuir 8 ou mais caracteres.')
      .oneOf([yup.ref('password'), null], 'As senhas não coincidem.'),
  })
  .required();
