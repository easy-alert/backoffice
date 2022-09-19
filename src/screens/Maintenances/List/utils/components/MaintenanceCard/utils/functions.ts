import * as yup from 'yup';

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

    frequency: yup.string().required('A frequência deve ser preenchida.'),
    responsible: yup
      .string()
      .required('O nome deve ser preenchido.')
      .min(3, 'O nome deve conter 3 ou mais caracteres.'),

    source: yup.string().required('A fonte deve ser preenchida.').min(3, 'A fonte deve conter 3 ou mais caracteres.'),

    period: yup.string().required('O período deve ser preenchido.'),

    delay: yup.string().required('O delay deve ser preenchido.').min(1, 'O delay deve ter no minomo o valor 1'),

    observation: yup
      .string()
      .required('A observação deve ser preenchida.')
      .min(3, 'A observação deve conter 3 ou mais caracteres.'),
  })
  .required();
