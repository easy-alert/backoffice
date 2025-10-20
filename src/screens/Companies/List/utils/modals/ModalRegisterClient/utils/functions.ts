import * as Yup from 'yup';

import { Api } from '@services/api';
import { toast } from 'react-toastify';

import type { IRequestGenerateLink } from './types';

export const internalDataSchema = Yup.object().shape({
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
      clientType: formData.clientType,
      buildingQuantity: Number(formData.condosQty),
      planType: formData.plan,
      monthlyPrice: Number(formData.monthlyValue),
      implementationPrice: Number(formData.implementationValue),
    };

    const response = await Api.post('/pre-registrations/invite', payload);

    const { token } = response.data;
    const link = `${window.location.origin}/pre-cadastro-cliente?token=${token}`;

    setGeneratedLink(link);
    toast.success('Link gerado com sucesso!');
  } catch (error) {
    console.error('Erro ao gerar o link:', error);
    toast.error('Falha ao gerar o link. Verifique os dados e tente novamente.');
  } finally {
    setOnQuery(false);
  }
}
