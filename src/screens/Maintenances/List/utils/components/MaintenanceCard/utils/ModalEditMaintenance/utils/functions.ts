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
  setModal,
  categories,
  setCategories,
  categoryId,
}: IRequestEditMaintenance) => {
  setOnQuery(true);

  await Api.put('/maintenances/edit', {
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
      const categoriesEdit = categories;

      const categoryIndex = categories.findIndex((category) => category.id === categoryId);

      const maintenanceIndex = categoriesEdit[categoryIndex].Maintenances.findIndex(
        (maintenance) => maintenance.id === maintenanceId,
      );

      categoriesEdit[categoryIndex].Maintenances[maintenanceIndex] = res.data.maintenance;

      setCategories([...categoriesEdit]);

      setModal(false);
      toast.success(res.data.ServerMessage.message);
    })
    .catch((err) => {
      setOnQuery(false);
      catchHandler(err);
    });
};

export const requestDeleteMaintenance = async ({
  categoryId,
  maintenanceId,
  setOnQuery,
  setModal,
  categories,
  setCategories,
}: IDeleteMaintenance) => {
  setOnQuery(true);
  await Api.delete('/maintenances/delete', {
    data: {
      maintenanceId,
    },
  })
    .then((res) => {
      const categoriesEdit = categories;

      const categoryIndex = categories.findIndex((category) => category.id === categoryId);

      const maintenanceIndex = categoriesEdit[categoryIndex].Maintenances.findIndex(
        (maintenance) => maintenance.id === maintenanceId,
      );

      categoriesEdit[categoryIndex].Maintenances.splice(maintenanceIndex, 1);

      setCategories([...categoriesEdit]);
      setModal(false);
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
      .required('A periodicidade deve ser preenchida.')
      .matches(/^\d/, 'A periodicidade deve ser um número.')
      .test(
        'greaterThanZero',
        'A periodicidade deve ser maior que zero.',
        (value) => Number(value) > 0,
      ),

    frequencyTimeInterval: yup
      .string()
      .required('O intervalo da periodicidade deve ser preenchido.')
      .test(
        'hasValue',
        'O intervalo da periodicidade deve ser preenchido.',
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
      .required('O tempo para resposta deve ser preenchido.')
      .matches(/^\d/, 'O tempo para resposta deve ser um número.')
      .test(
        'greaterThanZero',
        'O tempo para resposta deve ser maior que zero.',
        (value) => Number(value) > 0,
      ),

    periodTimeInterval: yup
      .string()
      .required('O intervalo do tempo para resposta deve ser preenchido.')
      .test(
        'hasValue',
        'O intervalo do tempo para resposta deve ser preenchido.',
        (value) => value !== 'Selecione',
      ),

    delay: yup
      .string()
      .required('O delay deve ser preenchido.')
      .matches(/^\d/, 'O delay deve ser um número.'),

    delayTimeInterval: yup
      .string()
      .required('O intervalo do delay deve ser preenchido.')
      .test(
        'hasValue',
        'O intervalo do delay deve ser preenchido.',
        (value) => value !== 'Selecione',
      ),

    observation: yup.string().min(3, 'A observação deve conter 3 ou mais caracteres.'),
  })

  .required();
