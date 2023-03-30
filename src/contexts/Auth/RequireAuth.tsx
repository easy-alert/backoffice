// LIBS
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Api } from '../../services/api';

// CONTEXTS
import { AuthContext } from './AuthContext';

// COMPONENTS
import { DotSpinLoading } from '../../components/Loadings/DotSpinLoading';

// TYPES
import { IRequireAuth } from './utils/types';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;

export const RequireAuth = ({ children }: IRequireAuth) => {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const validateToken = async () => {
    await Api.get('/auth/validate/token')
      .then((res) => {
        setUser(res.data.User);
        setLoading(false);
      })
      .catch(() => navigate('/login'));
  };

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      validateToken();
    } else {
      navigate('/login');
    }
  }, []);

  return loading ? (
    <Container>
      <DotSpinLoading label="Verificando credenciais" />
    </Container>
  ) : (
    children
  );
};
