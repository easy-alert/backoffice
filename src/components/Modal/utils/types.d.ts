export interface IModalStates {
  modalState: boolean;
  setModalState: (setModalState: boolean) => void;
}

export interface IModal extends IModalStates {
  children: JSX.Element;
  title: string;
  size?: 'md' | 'lg';
}
