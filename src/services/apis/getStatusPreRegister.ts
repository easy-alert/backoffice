import { Api } from '@services/api';

export type PreRegistrationStatus = 'pending' | 'completed' | 'expired';

export interface ILinkData {
  id: string;
  name: string;
  status: PreRegistrationStatus;
  createdAt: string;
  expiresAt: string;
}

interface IGetPreRegistrationsResponse {
  preRegistrations: ILinkData[];
}

export const statusLabels = {
  pending: 'Pendente',
  completed: 'Concluído',
  expired: 'Expirado',
};

export const requestLinksList = async (): Promise<ILinkData[]> => {
  const uri = '/pre-registrations/status';

  const response = await Api.get<IGetPreRegistrationsResponse>(uri);

  return response.data.preRegistrations;
};
