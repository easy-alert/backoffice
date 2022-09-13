/* eslint-disable @typescript-eslint/no-explicit-any */
// LIBS
import { toast } from 'react-toastify';
import { Api } from '../../../../services/api';

// TYPES
import { IRequestChangeIsActiveAndIsDeleted } from './types';
import { ICompany } from '../../List/utils/types';
import { catchHandler } from '../../../../utils/functions';

export const requestChangeIsBlocked = async ({
  company,
  setCompany,
  navigate,
}: IRequestChangeIsActiveAndIsDeleted) => {
  toast.loading('Atualizando...');

  await Api.put('/backoffice/companies/change/isBlocked', {
    companyId: company.id,
  })
    .then((res) => {
      setCompany({ ...company, isBlocked: !company.isBlocked });
      navigate(window.location.pathname, {
        state: { ...company, isBlocked: !company.isBlocked },
      });
      toast.dismiss();
      toast.success(res.data.ServerMessage.message);
    })
    .catch((err) => {
      catchHandler(err);
    });
};

export const requestDeleteCompany = async ({
  company,
  navigate,
}: {
  company: ICompany;
  navigate: any;
}) => {
  toast.loading('Atualizando...');

  await Api.delete('/backoffice/companies/delete', {
    data: { companyId: company.id },
  })
    .then((res) => {
      navigate('/companies', { replace: true });
      toast.dismiss();
      toast.success(res.data.ServerMessage.message);
    })
    .catch((err) => {
      catchHandler(err);
    });
};
