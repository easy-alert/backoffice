// REACT
import { useState } from 'react';

// LIBS
import { Formik, Form } from 'formik';

// SERVICES
import { createUser, schemaUserCreate } from '@services/apis/createUser';

// GLOBAL COMPONENTS
import { Modal } from '@components/Modal';
import { FormikImageInput } from '@components/Form/FormikImageInput';
import { FormikInput } from '@components/Form/FormikInput';
import { Button } from '@components/Buttons/Button';

// GLOBAL UTILS
import { handleToastify } from '@utils/toastifyResponses';

// STYLES
import * as Style from './styles';

interface IModalCreateUser {
  setModal: (open: boolean) => void;
  reloadUsers?: () => void;
}

export const UserCreateModal = ({ setModal, reloadUsers }: IModalCreateUser) => {
  const [onQuery, setOnQuery] = useState(false);

  return (
    <Modal title="Cadastrar usuário" setModal={setModal}>
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
            const response = await createUser(data);
            handleToastify({
              status: 200,
              data: {
                ServerMessage: {
                  message: response?.ServerMessage?.message,
                },
              },
            });
            if (reloadUsers) reloadUsers();
            setModal(false);
            resetForm();
          } catch (err: any) {
            handleToastify({
              status: err?.response?.status || 400,
              data: {
                ServerMessage: {
                  message:
                    err?.response?.data?.ServerMessage?.message ||
                    err?.response?.data?.message ||
                    'Erro ao cadastrar usuário.',
                },
              },
            });
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
