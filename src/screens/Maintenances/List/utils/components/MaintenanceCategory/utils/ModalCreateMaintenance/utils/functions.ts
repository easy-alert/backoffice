// LIBS
import { toast } from 'react-toastify';
import * as yup from 'yup';

// FUNCTIONS
import { Api } from '../../../../../../../../../services/api';
import { catchHandler } from '../../../../../../../../../utils/functions';

// TYPES
import { IRequestCreateMaintenance } from './types';

export const requestCreateMaintenance = async ({
  values,
  categoryId,
  // setModalState,
  // categories,
  // setCategories,
  setOnQuery,
}: IRequestCreateMaintenance) => {
  // setOnQuery(true);
  toast.loading('Atualizando...');
  await Api.post('/backoffice/maintenances/create', {
    categoryId,
    element: values.element,
    activity: values.activity,
    frequency: Number(values.frequency),
    responsible: values.responsible,
    source: values.source,
    period: Number(values.period),
    delay: Number(values.delay),
    observation: values.observation ?? null,
  })
    .then((res) => {
      toast.dismiss();

      // const maintenancesArray = categories
      //   .filter((element) => element.id === categoryId)
      //   .shift();

      // const newMaintenance:

      // maintenancesArray?.Maintenances.unshift()

      // setModalState(false);
      toast.success(res.data.ServerMessage.message);
    })
    .catch((err) => {
      setOnQuery(false);
      catchHandler(err);
    });
};

// YUP
export const schemaCreateMaintenance = yup

  .object({
    element: yup
      .string()
      .required('O elemento deve ser preenchido.')
      .min(3, 'O elemento deve conter 3 ou mais caracteres.'),

    activity: yup
      .string()
      .required('A atividade deve ser preenchida.')
      .min(3, 'A atividade deve conter 3 ou mais caracteres.'),

    frequency: yup
      .string()
      .required('A frequência deve ser preenchida.')
      .matches(/^\d/, 'A frequência deve ser um número.'),

    responsible: yup
      .string()
      .required('O nome do responsável deve ser preenchido.')
      .min(3, 'O nome deve conter 3 ou mais caracteres.'),

    source: yup
      .string()
      .required('A fonte deve ser preenchida.')
      .min(3, 'A fonte deve conter 3 ou mais caracteres.'),

    period: yup
      .string()
      .required('O período deve ser preenchido.')
      .matches(/^\d/, 'O período deve ser um número.'),

    delay: yup
      .string()
      .required('O delay deve ser preenchido.')
      .matches(/^\d/, 'O delay deve ser um número.'),

    observation: yup
      .string()
      .required('A observação deve ser preenchida.')
      .min(3, 'A observação deve conter 3 ou mais caracteres.'),
  })

  .required();
