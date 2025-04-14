import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

interface IUserCompany {
  User: {
    id: string;
    name: string;
    image?: string;
    phoneNumber?: string;
    email?: string;
    status?: 'active' | 'inactive' | 'blocked';
    lastAccess?: string;
  };
}

interface ICompanyResponse {
  id: string;
  phoneNumber?: string;
  email?: string;
  UserCompanies: IUserCompany[];
  status: 'active' | 'inactive' | 'blocked';
  lastAccess: string;
  name: string;
  image?: string;
}

interface IApiResponse {
  users: ICompanyResponse[];
  usersCount: number;
}

export interface IRequestUsersList {
  page?: number;
  filter?: string;
}

export const requestUsersList = async ({ page = 1, filter = '' }: IRequestUsersList) => {
  const uri = '/account/users/list';
  const params = { page, search: filter };

  try {
    const { data } = await Api.get<IApiResponse>(uri, { params });
    const { users, usersCount } = data;

    return { users, usersCount };
  } catch (error: any) {
    handleToastify(error.response.data.ServerMessage);
    return error;
  }
};
