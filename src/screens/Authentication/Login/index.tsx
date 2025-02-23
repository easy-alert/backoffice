// LIBS
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';

// COMPONENTS
import { Api } from '../../../services/api';
import { Button } from '../../../components/Buttons/Button';
import { FormikInput } from '../../../components/Form/FormikInput';

// STYLES
import * as Style from './styles';
import { theme } from '../../../styles/theme';

// ICONS
import { icon } from '../../../assets/icons';

// FUNCTIONS
import { schema } from './utils/functions';

// CONTEXTS
import { useAuthContext } from '../../../contexts/Auth/UseAuthContext';

// TYPES
import { IFormData } from './utils/types';
import { catchHandler } from '../../../utils/functions';

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
          await Api.post('/auth/login', {
            email: data.email,
            password: data.password,
          })
            .then((res) => {
              signin(res.data);
              navigate('/companies');
            })
            .catch((err) => {
              setOnQuery(false);
              catchHandler(err);
            });
        }}
      >
        {({ errors, values, touched }) => (
          <>
            <img src={icon.logoTextWhite} alt="" />
            <Style.LoginContainer>
              <Form>
                <Style.InputWrapper>
                  <h2>Login/Backoffice</h2>
                  <FormikInput
                    labelColor={theme.color.white}
                    errorColor={theme.color.white}
                    name="email"
                    label="E-mail"
                    placeholder="Insira seu e-mail"
                    value={values.email}
                    error={touched.email && errors.email ? errors.email : null}
                  />

                  <FormikInput
                    labelColor={theme.color.white}
                    errorColor={theme.color.white}
                    name="password"
                    label="Senha"
                    type="password"
                    value={values.password}
                    placeholder="Insira sua senha"
                    error={touched.password && errors.password ? errors.password : null}
                  />
                </Style.InputWrapper>
                <Button center label="Login" loading={onQuery} type="submit" />
              </Form>
            </Style.LoginContainer>
          </>
        )}
      </Formik>
    </Style.Background>
  );
};
