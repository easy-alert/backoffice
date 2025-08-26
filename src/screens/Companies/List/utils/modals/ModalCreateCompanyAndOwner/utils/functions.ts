// LIBS
import { toast } from 'react-toastify';
import * as yup from 'yup';

// FUNCTIONS
import { Api } from '@services/api';
import { catchHandler, unMask, uploadFile } from '@utils/functions';

// TYPES
import { IRequestCreateCompanyAndOwner } from './types';
import { requestUsersList } from '../../../functions';

export const requestCreateCompanyAndOwner = async ({
  data,
  setCompanies,
  page,
  setCount,
  setOnQuery,
  setModal,
}: IRequestCreateCompanyAndOwner) => {
  setOnQuery(true);
  let imageUrl;

  if (data.image) {
    const { Location } = await uploadFile(data.image);
    imageUrl = Location;
  } else {
    imageUrl = `https://api.dicebear.com/7.x/initials/png?seed=${encodeURI(data.companyName)}`;
  }

  await Api.post('/account/companies/create', {
    image: imageUrl,
    name: data.name,
    email: data.email.toLowerCase(),
    password: data.password,
    companyName: data.companyName,
    CNPJ: data.CNPJorCPF?.length === 18 ? unMask(data.CNPJorCPF) : null,
    CPF: data.CNPJorCPF?.length === 14 ? unMask(data.CNPJorCPF) : null,
    contactNumber: unMask(data.contactNumber),
    isNotifyingOnceAWeek: data.isNotifyingOnceAWeek === 'semanalmente',
    canAccessChecklists: data.canAccessChecklists,
    canAccessTickets: data.canAccessTickets,
    receiveDailyDueReports: data.receiveDailyDueReports,
    receivePreviousMonthReports: data.receivePreviousMonthReports,
    clientType: data.clientType,
  })
    .then((res) => {
      requestUsersList({
        setCompanies,
        page,
        setCount,
      });
      setModal(false);
      toast.success(res.data.ServerMessage.message);
    })
    .catch((err) => {
      setOnQuery(false);
      catchHandler(err);
    });
};

// YUP
export const schemaModalCreateCompanyAndOwner = yup
  .object({
    image: yup
      .mixed()
      .nullable()
      .notRequired()
      .test(
        'FileSize',
        'O tamanho da imagem excedeu o limite.',
        (value) => !value || (value && value.size <= 5000000),
      )
      .test(
        'FileType',
        'Formato inválido.',
        (value) =>
          !value ||
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

    clientType: yup.string().required('O tipo de cliente deve ser selecionado.'),

    contactNumber: yup
      .string()
      .required('O número de telefone deve ser preenchido.')
      .min(14, 'O número de telefone deve conter no mínimo 14 caracteres.'),

    CNPJorCPF: yup
      .string()
      .required('Um CNPJ ou um CPF deve ser preenchido.')
      .test(
        'len',
        'Informe um CNPJ ou um CPF válido.',
        (val) => val?.length === 14 || val?.length === 18,
      ),

    password: yup
      .string()
      .required('A senha deve ser preenchida.')
      .min(8, 'Sua senha deve possuir 8 ou mais caracteres.'),

    confirmPassword: yup
      .string()
      .required('O confirmar senha deve ser preenchido.')
      .min(8, 'Sua senha deve possuir 8 ou mais caracteres.')
      .oneOf([yup.ref('password'), null], 'As senhas não coincidem.'),
  })
  .required();
