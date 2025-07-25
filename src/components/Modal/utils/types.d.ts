export interface IModal {
  title: string;
  children: JSX.Element;
  bodyWidth?: string;
  closeOutside?: boolean;
  setModal: (setModal: boolean) => void;
}
