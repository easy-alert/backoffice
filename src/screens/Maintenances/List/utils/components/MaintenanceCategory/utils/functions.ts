// LIBS
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Api } from '../../../../../../../services/api';

// FUNCTIONS
import { catchHandler } from '../../../../../../../utils/functions';

// TYPES

import { IDeleteCategory, IEditCategory } from './types';

export const requestEditCategory = async ({
  categoryId,
  values,
  setCategories,
  categories,
  setIsEditingCategoryName,
}: IEditCategory) => {
  toast.loading('Atualizando...');
  setIsEditingCategoryName(false);
  await Api.put('/backoffice/categories/edit', {
    categoryId,
    name: values.name,
  })
    .then((res) => {
      toast.dismiss();

      const categoriesEdit = categories;
      const index = categories.findIndex((category) => category.id === categoryId);
      categoriesEdit[index] = {
        id: categoryId,
        name: values.name,
        Maintenances: categoriesEdit[index].Maintenances,
      };
      setCategories([...categoriesEdit]);

      toast.success(res.data.ServerMessage.message);
    })
    .catch((err) => {
      catchHandler(err);
    });
};

export const requestDeleteCategory = async ({ categoryId, categories, setCategories }: IDeleteCategory) => {
  toast.loading('Atualizando...');

  await Api.delete('/backoffice/categories/delete', {
    data: {
      categoryId,
    },
  })
    .then((res) => {
      toast.dismiss();

      const categoriesEdit = categories;
      const index = categories.findIndex((category) => category.id === categoryId);
      categoriesEdit.splice(index, 1);
      setCategories([...categoriesEdit]);

      toast.success(res.data.ServerMessage.message);
    })
    .catch((err) => {
      catchHandler(err);
    });
};

// YUP
export const schemeEditCategory = yup
  .object({
    name: yup.string().required().min(3, 'O nome da categoria deve conter 3 ou mais caracteres.'),
  })
  .required();
