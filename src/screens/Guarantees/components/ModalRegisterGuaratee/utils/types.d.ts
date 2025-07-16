export interface ModalRegisterGuaranteeProps {
  open: boolean;
  onClose: () => void;
  onCreate: (guarantee: Guarantee) => void;
}
