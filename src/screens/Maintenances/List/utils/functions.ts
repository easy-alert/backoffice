/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Api } from '../../../../services/api';
import { catchHandler } from '../../../../utils/functions';
import { IRequestCategories, IRequestCreateCategory } from './types';

export const requestCategories = async ({
  setLoading,
  setCategories,
}: IRequestCategories) => {
  await Api.get('/backoffice/categories/list')
    .then((res) => {
      setCategories(res.data);
      setLoading(false);
    })
    .catch((err) => {
      catchHandler(err);
    });
};

export const requestCreateCategory = async ({
  values,
  setCreateMaintenancesIsOpen,
  resetForm,
  setCategories,
  categories,
}: IRequestCreateCategory) => {
  await Api.post('/backoffice/categories/create', {
    name: values.name,
  })
    .then((res) => {
      toast.dismiss();
      toast.success(res.data.ServerMessage.message);

      setCategories([
        ...categories!,
        {
          id: res.data.category.id,
          name: res.data.category.name,
          Maintenances: [],
        },
      ]);

      setCreateMaintenancesIsOpen(false);
      resetForm();
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
