/* eslint-disable @typescript-eslint/no-explicit-any */
// LIBS
import { toast } from 'react-toastify';
import { Api } from '../../../../services/api';

// TYPES
import { IRequestChangeIsActive, IRequestChangeIsDeleted, IRequestUserDetails } from './types';
import { catchHandler } from '../../../../utils/functions';

export const requestUserDetails = async ({
  setLoading,
  setCompany,
  companyId,
}: IRequestUserDetails) => {
  await Api.get(`/companies/list/details/${companyId}`)
    .then((res) => {
      setCompany(res.data);
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      catchHandler(err);
    });
};

export const requestChangeIsBlocked = async ({
  company,
  setCompany,
  navigate,
  setOnQuery,
}: IRequestChangeIsActive) => {
  toast.loading('Atualizando...');
  setOnQuery(true);
  await Api.put('/companies/change/isBlocked', {
    companyId: company?.id,
  })
    .then((res) => {
      setCompany({ ...company, isBlocked: !company.isBlocked });
      navigate(window.location.pathname, {
        state: { ...company, isBlocked: !company.isBlocked },
      });
      toast.dismiss();
      toast.success(res.data.ServerMessage.message);
      setOnQuery(false);
    })
    .catch((err) => {
      setOnQuery(false);
      catchHandler(err);
    });
};

export const requestDeleteCompany = async ({
  company,
  navigate,
  setOnQuery,
}: IRequestChangeIsDeleted) => {
  toast.loading('Atualizando...');
  setOnQuery(true);
  await Api.delete('/companies/delete', {
    data: { companyId: company?.id },
  })
    .then((res) => {
      navigate('/companies', { replace: true });
      toast.dismiss();
      toast.success(res.data.ServerMessage.message);
      setOnQuery(false);
    })
    .catch((err) => {
      setOnQuery(false);
      catchHandler(err);
    });
};
