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
}

export interface IMask {
  value: string;
  length: number;
}
