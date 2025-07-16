export type GuaranteeEditProps = {
  open: boolean;
  onClose: () => void;
  guarantee: Guarantee | null;
  onSave: (values: Guarantee) => void;
};
