import * as Yup from 'yup';
import { Api } from '@services/api';
import { catchHandler } from '@utils/functions';
import { IFormDataUser } from '@customTypes/IUser';

export const schemaUserCreate = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  phoneNumber: Yup.string().required('Telefone obrigatório'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Senha obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não coincidem')
    .required('Confirme a senha'),
});

export async function createUser(data: IFormDataUser) {
  try {
    const response = await Api.post('account/users/create', data);
    return response.data;
  } catch (error) {
    catchHandler(error);
    throw error;
  }
}
