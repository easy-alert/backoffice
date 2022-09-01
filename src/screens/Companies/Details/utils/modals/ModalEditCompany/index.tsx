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
import { requestEditUser, schemaModalEditCompany } from '../../functions';

// TYPES
import { IModalEditCompany, IFormDataCompany } from '../../../../types';

export const modalEditCompany = () => {
  const {
    Modal,
    toggleModal: toggleModalEditCompany,
    modalIsOpen: modalCompanyIsOpen,
  } = ModalComponent();

  const ModalEditCompany = ({ setCompany, company }: IModalEditCompany) => {
    const navigate = useNavigate();
    const [onQuery, setOnQuery] = useState<boolean>(false);

    // YUP VALIDATION
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IFormDataCompany>({
      resolver: yupResolver(schemaModalEditCompany),
      defaultValues: {
        name: company.name,
        email: company.UserCompanies[0].User.email,
        companyName: company.name,
        CNPJ: company.CNPJ,
        CPF: company.CPF,
        contactNumber: company.contactNumber,
      },
    });

    // SUBMITED FORM
    const onSubmit = handleSubmit(async (data) => {
      console.log(data);
      await requestEditUser({
        data,
        toggleModal: toggleModalEditCompany,
        company,
        setCompany,
        navigate,
        setOnQuery,
      });
    });

    return (
      <Modal title="Editar usuário">
        <Style.FormContainer as="form" onSubmit={onSubmit}>
          <Uploader
            label="Logo"
            error={errors.image}
            register={{ ...register('image') }}
            defaultImage={company.image}
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

          {company.CPF && (
            <Input
              label="CPF"
              placeholder="Ex: 000.000.000.00"
              error={errors.CPF}
              {...register('CPF')}
              maxLength={40}
            />
          )}

          {company.CNPJ && (
            <Input
              label="CNPJ"
              placeholder="Ex: 00.000.000/0000-00"
              error={errors.CNPJ}
              {...register('CNPJ')}
              maxLength={40}
            />
          )}

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

  return { ModalEditCompany, toggleModalEditCompany, modalCompanyIsOpen };
};
