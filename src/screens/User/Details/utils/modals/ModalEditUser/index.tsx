// LIBS
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

// COMPONENTS
import * as Style from './styles';
import { ModalComponent } from '../../../../../../components/Modal';
import { Input } from '../../../../../../components/Form/Input';
import { Button } from '../../../../../../components/Buttons/Button';
import { Uploader } from '../../../../../../components/Uploader';

// FUNCTIONS
import { requestEditUser, schemaModalEditUser } from '../../functions';

// TYPES
import { IModalEditUser, IFormDataUser } from '../../../../types';

export const modalEditUser = () => {
  const {
    Modal,
    toggleModal: toggleModalEditUser,
    modalIsOpen: modalEditIsOpen,
  } = ModalComponent();

  const ModalEditUser = ({ setUser, user }: IModalEditUser) => {
    const navigate = useNavigate();
    const [onQuery, setOnQuery] = useState<boolean>(false);

    // YUP VALIDATION
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IFormDataUser>({
      resolver: yupResolver(schemaModalEditUser),
      defaultValues: { name: user.name, email: user.email },
    });

    // SUBMITED FORM
    const onSubmit = handleSubmit(async (data) => {
      await requestEditUser({
        data,
        toggleModal: toggleModalEditUser,
        user,
        setUser,
        navigate,
        setOnQuery,
      });
    });

    return (
      <Modal title="Editar usuário">
        <Style.FormContainer as="form" onSubmit={onSubmit}>
          <Uploader
            label="Foto de perfil"
            error={errors.image}
            register={{ ...register('image') }}
            defaultImage={user.image}
          />
          <Input
            maxLength={40}
            label="Nome completo"
            error={errors.name}
            {...register('name')}
          />

          <Input
            maxLength={50}
            label="E-mail"
            error={errors.email}
            {...register('email')}
          />

          <Input
            type="password"
            placeholder="••••••••••"
            passwordPlaceholder
            label="Senha do usuário"
            error={errors.password}
            {...register('password')}
            maxLength={120}
          />
          <Input
            type="password"
            placeholder="••••••••••"
            passwordPlaceholder
            label="Confirmar senha"
            error={errors.confirmPassword}
            {...register('confirmPassword')}
            maxLength={120}
          />

          <Button center label="Salvar" type="submit" loading={onQuery} />
        </Style.FormContainer>
      </Modal>
    );
  };

  return { ModalEditUser, toggleModalEditUser, modalEditIsOpen };
};
