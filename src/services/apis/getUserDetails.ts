import { Api } from '@services/api';
import { IUserDetails } from '@utils/types';

export const getUserDetails = async (userId: string): Promise<{ user: IUserDetails }> => {
  try {
    const { data } = await Api.get(`/account/users/details/${userId}`);

    const transformedData = {
      user: {
        ...data.user,
        companies:
          data.user.Companies?.map((company: any) => ({
            id: company.id,
            name: company.name,
            image: company.image,
            isBlocked: company.isBlocked,
          })) || [],
        edifications:
          data.user.Buildings?.map((building: any) => ({
            id: building.id,
            name: building.name,
            image: building.image,
          })) || [],
      },
    };

    return transformedData;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

export const formatDateTime = (dateString?: string): string => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR');
};
