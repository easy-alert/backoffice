import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Api } from '../../../../services/api';
import { catchHandler } from '../../../../utils/functions';
import { IFormDataCategory } from './types';

export const requestCreateCategory = ({
  data,
}: {
  data: IFormDataCategory;
}) => {
  Api.post('/backoffice/categories/create', {
    name: data.name,
  })
    .then((res) => {
      toast.dismiss();
      toast.success(res.data.ServerMessage.message);
    })
    .catch((err) => {
      catchHandler(err);
    });
};

// YUP
export const schemeCreateCategory = yup
  .object({
    name: yup
      .string()
      .required()
      .min(3, 'O nome da categoria deve conter 3 ou mais caracteres.'),
  })
  .required();
