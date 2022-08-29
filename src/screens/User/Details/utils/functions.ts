// LIBS
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Api } from '../../../../services/api';

// FUNCTIONS
import { uploadFile } from '../../../../utils/functions';

// TYPES
import {
  IRequestChangeIsActiveAndIsDeleted,
  IRequestEditUser,
} from '../../types';

export const requestEditUser = async ({
  data,
  toggleModal,
  user,
  setUser,
  navigate,
  setOnQuery,
}: IRequestEditUser) => {
  setOnQuery(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let imageUrl: any;

  if (data.image.length) {
    const { Location } = await uploadFile(data.image);
    imageUrl = Location;
  } else {
    imageUrl = user.image;
  }

  await Api.put('/backoffice/users/edit', {
    userId: user.id,
    name: data.name,
    email: data.email,
    image: imageUrl,
    password: data.password,
  })
    .then((res) => {
      const updatedUser = {
        id: user.id,
        name: data.name,
        email: data.email,
        image: imageUrl,
        createdAt: user.createdAt,
        isBlocked: user.isBlocked,
        lastAccess: user.lastAccess,
      };
      navigate(window.location.pathname, { state: updatedUser });
      setUser(updatedUser);
      toggleModal();
      toast.success(res.data.ServerMessage.message);
    })
    .catch((err) => {
      setOnQuery(false);
      if (err.response.data) {
        toast.error(err.response.data.ServerMessage.message);
      } else {
        toast.error('Erro de comunicação');
      }
    });
};

export const requestChangeIsBlocked = async ({
  user,
  setUser,
  navigate,
}: IRequestChangeIsActiveAndIsDeleted) => {
  toast.loading('Atualizando...');

  await Api.put('/backoffice/users/change/isBlocked', {
    userId: user.id,
  })
    .then((res) => {
      if (setUser) setUser({ ...user, isBlocked: !user.isBlocked });
      navigate(window.location.pathname, {
        state: { ...user, isBlocked: !user.isBlocked },
      });
      toast.dismiss();
      toast.success(res.data.ServerMessage.message);
    })
    .catch((err) => {
      toast.dismiss();
      if (err.response.data) {
        toast.error(err.response.data.ServerMessage.message);
      } else {
        toast.error('Erro de comunicação');
      }
    });
};

export const requestChangeIsDeleted = async ({
  user,
  navigate,
}: IRequestChangeIsActiveAndIsDeleted) => {
  toast.loading('Atualizando...');

  await Api.put('/backoffice/users/change/isDeleted', {
    userId: user.id,
  })
    .then((res) => {
      navigate('/users', { replace: true });
      toast.dismiss();
      toast.success(res.data.ServerMessage.message);
    })
    .catch((err) => {
      toast.dismiss();
      if (err.response.data) {
        toast.error(err.response.data.ServerMessage.message);
      } else {
        toast.error('Erro de comunicação');
      }
    });
};

// YUP
export const schemaModalEditUser = yup
  .object({
    image: yup
      .mixed()
      .test('fileSize', 'O tamanho da imagem excede o limite.', (value) => {
        if (!value.length) return true;
        return value[0].size <= 5000000;
      })
      .test('type', 'Formato inválido.', (value) => {
        if (!value.length) return true;
        return (
          value[0].type === 'image/jpeg' ||
          value[0].type === 'image/png' ||
          value[0].type === 'image/jpg'
        );
      }),
    name: yup
      .string()
      .required('O nome deve ser preenchido.')
      .min(3, 'O nome deve conter 3 ou mais caracteres.'),

    email: yup
      .string()
      .email('Informe um e-mail válido.')
      .required('E-mail obrigatório.'),

    password: yup
      .string()
      .matches(/^(|.{8,})$/, 'A senha deve ter pelo menos 8 caracteres.'),

    confirmPassword: yup
      .string()
      .matches(/^(|.{8,})$/, 'A senha deve ter pelo menos 8 caracteres;')
      .oneOf([yup.ref('password'), null], 'As senhas não coincidem.'),
  })
  .required();
