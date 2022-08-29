import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
// COMPONENTS
import { AuthProvider } from './contexts/Auth/AuthProvider';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import { Sidebar } from './components/Sidebar';

// AUTHENTICATION
import { Login } from './screens/Authentication/Login';

// USER
import { UsersList } from './screens/User/List/index';
import { UsersDetails } from './screens/User/Details';

const AppRoutes = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Login />} />

        <Route
          path="/"
          element={
            <Sidebar>
              <RequireAuth />
            </Sidebar>
          }
        >
          <Route path="/users" element={<Outlet />}>
            <Route index element={<UsersList />} />
            <Route path=":user_id" element={<UsersDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default AppRoutes;
