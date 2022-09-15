import { TextareaHTMLAttributes } from 'react';

export interface TextAreaProps
  extends TextareaHTMLAttributes<TextareaHTMLAttributes> {
  label: string;
  error?: string;
}
