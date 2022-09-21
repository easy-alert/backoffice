// LIBS
import { toast } from 'react-toastify';
import * as yup from 'yup';

// FUNCTIONS
import { Api } from '../../../../../../../../../services/api';
import { catchHandler } from '../../../../../../../../../utils/functions';

// TYPES
import { IRequestCreateMaintenance, IRequestListIntervals } from './types';

export const requestCreateMaintenance = async ({
  values,
  categoryId,
  // setModalState,
  // categories,
  // setCategories,
  setOnQuery,
}: IRequestCreateMaintenance) => {
  // setOnQuery(true);

  await Api.post('/backoffice/maintenances/create', {
    categoryId,
    element: values.element,
    activity: values.activity,
    frequency: Number(values.frequency),
    frequencyTimeIntervalId: values.frequencyTimeInterval,
    responsible: values.responsible,
    source: values.source,
    period: Number(values.period),
    periodTimeIntervalId: values.periodTimeInterval,
    delay: Number(values.delay),
    delayTimeIntervalId: values.delayTimeInterval,
    observation: values.observation !== '' ? values.observation : null,
  })
    .then((res) => {
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

export const requestListIntervals = async ({
  setTimeIntervals,
}: IRequestListIntervals) => {
  await Api.get('/time/interval/list', {})
    .then((res) => {
      setTimeIntervals(res.data);
    })
    .catch((err) => {
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
    // troacr o input pra number acho
    frequency: yup
      .string()
      .required('A frequência deve ser preenchida.')
      .matches(/^\d/, 'A frequência deve ser um número.'),

    frequencyTimeInterval: yup
      .string()
      .required('O intervalo da frequência deve ser preenchido.'),

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

    periodTimeInterval: yup
      .string()
      .required('O intervalo do período deve ser preenchido.'),

    delay: yup
      .string()
      .required('O delay deve ser preenchido.')
      .matches(/^\d/, 'O delay deve ser um número.'),

    delayTimeInterval: yup.string().required('O intervalo do delay deve ser preenchido.'),

    observation: yup.string().min(3, 'A observação deve conter 3 ou mais caracteres.'),
  })

  .required();
