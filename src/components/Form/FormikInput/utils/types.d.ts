import { InputHTMLAttributes } from 'react';

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelColor?: string;
  error?: string | null;
  passwordPlaceholder?: boolean;
}
