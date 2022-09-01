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
import { requestCreateUser, schemaModalCreateCompany } from '../../functions';

// TYPES
import { IFormDataComapany, IModalCreateUser } from '../../../../types';

export const modalCreateCompanie = () => {
  const {
    Modal,
    toggleModal: toggleModalCreateCompanie,
    modalIsOpen: modalCreateCompanieIsOpen,
  } = ModalComponent();

  const ModalCreateCompanie = ({
    setUsers,
    page,
    setCount,
  }: IModalCreateUser) => {
    const [onQuery, setOnQuery] = useState<boolean>(false);

    // YUP VALIDATION
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IFormDataComapany>({
      resolver: yupResolver(schemaModalCreateCompany),
    });

    // SUBMITED FORM
    const onSubmit = handleSubmit(async (data) => {
      console.log(data);
      await requestCreateUser({
        data,
        toggleModal: toggleModalCreateCompanie,
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
            label="Logo"
            error={errors.image}
            register={{ ...register('image') }}
          />

          <Input
            label="Nome do responsável"
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
            label="Nome da empresa"
            placeholder="Ex: SATC"
            error={errors.companyName}
            {...register('companyName')}
            maxLength={40}
          />

          <Input
            label="Telefone"
            placeholder="Ex: 48 99000-0000"
            error={errors.contactNumber}
            {...register('contactNumber')}
            maxLength={40}
          />
          <Input
            label="CPF"
            placeholder="Ex: 000.000.000.00"
            error={errors.CPF}
            {...register('CPF')}
            maxLength={40}
          />
          <Input
            label="CNPJ"
            placeholder="Ex: 00.000.000/0000-00"
            error={errors.CNPJ}
            {...register('CNPJ')}
            maxLength={40}
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

  return {
    ModalCreateCompanie,
    toggleModalCreateCompanie,
    modalCreateCompanieIsOpen,
  };
};
