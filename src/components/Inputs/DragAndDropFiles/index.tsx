import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { icon } from '../../../assets/icons';
import * as Style from './styles';
import { ImageComponent } from '../../ImageComponent';
import { DotSpinLoading } from '../../Loadings/DotSpinLoading';

interface IDragAndDropFiles {
  loading?: boolean;
  disabled?: boolean;
  getAcceptedFiles: (acceptedFiles: File[]) => void;
  onlyImages?: boolean;
  multiple?: boolean;
  error?: any;
  label?: string;
}

export const DragAndDropFiles = ({
  getAcceptedFiles,
  disabled = false,
  loading = false,
  onlyImages = false,
  multiple = true,
  error,
  label,
}: IDragAndDropFiles) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      getAcceptedFiles(acceptedFiles);
    },
    [getAcceptedFiles],
  );

  const { getRootProps, getInputProps } = useDropzone({
    disabled: loading || disabled,
    multiple,
    onDrop,
    accept: onlyImages
      ? {
          'image/png': ['.png'],
          'image/jpg': ['.jpg'],
          'image/jpeg': ['.jpeg'],
        }
      : undefined,
  });

  return (
    <Style.Background>
      {label && <h6>{label}</h6>}
      <Style.DragAndDropZone {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />

        <Style.Content>
          {loading ? (
            <DotSpinLoading />
          ) : (
            <ImageComponent src={icon.addFile} width="40px" height="32px" radius="0" />
          )}
        </Style.Content>
      </Style.DragAndDropZone>
      {!!error && (
        <Style.ErrorMessage>
          <p className="p9">{error}</p>
        </Style.ErrorMessage>
      )}
    </Style.Background>
  );
};
