// LIBS
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';

// COMPONENTS
import { Api } from '../../../services/api';
import { Button } from '../../../components/Buttons/Button';
import { Image } from '../../../components/Image';
import { FormikInput } from '../../../components/Form/FormikInput';

// STYLES
import * as Style from './styles';

// ICONS
import { icon } from '../../../assets/icons';

// FUNCTIONS
import { schema } from './utils/functions';

// CONTEXTS
import { useAuthContext } from '../../../contexts/Auth/UseAuthContext';

// TYPES
import { IFormData } from './types';

export const Login = () => {
  const navigate = useNavigate();
  const { signin } = useAuthContext();
  const [onQuery, setOnQuery] = useState<boolean>(false);

  return (
    <Style.Background>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={schema}
        onSubmit={async (data: IFormData) => {
          setOnQuery(true);
          await Api.post('/auth/backoffice/login', {
            email: data.email,
            password: data.password,
          })
            .then((res) => {
              signin(res.data);
              navigate('/companies');
            })
            .catch((err) => {
              setOnQuery(false);
              if (err.response.data) {
                toast.error(err.response.data.ServerMessage.message);
              } else {
                toast.error('Erro de comunicação');
              }
            });
        }}
      >
        {({ errors, values, touched }) => (
          <Form>
            <Image
              img={icon.logoTextWhite}
              width="290px"
              height="65px"
              radius="0"
            />
            <Style.LoginContainer>
              <h2>Login/Backoffice</h2>
              <FormikInput
                name="email"
                label="E-mail"
                placeholder="Ex: joao.silva@ada.com.br"
                value={values.email}
                error={touched.email && errors.email ? errors.email : null}
              />

              <FormikInput
                name="password"
                label="Senha"
                type="password"
                value={values.password}
                placeholder="Insira sua senha"
                error={
                  touched.password && errors.password ? errors.password : null
                }
              />
            </Style.LoginContainer>
            <Button label="Login" loading={onQuery} type="submit" />
          </Form>
        )}
      </Formik>
    </Style.Background>
  );
};
