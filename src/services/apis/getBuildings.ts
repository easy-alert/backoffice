import { IBuilding } from '@customTypes/IBuilding';
import { Api } from '@services/api';

export interface IBuildingsListResponse {
  buildings: IBuilding[];
  buildingsCount: number;
}

interface RequestBuildingsListProps {
  page: number;
  filter: string;
}

export const getBuildings = async ({
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
