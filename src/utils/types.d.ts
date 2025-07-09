export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
  lastAccess: string;
  isBlocked: boolean;
  Permissions?: [
    {
      Permission: {
        name: string;
      };
    },
  ];
}

export interface IUploadFile {
  Location: string;
  originalname: string;
  url: string;
}

export interface IMask {
  value: string;
  length: number;
}

export interface ITimeInterval {
  id: string;
  name: string;
  singularLabel: string;
  pluralLabel: string;
}

export interface IRequestListIntervals {
  setTimeIntervals: (setTimeIntervals: ITimeInterval[]) => void;
}

export interface IUserCompany {
  id: string;
  name: string;
  image?: string;
  isBlocked?: boolean;
}

export interface IUserEdification {
  id: string;
  name: string;
  image?: string;
}

export interface IUserDetails extends Omit<IUser, 'email' | 'image'> {
  email?: string;
  image?: string;
  phoneNumber?: string;
  role?: string;
  companies?: IUserCompany[];
  edifications?: IUserEdification[];
}

export interface IBuildingType {
  id: string;
  name: string;
}
