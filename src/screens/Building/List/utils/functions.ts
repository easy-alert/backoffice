
import { Api } from '@services/api';
import type { IBuildingsListResponse } from './types';

interface RequestBuildingsListProps {
  page: number;
  filter: string;
}

export const requestBuildingsList = async ({
  page,
  filter,
}: RequestBuildingsListProps): Promise<IBuildingsListResponse> => {
  const uri = '/buildings/list';

  const response = await Api.get(uri, {
    params: { page, search: filter },
  });

return {
  buildings: response.data.buildings,
  buildingsCount: response.data.totalBuildings, 
};
};