import type { IUpdateBuildingData } from '@customTypes/IBuilding';
import { Api } from '@services/api';
import { handleToastify } from '@utils/toastifyResponses';
import { unMask } from '@utils/functions';

export async function putEditBuilding(buildingId: string, values: any) {
  const buildingData: Partial<IUpdateBuildingData> = {
    name: values.name?.trim() || '',
    buildingTypeId: values.buildingTypeId || '',
    cep: values.cep ? unMask(values.cep) : '',
    state: values.state?.trim() || '',
    city: values.city?.trim() || '',
    warrantyExpiration: values.warrantyExpiration ? new Date(values.warrantyExpiration) : undefined,
    nextMaintenanceCreationBasis: values.nextMaintenanceCreationBasis || '',
    neighborhood: values.neighborhood?.trim() || undefined,
    streetName: values.streetName?.trim() || undefined,
    deliveryDate: values.deliveryDate ? new Date(values.deliveryDate) : undefined,
    keepNotificationAfterWarrantyEnds: values.keepNotificationAfterWarrantyEnds,
    mandatoryReportProof: values.mandatoryReportProof,
    isActivityLogPublic: values.isActivityLogPublic,
    guestCanCompleteMaintenance: values.guestCanCompleteMaintenance,
  };

  if (values.image && typeof values.image === 'string') {
    buildingData.image = values.image;
  }

  const uri = `buildings/edit/${buildingId}`;

  try {
    const response = await Api.put(uri, buildingData);
    handleToastify(response);
    return response.data;
  } catch (error: any) {
    handleToastify(error.response);
    throw error;
  }
}
