// LIBS
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Api } from '../../../../../../../services/api';

// FUNCTIONS
import { catchHandler } from '../../../../../../../utils/functions';

// TYPES

import { IDeleteCategory, IEditCategory, ISortArray, ISortArrayteste } from './types';

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

export const alphabeticalElementOrder = ({ category, isSorted, setIsSorted }: ISortArray) => {
  if (isSorted) {
    category.Maintenances.sort((a, b) =>
      a.MaintenancesHistory[0].element < b.MaintenancesHistory[0].element ? -1 : 1,
    );
  } else {
    category.Maintenances.sort((a, b) =>
      a.MaintenancesHistory[0].element > b.MaintenancesHistory[0].element ? -1 : 1,
    );
  }
  setIsSorted(!isSorted);
};

export const alphabeticalActivityOrder = ({ category, isSorted, setIsSorted }: ISortArray) => {
  if (isSorted) {
    category.Maintenances.sort((a, b) =>
      a.MaintenancesHistory[0].activity < b.MaintenancesHistory[0].activity ? -1 : 1,
    );
  } else {
    category.Maintenances.sort((a, b) =>
      a.MaintenancesHistory[0].activity > b.MaintenancesHistory[0].activity ? -1 : 1,
    );
  }
  setIsSorted(!isSorted);
};

export const alphabeticalFrequencyOrder = ({ category, isSorted, setIsSorted }: ISortArray) => {
  if (isSorted) {
    category.Maintenances.sort((a, b) =>
      a.MaintenancesHistory[0].frequency < b.MaintenancesHistory[0].frequency ? -1 : 1,
    );
  } else {
    category.Maintenances.sort((a, b) =>
      a.MaintenancesHistory[0].frequency > b.MaintenancesHistory[0].frequency ? -1 : 1,
    );
  }
  setIsSorted(!isSorted);
};

export const alphabeticalResponsibleOrder = ({ category, isSorted, setIsSorted }: ISortArray) => {
  if (isSorted) {
    category.Maintenances.sort((a, b) =>
      a.MaintenancesHistory[0].responsible < b.MaintenancesHistory[0].responsible ? -1 : 1,
    );
  } else {
    category.Maintenances.sort((a, b) =>
      a.MaintenancesHistory[0].responsible > b.MaintenancesHistory[0].responsible ? -1 : 1,
    );
  }
  setIsSorted(!isSorted);
};

export const alphabeticalSourceOrder = ({ category, isSorted, setIsSorted }: ISortArray) => {
  if (isSorted) {
    category.Maintenances.sort((a, b) => (a.MaintenancesHistory[0].source < b.MaintenancesHistory[0].source ? -1 : 1));
  } else {
    category.Maintenances.sort((a, b) => (a.MaintenancesHistory[0].source > b.MaintenancesHistory[0].source ? -1 : 1));
  }
  setIsSorted(!isSorted);
};

export const alphabeticalOrder = ({ category, isSorted, setIsSorted, toSortString }: ISortArrayteste) => {
  if (isSorted) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    category.Maintenances.sort((a: any, b: any) =>
      a.MaintenancesHistory[0][toSortString] < b.MaintenancesHistory[0][toSortString] ? -1 : 1,
    );
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    category.Maintenances.sort((a: any, b: any) =>
      a.MaintenancesHistory[0][toSortString] > b.MaintenancesHistory[0][toSortString] ? -1 : 1,
    );
  }
  setIsSorted(!isSorted);
};
