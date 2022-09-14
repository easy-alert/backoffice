import * as yup from 'yup';

// YUP
export const schemeEditCategory = yup
  .object({
    name: yup
      .string()
      .required()
      .min(3, 'O nome da categoria deve conter 3 ou mais caracteres.'),
  })
  .required();
