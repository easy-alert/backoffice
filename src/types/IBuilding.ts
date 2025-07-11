import { ICompany } from '@screens/Companies/List/utils/types';
import { IUserBuildingsPermission } from './IUserBuildingsPermission';

export interface IBuilding {
  id?: string;

  buildingTypeId?: string;
  BuildingType?: {
    id: string;
    name: string;
  };
  companyId?: string;
  nanoId?: string;

  image?: string | null;
  name?: string;
  cep?: string;
  city?: string;
  state?: string;
  neighborhood?: string;
  streetName?: string;
  area?: string;
  deliveryDate?: string;
  warrantyExpiration?: string;
  keepNotificationAfterWarrantyEnds?: boolean;
  mandatoryReportProof?: boolean;
  isActivityLogPublic?: boolean;
  guestCanCompleteMaintenance?: boolean;
  isBlocked?: boolean;

  residentPassword?: string;
  syndicPassword?: string;

  nextMaintenanceCreationBasis?: string;

  createdAt?: string;
  updatedAt?: string;

  Company?: ICompany;
  UserBuildingsPermissions?: IUserBuildingsPermission[];

  // BuildingType?: IBuildingType;
  // Company?: ICompany;
  // NotificationsConfigurations?: IBuildingNotificationConfiguration[];
  // Categories?: IBuildingCategory[];
  // Annexes?: IBuildingAnnexes[];
  // Banners?: IBuildingBanners[];
  // MaintenancesHistory?: IMaintenanceHistory[];
  // oldBuildingIds?: IOldBuildingIds[];
  // BuildingFolders?: IBuildingFolders[];
  // BuildingsAccessHistory?: IBuildingAccessHistory[];
  // checklists?: IChecklist[];
  // tickets?: ITicket[];
}

export interface IUpdateBuildingData {
  name: string;
  buildingTypeId: string;
  cep: string;
  state: string;
  city: string;
  neighborhood?: string;
  streetName?: string;
  image?: string;
  deliveryDate?: Date;
  warrantyExpiration: Date;
  nextMaintenanceCreationBasis?: string;
  keepNotificationAfterWarrantyEnds?: boolean;
  mandatoryReportProof?: boolean;
  isActivityLogPublic?: boolean;
  guestCanCompleteMaintenance?: boolean;
}
