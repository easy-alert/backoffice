// REACT
import { useState } from 'react';

// LIBS
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// SERVICES
import { createUser } from '@services/apis/createUser';

// GLOBAL COMPONENTS
import { Modal } from '@components/Modal';
import { FormikImageInput } from '@components/Form/FormikImageInput';
import { FormikInput } from '@components/Form/FormikInput';
import { Button } from '@components/Buttons/Button';

// STYLES
import * as Style from './styles';

const schemaUserCreate = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  phoneNumber: Yup.string().required('Telefone obrigatório'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Senha obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não coincidem')
    .required('Confirme a senha'),
});

interface IModalCreateUser {
  onModalChange: (open: boolean) => void;
  reloadUsers?: () => void;
}

export const UserCreateModal = ({ onModalChange, reloadUsers }: IModalCreateUser) => {
  const [onQuery, setOnQuery] = useState(false);

  return (
    <Modal title="Cadastrar usuário" setModal={onModalChange}>
      <Formik
        initialValues={{
          name: '',
          image: '',
          role: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={schemaUserCreate}
        onSubmit={async (data, { resetForm }) => {
          setOnQuery(true);
          try {
            await createUser(data);
            if (reloadUsers) reloadUsers();
            onModalChange(false);
            resetForm();
          } catch (error) {
            // Erro já foi tratado no service com handleToastify
            // Aqui você pode adicionar lógica adicional se necessário
          } finally {
            setOnQuery(false);
          }
        }}
      >
        {({ errors, values, touched, setFieldValue }) => (
          <Style.FormContainer>
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
                label="Nome *"
                name="name"
                value={values.name}
                error={touched.name && errors.name ? errors.name : null}
                placeholder="Ex: João Silva"
              />
              <FormikInput
                label="E-mail *"
                name="email"
                value={values.email}
                error={touched.email && errors.email ? errors.email : null}
                placeholder="Ex: joao@email.com"
              />
              <FormikInput
                label="Cargo"
                name="role"
                value={values.role}
                error={touched.role && errors.role ? errors.role : null}
                placeholder="Ex: Administrador"
              />
              <FormikInput
                label="Telefone *"
                name="phoneNumber"
                value={values.phoneNumber}
                error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : null}
                placeholder="Ex: (00) 00000-0000"
              />
              <FormikInput
                type="password"
                label="Senha *"
                name="password"
                value={values.password}
                error={touched.password && errors.password ? errors.password : null}
                placeholder="Crie uma senha"
              />
              <FormikInput
                type="password"
                label="Confirmar senha *"
                name="confirmPassword"
                value={values.confirmPassword}
                error={
                  touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : null
                }
                placeholder="Confirme a senha"
              />
              <Button center label="Cadastrar" type="submit" loading={onQuery} />
            </Form>
          </Style.FormContainer>
        )}
      </Formik>
    </Modal>
  );
};
