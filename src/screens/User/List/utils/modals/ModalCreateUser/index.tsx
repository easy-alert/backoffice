// LIBS
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// COMPONENTS
import * as Style from './styles';
import { ModalComponent } from '../../../../../../components/Modal';
import { Input } from '../../../../../../components/Form/Input';
import { Button } from '../../../../../../components/Buttons/Button';
import { Uploader } from '../../../../../../components/Uploader';

// FUNCTIONS
import { requestCreateUser, schemaModalCreateUser } from '../../functions';

// TYPES
import { IFormDataUser, IModalCreateUser } from '../../../../types';

export const modalCreateUser = () => {
  const {
    Modal,
    toggleModal: toggleModalCreateUser,
    modalIsOpen: modalCreateUserIsOpen,
  } = ModalComponent();

  const ModalCreateUser = ({ setUsers, page, setCount }: IModalCreateUser) => {
    const [onQuery, setOnQuery] = useState<boolean>(false);

    // YUP VALIDATION
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IFormDataUser>({
      resolver: yupResolver(schemaModalCreateUser),
    });

    // SUBMITED FORM
    const onSubmit = handleSubmit(async (data) => {
      await requestCreateUser({
        data,
        toggleModal: toggleModalCreateUser,
        setUsers,
        page,
        setCount,
        setOnQuery,
      });
    });

    return (
      <Modal title="Cadastrar usuário">
        <Style.FormContainer as="form" onSubmit={onSubmit}>
          <Uploader
            label="Foto de perfil"
            error={errors.image}
            register={{ ...register('image') }}
          />

          <Input
            label="Nome completo"
            placeholder="Ex: João Silva"
            error={errors.name}
            {...register('name')}
            maxLength={40}
          />

          <Input
            label="E-mail"
            placeholder="Ex: joao.silva@ada.com.br"
            error={errors.email}
            {...register('email')}
            maxLength={50}
          />

          <Input
            type="password"
            placeholder="Crie uma senha"
            label="Senha do usuário"
            error={errors.password}
            {...register('password')}
            maxLength={120}
          />
          <Input
            type="password"
            label="Confirmar senha"
            placeholder="Repita a senha criada"
            error={errors.confirmPassword}
            {...register('confirmPassword')}
            maxLength={120}
          />

          <Button center label="Cadastrar" type="submit" loading={onQuery} />
        </Style.FormContainer>
      </Modal>
    );
  };

  return { ModalCreateUser, toggleModalCreateUser, modalCreateUserIsOpen };
};
