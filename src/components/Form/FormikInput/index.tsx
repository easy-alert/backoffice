// LIBS
import { forwardRef, ForwardRefRenderFunction } from 'react';

// TYPES
import { Field } from 'formik';
import { IInput } from './utils/types';
// COMPONENTS
import { ErrorMessage, InputContainer } from './styles';
import { theme } from '../../../styles/theme';

const FormikInputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = (
  {
    label,
    labelColor = theme.color.gray5,
    name,
    error,
    passwordPlaceholder,
    ...rest
  },
  ref,
) => (
  <InputContainer
    error={!!error}
    passwordPlaceholder={passwordPlaceholder}
    labelColor={labelColor}
  >
    {label && <h6>{label}</h6>}
    <Field id={name} name={name} ref={ref} {...rest} />
    <ErrorMessage>{!!error && <p className="p3">{error}</p>}</ErrorMessage>
  </InputContainer>
);
export const FormikInput = forwardRef(FormikInputBase);
