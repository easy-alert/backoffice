// LIBS
import { toast } from 'react-toastify';
import * as yup from 'yup';

// FUNCTIONS
import { Api } from '../../../../../../../../../services/api';
import { catchHandler } from '../../../../../../../../../utils/functions';

// TYPES
import { IDeleteMaintenance, IRequestEditMaintenance } from './types';

export const requestEditMaintenance = async ({
  maintenanceId,
  values,
  setOnQuery,
}: IRequestEditMaintenance) => {
  setOnQuery(true);

  await Api.post('/backoffice/maintenances/edit', {
    maintenanceId,
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
      // eslint-disable-next-line no-console
      console.log(res.data);

      toast.success(res.data.ServerMessage.message);
    })
    .catch((err) => {
      setOnQuery(false);
      catchHandler(err);
    });
};

export const requestDeleteMaintenance = async ({
  maintenanceId,
  setOnQuery,
}: IDeleteMaintenance) => {
  setOnQuery(true);
  await Api.delete('/backoffice/maintenances/delete', {
    data: {
      maintenanceId,
    },
  })
    .then((res) => {
      toast.success(res.data.ServerMessage.message);
    })
    .catch((err) => {
      setOnQuery(false);
      catchHandler(err);
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

    frequency: yup
      .string()
      .required('A frequência deve ser preenchida.')
      .matches(/^\d/, 'A frequência deve ser um número.')
      .test(
        'greaterThanZero',
        'A frequência deve ser maior que zero.',
        (value) => Number(value) > 0,
      ),

    frequencyTimeInterval: yup
      .string()
      .required('O intervalo da frequência deve ser preenchido.')
      .test(
        'hasValue',
        'O intervalo do período deve ser preenchido.',
        (value) => value !== 'Selecione',
      ),

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
      .matches(/^\d/, 'O período deve ser um número.')
      .test(
        'greaterThanZero',
        'O período deve ser maior que zero.',
        (value) => Number(value) > 0,
      ),

    periodTimeInterval: yup
      .string()
      .required('O intervalo do período deve ser preenchido.')
      .test(
        'hasValue',
        'O intervalo do período deve ser preenchido.',
        (value) => value !== 'Selecione',
      ),

    delay: yup
      .string()
      .required('O delay deve ser preenchido.')
      .matches(/^\d/, 'O delay deve ser um número.')
      .test(
        'greaterThanZero',
        'O delay deve ser maior que zero.',
        (value) => Number(value) > 0,
      ),

    delayTimeInterval: yup
      .string()
      .required('O intervalo do delay deve ser preenchido.')
      .test(
        'hasValue',
        'O intervalo do período deve ser preenchido.',
        (value) => value !== 'Selecione',
      ),

    observation: yup.string().min(3, 'A observação deve conter 3 ou mais caracteres.'),
  })

  .required();
