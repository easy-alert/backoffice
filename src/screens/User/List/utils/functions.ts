// LIBS
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Api } from '../../../../services/api';

// FUNCTIONS
import { uploadFile } from '../../../../utils/functions';

// TYPES
import { IRequestCreateUser, IRequestUsersList } from '../../types';

// REQUESTS
export const requestUsersList = async ({
  setUsers,
  setLoading,
  page,
  setCount,
  filter = '',
  setPage,
}: IRequestUsersList) => {
  await Api.get(`/backoffice/users/list?page=${page}&search=${filter}`)
    .then((res) => {
      setUsers(res.data.users);
      setCount(res.data.usersCount);
      if (setLoading) setLoading(false);
      if (setPage) setPage(1);
    })
    .catch((err) => {
      if (err.response.data) {
        toast.error(err.response.data.ServerMessage.message);
      } else {
        toast.error('Erro de comunicação');
      }
    });
};

export const requestCreateUser = async ({
  data,
  toggleModal,
  setUsers,
  page,
  setCount,
  setOnQuery,
}: IRequestCreateUser) => {
  setOnQuery(true);
  let imageUrl;

  if (data.image.length) {
    const { Location } = await uploadFile(data.image);
    imageUrl = Location;
  } else {
    imageUrl = `https://avatars.dicebear.com/api/initials/${data.name.replace(
      /\s/g,
      '%20',
    )}.svg`;
  }

  await Api.post('/backoffice/users/create', {
    name: data.name,
    email: data.email,
    image: imageUrl,
    password: data.password,
  })
    .then((res) => {
      requestUsersList({
        setUsers,
        page,
        setCount,
      });
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

// YUP
export const schemaModalCreateUser = yup
  .object({
    image: yup
      .mixed()
      .test('fileSize', 'O tamanho da imagem excede o limite.', (value) => {
        if (!value.length) return true; // attachment is optional
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
      .required('Informe a senha.')
      .min(8, 'Sua senha deve possuir 8 ou mais caracteres.'),

    confirmPassword: yup
      .string()
      .required('Informe a senha.')
      .min(8, 'Sua senha deve possuir 8 ou mais caracteres.')
      .oneOf([yup.ref('password'), null], 'As senhas não coincidem.'),
  })
  .required();
