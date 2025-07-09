import { useState } from 'react';

// LIBS
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

// CONTEXTS
import { useAuthContext } from '@contexts/Auth/UseAuthContext';

// SERVICES
import { updateUser } from '@services/apis/updateUser';

// GLOBAL COMPONENTS
import { Modal } from '@components/Modal';
import { Button } from '@components/Buttons/Button';
import { IconButton } from '@components/Buttons/IconButton';
import { FormikInput } from '@components/Form/FormikInput';
import { FormikImageInput } from '@components/Form/FormikImageInput';
import { FormikSelect } from '@components/Form/FormikSelect';

// GLOBAL UTILS
import { applyMask, uploadFile } from '@utils/functions';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// GLOBAL TYPES
import type { UpdateUserValues } from '@customTypes/IUser';
import type { IUser } from '@utils/types';

// STYLES
import * as Style from './styles';

interface ISelectedUser {
  id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  isBlocked: boolean;
  image?: string;
  createdAt?: string;
  lastAccess?: string;
}

interface IModalUpdateUser {
  selectedUser: ISelectedUser;
  handleModals: (modal: string, modalState: boolean) => void;
  onUserUpdated?: (updatedUser: IUser) => void;
}

const userUpdateSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  phoneNumber: Yup.string().required('Telefone é obrigatório'),
  role: Yup.string(),
  isBlocked: Yup.boolean().required('Status é obrigatório'),
  password: Yup.string(),
  confirmPassword: Yup.string().when('password', {
    is: (password: string) => password && password.length > 0,
    then: (schema) =>
      schema
        .oneOf([Yup.ref('password')], 'Senhas devem ser iguais')
        .required('Confirmação de senha é obrigatória'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const ModalEditUser = ({ selectedUser, handleModals, onUserUpdated }: IModalUpdateUser) => {
  const { user, setUser } = useAuthContext();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const [onQuery, setOnQuery] = useState(false);

  const handleEditUser = async (values: UpdateUserValues) => {
    setOnQuery(true);

    try {
      let imageUrl = '';

      if (values.image && typeof values.image === 'object') {
        const { Location } = await uploadFile(values.image);
        imageUrl = Location;
      } else {
        imageUrl = values.image || '';
      }

      const baseData = {
        id: selectedUser.id,
        image: imageUrl,
        name: values.name.trim(),
        role: values.role || '',
        email: values.email.trim(),
        phoneNumber: values.phoneNumber.replace(/\D/g, ''),
        isBlocked: values.isBlocked,
      };

      const data: UpdateUserValues =
        values.password && values.password.trim() !== ''
          ? {
              ...baseData,
              password: values.password,
              confirmPassword: values.confirmPassword || '',
            }
          : (baseData as UpdateUserValues);

      const response = await updateUser(data);

      if (!response?.updatedUser) {
        return;
      }

      const { updatedUser } = response;

      if (user?.id === updatedUser.id) {
        setUser(updatedUser as any);
      }

      if (onUserUpdated) {
        onUserUpdated(updatedUser as IUser);
      }

      handleModals('updateUser', false);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    } finally {
      setOnQuery(false);
    }
  };

  return (
    <Modal title="Editar usuário" setModal={() => handleModals('updateUser', false)}>
      <Formik
        initialValues={{
          id: selectedUser.id,
          image: selectedUser.image || '',
          name: selectedUser.name,
          role: selectedUser.role || '',
          email: selectedUser.email || '',
          phoneNumber: selectedUser.phoneNumber
            ? applyMask({ value: selectedUser.phoneNumber, mask: 'TEL' }).value
            : '',
          isBlocked: selectedUser.isBlocked,
          password: '',
          confirmPassword: '',
        }}
        validationSchema={userUpdateSchema}
        onSubmit={handleEditUser}
        enableReinitialize
      >
        {({ errors, values, touched, setFieldValue, isSubmitting }) => (
          <Form>
            <FormikImageInput
              name="image"
              label="Foto"
              error={touched.image && errors.image ? errors.image : null}
              defaultImage={values.image}
              onChange={(event: any) => {
                if (event.target.files?.length) {
                  setFieldValue('image', event.target.files[0]);
                }
              }}
            />

            <FormikInput
              name="name"
              label="Nome *"
              placeholder="Informe o nome"
              value={values.name}
              error={touched.name && errors.name ? errors.name : null}
            />

            <FormikInput
              name="role"
              label="Cargo"
              placeholder="Informe o cargo"
              value={values.role}
              error={touched.role && errors.role ? errors.role : null}
            />

            <FormikInput
              name="email"
              label="E-mail *"
              placeholder="Informe o email"
              value={values.email}
              error={touched.email && errors.email ? errors.email : null}
            />

            <FormikInput
              name="phoneNumber"
              label="Telefone *"
              placeholder="Informe o telefone"
              value={values.phoneNumber}
              error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : null}
              maxLength={applyMask({ value: values.phoneNumber, mask: 'TEL' }).length}
              onChange={(e) => {
                setFieldValue(
                  'phoneNumber',
                  applyMask({ value: e.target.value, mask: 'TEL' }).value,
                );
              }}
            />

            <FormikSelect
              name="isBlocked"
              label="Status *"
              selectPlaceholderValue="Selecione o status"
              value={values.isBlocked ? 'blocked' : 'active'}
              error={touched.isBlocked && errors.isBlocked ? errors.isBlocked : null}
              onChange={(e) => setFieldValue('isBlocked', e.target.value === 'blocked')}
            >
              <option value="active">Ativo</option>
              <option value="blocked">Bloqueado</option>
            </FormikSelect>

            <Style.PasswordDiv>
              <FormikInput
                name="password"
                label="Nova Senha"
                placeholder="Deixe em branco para manter a atual"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                error={touched.password && errors.password ? errors.password : null}
              />

              {values.password && (
                <IconButton
                  icon={icon.eye}
                  size="20px"
                  onClick={() => setShowPassword((prev) => !prev)}
                  opacity="1"
                />
              )}
            </Style.PasswordDiv>

            <Style.PasswordDiv>
              <FormikInput
                name="confirmPassword"
                label="Confirmar Nova Senha"
                placeholder="Confirme a nova senha"
                type={showPassword2 ? 'text' : 'password'}
                value={values.confirmPassword}
                error={
                  touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : null
                }
              />

              {values.confirmPassword && (
                <IconButton
                  icon={icon.eye}
                  size="20px"
                  onClick={() => setShowPassword2((prev) => !prev)}
                  opacity="1"
                />
              )}
            </Style.PasswordDiv>

            <Button
              bgColor="primary"
              type="submit"
              label="Atualizar"
              loading={onQuery || isSubmitting}
              center
              style={{ marginTop: '24px' }}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
