// LIBS
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Api } from '../../../../services/api';

// FUNCTIONS
import { unMask, uploadFile } from '../../../../utils/functions';

// TYPES
import { IRequestCreateUser, IRequestUsersList } from '../../types';

// REQUESTS
export const requestUsersList = async ({
  setCompanies,
  setLoading,
  page,
  setCount,
  filter = '',
  setPage,
}: IRequestUsersList) => {
  await Api.get(`/backoffice/companies/list?page=${page}&search=${filter}`)
    .then((res) => {
      setCompanies(res.data.companiesAndOwners);
      setCount(res.data.companiesCount);
      if (setLoading) setLoading(false);
      if (setPage) setPage(1);
    })
    .catch((err) => {
      if (err.response.data) {
        toast.error(err.response.data.ServerMessage.message);
      } else {
        toast.error('Erro de comunicação');
      }
    });
};

export const requestCreateUser = async ({
  data,
  toggleModal,
  setCompanies,
  page,
  setCount,
  setOnQuery,
}: IRequestCreateUser) => {
  // CHAGE HERE
  setOnQuery(true);
  let imageUrl;

  if (data.image.length) {
    const { Location } = await uploadFile(data.image);
    imageUrl = Location;
  } else {
    imageUrl = `https://avatars.dicebear.com/api/initials/${data.name.replace(
      /\s/g,
      '%20',
    )}.svg`;
  }

  await Api.post('/backoffice/companies/create', {
    image: imageUrl,
    name: data.name,
    email: data.email,
    password: data.password,
    companyName: data.companyName,
    CNPJ: data.CNPJ ? unMask(data.CNPJ) : null,
    CPF: data.CPF ? unMask(data.CPF) : null,
    contactNumber: unMask(data.contactNumber),
  })
    .then((res) => {
      requestUsersList({
        setCompanies,
        page,
        setCount,
      });
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

// YUP
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
