import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { Api } from '@services/api';

import type { IRequestGenerateLink } from './types';

export const internalDataSchema = Yup.object().shape({
  name: Yup.string()
    .required('O nome do cliente é obrigatório')
    .min(3, 'O nome deve ter no mínimo 3 caracteres'),
  clientType: Yup.string().required('O tipo de cliente é obrigatório'),
  condosQty: Yup.number()
    .required('A quantidade é obrigatória')
    .min(1, 'A quantidade deve ser no mínimo 1'),
  plan: Yup.string().required('O plano é obrigatório'),
  monthlyValue: Yup.number()
    .typeError('Informe um valor válido')
    .required('O valor da mensalidade é obrigatório'),
  implementationValue: Yup.number()
    .typeError('Informe um valor válido')
    .required('O valor de implementação é obrigatório'),
  implementationDueDate: Yup.string().required(
    'O dia do vencimento da implementação é obrigatório',
  ),
});

export async function requestGenerateLink({
  formData,
  setOnQuery,
  setGeneratedLink,
}: IRequestGenerateLink) {
  setOnQuery(true);
  setGeneratedLink('');

  try {
    const payload = {
      name: formData.name,
      clientType: formData.clientType,
      buildingQuantity: Number(formData.condosQty),
      planType: formData.plan,
      monthlyPrice: Number(formData.monthlyValue),
      implementationPrice: Number(formData.implementationValue),
      implementationDueDate: formData.implementationDueDate,
    };

    const response = await Api.post('/pre-registrations/invite', payload);

    const { token } = response.data;
    const link = `${window.location.origin}/pre-cadastro-cliente?token=${token}`;

    setGeneratedLink(link);
    toast.success('Link gerado com sucesso!');
  } catch (error) {
    const axiosError = error as AxiosError<any>;

    if (axiosError.response && axiosError.response.data?.ServerMessage?.message) {
      const serverMessage = axiosError.response.data.ServerMessage.message;
      toast.error(serverMessage);
    } else {
      toast.error('Falha ao gerar o link. Verifique os dados e tente novamente.');
    }
  } finally {
    setOnQuery(false);
  }
}
