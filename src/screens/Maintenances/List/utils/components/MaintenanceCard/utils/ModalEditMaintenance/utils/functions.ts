// LIBS
import { toast } from 'react-toastify';
import * as yup from 'yup';

// FUNCTIONS
import { Api } from '@services/api';
import { catchHandler } from '@utils/functions';

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
    instructions: values.instructions,
    priorityName: values.priorityName,

    // OCULTADO DA PLATAFORMA
    delay: 0,
    delayTimeIntervalId: values.delayTimeInterval,
    observation: values.observation !== '' ? values.observation : null,
  })
    .then((res) => {
      const categoriesEdit = structuredClone(categories);

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
      const categoriesEdit = structuredClone(categories);

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

const fieldLabels = {
  element: 'Elemento',
  activity: 'Atividade',
  frequency: 'Periodicidade',
  frequencyTimeInterval: 'Unidade da periodicidade',
  responsible: 'Responsável',
  source: 'Fonte',
  period: 'Prazo para execução',
  periodTimeInterval: 'Unidade do prazo para execução',
  delay: 'Delay',
  delayTimeInterval: 'Unidade do delay',
  observation: 'Observação',
};

// YUP
export const schemaEditMaintenance = yup.object({
  element: yup
    .string()
    .required(() => `O ${fieldLabels.element.toLowerCase()} deve ser preenchido.`)
    .min(3, `O ${fieldLabels.element.toLowerCase()} deve conter 3 ou mais caracteres.`),

  activity: yup
    .string()
    .required(() => `A ${fieldLabels.activity.toLowerCase()} deve ser preenchida.`)
    .min(3, `A ${fieldLabels.activity.toLowerCase()} deve conter 3 ou mais caracteres.`),

  frequency: yup
    .string()
    .required(() => `A ${fieldLabels.frequency.toLowerCase()} deve ser preenchida.`)
    .matches(/^\d/, `A ${fieldLabels.frequency.toLowerCase()} deve ser um número.`)
    .test(
      'greaterThanZero',
      `A ${fieldLabels.frequency.toLowerCase()} deve ser maior que zero.`,
      (value) => Number(value) > 0,
    ),

  frequencyTimeInterval: yup
    .string()
    .required(() => `A ${fieldLabels.frequencyTimeInterval.toLowerCase()} deve ser preenchida.`)
    .test(
      'hasValue',
      `A ${fieldLabels.frequencyTimeInterval.toLowerCase()} deve ser preenchida.`,
      (value) => value !== 'Selecione',
    ),

  responsible: yup
    .string()
    .required(() => `O ${fieldLabels.responsible.toLowerCase()} deve ser preenchido.`)
    .min(3, `O ${fieldLabels.responsible.toLowerCase()} deve conter 3 ou mais caracteres.`),

  source: yup
    .string()
    .required(() => `A ${fieldLabels.source.toLowerCase()} deve ser preenchida.`)
    .min(3, `A ${fieldLabels.source.toLowerCase()} deve conter 3 ou mais caracteres.`),

  period: yup
    .string()
    .required(() => `O ${fieldLabels.period.toLowerCase()} deve ser preenchido.`)
    .matches(/^\d/, `O ${fieldLabels.period.toLowerCase()} deve ser um número.`)
    .test(
      'greaterThanZero',
      `O ${fieldLabels.period.toLowerCase()} deve ser maior que zero.`,
      (value) => Number(value) > 0,
    ),

  periodTimeInterval: yup
    .string()
    .required(() => `A ${fieldLabels.periodTimeInterval.toLowerCase()} deve ser preenchida.`)
    .test(
      'hasValue',
      `A ${fieldLabels.periodTimeInterval.toLowerCase()} deve ser preenchida.`,
      (value) => value !== 'Selecione',
    ),

  delay: yup
    .string()
    .required(() => `O ${fieldLabels.delay.toLowerCase()} deve ser preenchido.`)
    .matches(/^\d/, `O ${fieldLabels.delay.toLowerCase()} deve ser um número.`),

  delayTimeInterval: yup
    .string()
    .required(() => `A ${fieldLabels.delayTimeInterval.toLowerCase()} deve ser preenchida.`)
    .test(
      'hasValue',
      `A ${fieldLabels.delayTimeInterval.toLowerCase()} deve ser preenchida.`,
      (value) => value !== 'Selecione',
    ),

  observation: yup
    .string()
    .min(3, `A ${fieldLabels.observation.toLowerCase()} deve conter 3 ou mais caracteres.`),
});
