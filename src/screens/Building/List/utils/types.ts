export interface IBuilding {
  id: string;
  name: string;
  image?: string | null;
  city?: string;
  streetName?: string;
  createdAt?: string;
  isBlocked?: boolean;
}

export interface IBuildingsListResponse {
  buildings: IBuilding[];
  buildingsCount: number;
}
