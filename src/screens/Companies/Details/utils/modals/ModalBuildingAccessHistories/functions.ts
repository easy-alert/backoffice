// LIBS

// FUNCTIONS
import { Api } from '../../../../../../services/api';
import { catchHandler } from '../../../../../../utils/functions';
import { IRequestCompanyBuildingAccessHistories } from './types';

// TYPES

export const requestCompanyBuildingAccessHistories = async ({
  setData,
  setLoading,
  companyId,
}: IRequestCompanyBuildingAccessHistories) => {
  await Api.get(`/account/companies/list/access-history/${companyId}`)
    .then((res) => {
      setData(res.data);
      setLoading(false);
    })
    .catch((err) => {
      catchHandler(err);
    });
};
