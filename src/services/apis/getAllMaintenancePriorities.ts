import { Api } from '../api';

import { catchHandler } from '../../utils/functions';

import type { IMaintenancePriority } from '../../types/IMaintenancePriority';

interface IGetAllMaintenancePriorities extends Response {
  data: {
    maintenancePriorities: IMaintenancePriority[];
  };
}

export async function getAllMaintenancePriorities() {
  const api = '/maintenancePriority';

  try {
    const response: IGetAllMaintenancePriorities = await Api.get(api);

    return response.data;
  } catch (error) {
    catchHandler(error);

    return { maintenancePriorities: [] };
  }
}
