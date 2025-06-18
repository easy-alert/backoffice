export interface ICompany {
  id: string;
  name: string;
  isBlocked: boolean;
  image?: string | null;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  lastAccess?: string;
}

export interface IUserBuildingsPermission {
  User: IUser;
}

export interface IBuildingDetails {
  id: string;
  name: string;
  image?: string | null;
  city?: string;
  streetName?: string;
  createdAt?: string;
  isBlocked?: boolean;
  companyId?: string;
  cep?: string;
  Company?: ICompany;
  UserBuildingsPermissions?: IUserBuildingsPermission[];
}
