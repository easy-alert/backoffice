import { useFormikContext } from 'formik';

import type { CSSProperties } from 'react';

import * as Style from './styles';

interface IFormikError {
  name: string;
  color?: string;
  fontSize?: string | number;
  marginTop?: string | number;
  marginBottom?: string | number;
  containerStyle?: CSSProperties;
  textStyle?: CSSProperties;
}

export const FormikError = ({
  name,
  color,
  fontSize,
  marginTop,
  marginBottom,
  containerStyle,
  textStyle,
}: IFormikError) => {
  const { errors, touched } = useFormikContext();

  const errorMessage = name.split('.').reduce((obj, key) => obj && obj[key], errors as any);

  const isTouched = name.split('.').reduce((obj, key) => obj && obj[key], touched as any);

  if (!isTouched || !errorMessage) {
    return null;
  }

  return (
    <Style.FormikErrorContainer
      marginTop={marginTop}
      marginBottom={marginBottom}
      style={containerStyle}
    >
      <Style.FormikErrorText color={color} fontSize={fontSize} style={textStyle}>
        {errorMessage}
      </Style.FormikErrorText>
    </Style.FormikErrorContainer>
  );
};
