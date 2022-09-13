// LIBS
import { toast } from 'react-toastify';
import { Api } from '../../../../services/api';

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
  await Api.get(`/backoffice/companies/list?page=${page}&search=${filter}`)
    .then((res) => {
      setCompanies(res.data.companiesAndOwners);
      setCount(res.data.companiesCount);
      if (setLoading) setLoading(false);
      if (setPage) setPage(1);
    })
    .catch((err) => {
      if (err.response.data) {
        toast.error(err.response.data.ServerMessage.message);
      } else {
        toast.error('Erro de comunicação');
      }
    });
};
