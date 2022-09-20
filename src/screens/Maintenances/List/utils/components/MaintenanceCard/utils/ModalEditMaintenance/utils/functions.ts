// LIBS
import { toast } from 'react-toastify';
import * as yup from 'yup';

// FUNCTIONS
import { Api } from '../../../../../../../../../services/api';
import { catchHandler } from '../../../../../../../../../utils/functions';

// TYPES
import { IRequestEditMaintenance } from './types';

export const requestEditMaintenance = async ({
  maintenanceId,
  values,
}: IRequestEditMaintenance) => {
  toast.loading('Atualizando...');

  console.log(values);

  await Api.post('/backoffice/maintenances/edit', {
    maintenanceId,
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
      console.log(res.data);

      toast.dismiss();
      toast.success(res.data.ServerMessage.message);
    })
    .catch((err) => {
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
