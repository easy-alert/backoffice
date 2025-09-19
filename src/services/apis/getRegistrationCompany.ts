import { Api } from '@services/api';
import { handleToastify } from '@utils/toastifyResponses';

export interface Company {
  id: string;
  name: string;
  createdAt: string;
  maintenanceFlag?: string;
  isBlocked?: boolean;
}

export async function getRegistrationCompany(): Promise<Company[]> {
  const api = '/account/companies/list';

  try {
    let page = 1;
    const take = 1000;
    let allCompanies: Company[] = [];
    let total = 0;

    do {
      // eslint-disable-next-line no-await-in-loop
      const response = await Api.get(api, { params: { page, take } });

      const companies: Company[] = response.data?.companiesAndOwners || [];
      total = response.data?.companiesCount || 0;

      allCompanies = allCompanies.concat(companies);
      page += 1;
    } while (allCompanies.length < total);

    return allCompanies;
  } catch (error: any) {
    handleToastify(error.response);
    return [];
  }
}
