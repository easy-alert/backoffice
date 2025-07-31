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
  setCompanyOwner,
  companyId,
  setLinkedUsers,
  setLinkedCompanies,
}: IRequestUserDetails) => {
  await Api.get(`/account/companies/list/details/${companyId}`)
    .then((res) => {
      const companyData = res.data;
      const companyOwner = companyData.UserCompanies.find(
        (userCompany: any) => userCompany.owner === true,
      ).User;

      const linkedUsers = companyData.UserCompanies.map((item: any) => ({
        id: item.User.id,
        email: item.User.email,
        lastAccess: item.User.lastAccess,
        name: item.User.name,
        owner: item.owner,
        isBlocked: item.User.isBlocked,
      }));

      setCompanyOwner(companyOwner);
      setCompany(companyData);
      setLinkedUsers(linkedUsers);
      setLinkedCompanies(companyData.Buildings);
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
  setOnQuery,
}: IRequestChangeIsActive) => {
  toast.loading('Atualizando...');
  setOnQuery(true);
  await Api.put('/account/companies/change/isBlocked', {
    companyId: company?.id,
  })
    .then((res) => {
      setCompany({ ...company, isBlocked: !company.isBlocked });
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
  await Api.delete('/account/companies/delete', {
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
