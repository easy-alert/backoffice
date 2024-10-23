// LIBS
import { Api } from '../../../../services/api';
import { catchHandler } from '../../../../utils/functions';

// TYPES
import { IRequestUsersList } from './types';

// REQUESTS
export const requestUsersList = async ({
  setCompanies,
  setLoading,
  page,
  setCount,
  filter = '',
  setPage,
}: IRequestUsersList) => {
  const uri = `/companies/list`;
  const params = {
    page,
    search: filter,
  };

  await Api.get(uri, { params })
    .then((res) => {
      setCompanies(res.data.companiesAndOwners);
      setCount(res.data.companiesCount);
      if (setLoading) setLoading(false);
      if (setPage) setPage(1);
    })
    .catch((err) => {
      if (setLoading) setLoading(false);
      catchHandler(err);
    });
};
