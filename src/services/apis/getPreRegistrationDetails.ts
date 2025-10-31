import { Api } from '@services/api';
import { handleToastify } from '@utils/toastifyResponses';
import * as Yup from 'yup';
import { Dispatch, SetStateAction } from 'react';

// eslint-disable-next-line no-shadow
export enum EClientType {
  RESIDENT_SYNDIC = 'residentSyndic',
  PROFESSIONAL_SYNDIC = 'professionalSyndic',
  CONSTRUCTION_COMPANY = 'constructionCompany',
  ADMINISTRATION_COMPANY = 'administrationCompany',
  OTHERS = 'others',
}

export interface IInternalData {
  clientType: EClientType;
  buildingQuantity: number;
  planType: string;
  monthlyPrice: number;
  implementationPrice?: number;
}

export interface IClientFormData {
  logo?: File | string;
  clientName: string;
  CNPJorCPF: string;
  address: string;
  loginEmail: string;
  password?: string;
  confirmPassword?: string;
  contactPhone: string;
  paymentType: string;
  cardNumber?: string;
  cardHolder?: string;
  cardExpiration?: string;
  cardCVV?: string;
  dueDay: number | '';
  billingEmail: string;
  financialName: string;
  financialPhone?: string;
  financialEmail?: string;
  acceptTerms: boolean;
}

export interface IFinalizeRegistration {
  data: IClientFormData;
  token: string;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
}

export const schemaClientValidation = Yup.object().shape({
  clientName: Yup.string().required('O nome é obrigatório'),
  CNPJorCPF: Yup.string()
    .required('Um CNPJ ou um CPF deve ser preenchido.')
    .test('len', 'Informe um CNPJ ou um CPF válido.', (val) => {
      if (!val) return false;
      const digits = val.replace(/[^\d]/g, '');
      return digits.length === 11 || digits.length === 14;
    }),
  loginEmail: Yup.string().email('E-mail inválido').required('O e-mail de login é obrigatório'),
  password: Yup.string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .required('A senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não coincidem')
    .required('A confirmação de senha é obrigatória'),
  contactPhone: Yup.string().required('O telefone de contato é obrigatório'),
  paymentType: Yup.string().required('O tipo de pagamento é obrigatório'),
  cardNumber: Yup.string().when('paymentType', {
    is: 'cartao',
    then: (schema) => schema.required('O número do cartão é obrigatório'),
  }),
  cardHolder: Yup.string().when('paymentType', {
    is: 'cartao',
    then: (schema) => schema.required('O nome do titular é obrigatório'),
  }),
  cardExpiration: Yup.string().when('paymentType', {
    is: 'cartao',
    then: (schema) =>
      schema
        .required('A data de validade é obrigatória')
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Formato inválido. Use MM/AA'),
  }),
  cardCVV: Yup.string().when('paymentType', {
    is: 'cartao',
    then: (schema) => schema.required('O CVV é obrigatório').matches(/^\d{3,4}$/, 'CVV inválido'),
  }),
  dueDay: Yup.number()
    .required('O dia de vencimento é obrigatório')
    .oneOf([5, 10, 15, 20], 'O dia de vencimento deve ser 5, 10, 15 ou 20'),
  billingEmail: Yup.string()
    .email('E-mail inválido')
    .required('O e-mail para receber as cobranças é obrigatório'),
  acceptTerms: Yup.boolean().oneOf([true], 'Você deve aceitar os termos de uso'),
});

export async function getPreRegistrationDetails(token: string) {
  const api = `/pre-registrations/details/${token}`;
  try {
    const response = await Api.get(api);

    return response.data;
  } catch (error: any) {
    handleToastify(error.response);
    throw error;
  }
}
