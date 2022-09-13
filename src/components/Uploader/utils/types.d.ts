/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IUploader {
  label: string;
  error: string | null;
  defaultImage?: string;
  setNewImage?: any;
  name?: string;
}
