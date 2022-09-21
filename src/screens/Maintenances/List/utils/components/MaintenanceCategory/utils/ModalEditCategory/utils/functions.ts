// LIBS
import { toast } from 'react-toastify';
import * as yup from 'yup';

// FUNCTIONS
import { Api } from '../../../../../../../../../services/api';
import { catchHandler } from '../../../../../../../../../utils/functions';

// TYPES
import { IDeleteCategory, IEditCategory, IRequestCreateMaintenance } from './types';

export const requestEditCategory = async ({
  categoryId,
  values,
  setCategories,
  categories,
  setModalState,
  setOnQuery,
}: IEditCategory) => {
  setOnQuery(true);
  await Api.put('/backoffice/categories/edit', {
    categoryId,
    name: values.categoryName,
  })
    .then((res) => {
      toast.dismiss();

      const categoriesEdit = categories;
      const index = categories.findIndex((category) => category.id === categoryId);
      categoriesEdit[index] = {
        id: categoryId,
        name: values.categoryName,
        Maintenances: categoriesEdit[index].Maintenances,
      };

      setCategories([...categoriesEdit]);

      setModalState(false);
      toast.success(res.data.ServerMessage.message);
    })
    .catch((err) => {
      setOnQuery(false);
      catchHandler(err);
    });
};

export const requestDeleteCategory = async ({
  categoryId,
  categories,
  setCategories,
  setOnQuery,
}: IDeleteCategory) => {
  setOnQuery(true);
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
      setOnQuery(false);
      catchHandler(err);
    });
};

export const requestCreateMaintenance = async ({
  values,
  categoryId,
  // setModalState,
  // categories,
  // setCategories,
  setOnQuery,
}: IRequestCreateMaintenance) => {
  // setOnQuery(true);
  toast.loading('Atualizando...');
  await Api.post('/backoffice/maintenances/create', {
    categoryId,
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
      toast.dismiss();

      // const maintenancesArray = categories
      //   .filter((element) => element.id === categoryId)
      //   .shift();

      // const newMaintenance:

      // maintenancesArray?.Maintenances.unshift()

      // setModalState(false);
      toast.success(res.data.ServerMessage.message);
    })
    .catch((err) => {
      setOnQuery(false);
      catchHandler(err);
    });
};

// YUP
export const schemaEditCategory = yup
  .object({
    categoryName: yup
      .string()
      .required('Nome da categoria é obrigatório.')
      .min(3, 'O nome da categoria deve conter 3 ou mais caracteres.'),
  })
  .required();
