// LIBS
import { toast } from 'react-toastify';
import * as yup from 'yup';

// FUNCTIONS
import { Api } from '../../../../../../../../../services/api';
import { unMask, uploadFile } from '../../../../../../../../../utils/functions';
import { requestUsersList } from '../../../../../../../../Companies/List/utils/functions';

// TYPES
import { IRequestCreateCompanyAndOWner } from './types';

export const requestCreateCompanyAndOWner = async ({
  data,
  setModalState,
  setCompanies,
  page,
  setCount,
  setOnQuery,
}: IRequestCreateCompanyAndOWner) => {
  setOnQuery(true);
  let imageUrl;

  if (data.image) {
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
    CNPJ: data.CNPJ !== '' ? unMask(data.CNPJ) : null,
    CPF: data.CPF !== '' ? unMask(data.CPF) : null,
    contactNumber: unMask(data.contactNumber),
  })
    .then((res) => {
      requestUsersList({
        setCompanies,
        page,
        setCount,
      });
      setModalState(false);
      toast.success(res.data.ServerMessage.message);
      setOnQuery(false);
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
export const schemaEditMaintenance = yup

  .object({
    element: yup

      .string()

      .required('O elemento deve ser preenchido.')

      .min(3, 'O elemento deve conter 3 ou mais caracteres.'),

    activity: yup

      .string()

      .required('A atividade deve ser preenchida.')

      .min(3, 'A atividade deve conter 3 ou mais caracteres.'),

    frequency: yup.string().required('A periodicidade deve ser preenchida.'),

    responsible: yup

      .string()

      .required('O nome do responsável deve ser preenchido.')

      .min(3, 'O nome deve conter 3 ou mais caracteres.'),

    source: yup
      .string()
      .required('A fonte deve ser preenchida.')
      .min(3, 'A fonte deve conter 3 ou mais caracteres.'),

    period: yup.string().required('O período deve ser preenchido.'),

    delay: yup
      .string()
      .required('O delay deve ser preenchido.')
      .min(1, 'O delay deve ter no minomo o valor 1'),

    observation: yup

      .string()

      .required('A observação deve ser preenchida.')

      .min(3, 'A observação deve conter 3 ou mais caracteres.'),
  })

  .required();
