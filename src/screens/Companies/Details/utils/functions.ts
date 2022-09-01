/* eslint-disable @typescript-eslint/no-explicit-any */
// LIBS
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Api } from '../../../../services/api';

// FUNCTIONS
import { uploadFile } from '../../../../utils/functions';

// TYPES
import {
  ICompany,
  IRequestChangeIsActiveAndIsDeleted,
  IRequestEditUser,
} from '../../types';

export const requestEditUser = async ({
  data,
  toggleModal,
  company,
  setCompany,
  navigate,
  setOnQuery,
}: IRequestEditUser) => {
  setOnQuery(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    contactNumber: data.contactNumber,
    CNPJ: data.CNPJ,
    CPF: data.CPF,
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
      toggleModal();
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

export const requestChangeIsBlocked = async ({
  company,
  setCompany,
  navigate,
}: IRequestChangeIsActiveAndIsDeleted) => {
  toast.loading('Atualizando...');

  await Api.put('/backoffice/companies/change/isBlocked', {
    companyId: company.id,
  })
    .then((res) => {
      setCompany({ ...company, isBlocked: !company.isBlocked });
      navigate(window.location.pathname, {
        state: { ...company, isBlocked: !company.isBlocked },
      });
      toast.dismiss();
      toast.success(res.data.ServerMessage.message);
    })
    .catch((err) => {
      toast.dismiss();
      if (err.response.data) {
        toast.error(err.response.data.ServerMessage.message);
      } else {
        toast.error('Erro de comunicação');
      }
    });
};

export const requestDeleteCompany = async ({
  company,
  navigate,
}: {
  company: ICompany;
  navigate: any;
}) => {
  toast.loading('Atualizando...');

  await Api.delete('/backoffice/companies/delete', {
    data: { companyId: company.id },
  })
    .then((res) => {
      navigate('/companies', { replace: true });
      toast.dismiss();
      toast.success(res.data.ServerMessage.message);
    })
    .catch((err) => {
      toast.dismiss();
      if (err.response.data) {
        toast.error(err.response.data.ServerMessage.message);
      } else {
        toast.error('Erro de comunicação');
      }
    });
};

// YUP
export const schemaModalEditCompany = yup
  .object({
    image: yup
      .mixed()
      .test('fileSize', 'O tamanho da imagem excede o limite.', (value) => {
        if (!value.length) return true; // attachment is optional
        return value[0].size <= 5000000;
      })
      .test('type', 'Formato inválido.', (value) => {
        if (!value.length) return true;
        return (
          value[0].type === 'image/jpeg' ||
          value[0].type === 'image/png' ||
          value[0].type === 'image/jpg'
        );
      }),

    name: yup
      .string()
      .min(3, 'O nome deve conter 3 ou mais caracteres.')
      .required('O nome deve ser preenchido.'),

    email: yup
      .string()
      .email('Informe um e-mail válido.')
      .required('O nome deve ser preenchido.'),

    companyName: yup
      .string()
      .min(3, 'O nome da empresa deve conter 3 ou mais caracteres.')
      .required('O nome deve ser preenchido.'),

    contactNumber: yup
      .string()
      .min(11, 'O número de telefone deve conter 11 caracteres.')
      .required('O nome deve ser preenchido.'),

    // CPF: yup
    //   .string()
    //   .min(11, 'O CPF deve ser válido.')
    //   .required('O nome deve ser preenchido.'),

    // CNPJ: yup
    //   .string()
    //   .min(11, 'O CNPJ deve ser válido.')
    //   .required('O nome deve ser preenchido.'),

    password: yup
      .string()
      .matches(/^(|.{8,})$/, 'A senha deve ter pelo menos 8 caracteres.'),

    confirmPassword: yup
      .string()
      .matches(/^(|.{8,})$/, 'A senha deve ter pelo menos 8 caracteres;')
      .oneOf([yup.ref('password'), null], 'As senhas não coincidem.'),
  })
  .required();
