import * as yup from 'yup';

export const schemaEditMaintenance = yup
  .object({
    element: yup
      .string()
      .required('O elemento deve ser preenchido.')
      .min(3, 'O elemento deve conter 3 ou mais caracteres.'),
    activity: yup
      .string()
      .required('A atividade deve ser preenchido.')
      .min(3, 'A atividade deve conter 3 ou mais caracteres.'),
    frequency: yup
      .string()
      .required('A frequencia deve ser preenchido.')
      .min(3, 'A Frequencia deve conter 3 ou mais caracteres.'),

    responsible: yup
      .string()
      .required('O nome deve ser preenchido.')
      .min(3, 'O nome deve conter 3 ou mais caracteres.'),
    source: yup.string().required('A fonte deve ser preenchido.').min(3, 'A fonte deve conter 3 ou mais caracteres.'),

    period: yup.string().required('O periodo deve ser preenchido.').min(1, 'O periodo deve ter no minomo o valor 1'),
    delay: yup.string().required('O delay deve ser preenchido.').min(1, 'O delay deve ter no minomo o valor 1'),

    observation: yup
      .string()
      .required('A observação deve ser preenchido.')
      .min(3, 'A observação deve conter 3 ou mais caracteres.'),
  })
  .required();
