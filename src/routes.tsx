import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';

// COMPONENTS
import { AuthProvider } from '@contexts/Auth/AuthProvider';
import { RequireAuth } from '@contexts/Auth/RequireAuth';
import { Sidebar } from '@components/Sidebar';

// AUTHENTICATION
import { Login } from '@screens/Authentication/Login';

// COMPANIES
import { CompaniesList } from '@screens/Companies/List';
import { CompanyDetails } from '@screens/Companies/Details';
import UserPermissions from '@screens/Companies/UserPermissions';
import { MaintenancesList } from '@screens/Maintenances/List';
import { PlatformVideos } from '@screens/PlatformVideos';
import { UsersList } from '@screens/Users/List';
import { UserDetails } from '@screens/Users/Details';
import { BuildingsList } from '@screens/Building/List';
import Dashboard from '@screens/Dashboard';
import Chatbot from '@screens/Chatbot';
import { HomeFeed } from '@screens/HomeFeed';
import { BuildingDetails } from '@screens/Building/Details';
import { Guarantees } from '@screens/Guarantees';
import { ClientRegistrationPage } from '@screens/Companies/List/utils/modals/ClientRegistrationPage';
import { StatusPreRegister } from '@screens/StatusPreRegister';

// CATEGORIES

const AppRoutes = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/pre-cadastro-cliente" element={<ClientRegistrationPage />} />

        <Route
          path="/"
          element={
            <RequireAuth>
              <Sidebar />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/pre-register" element={<StatusPreRegister />} />

          <Route path="/companies" element={<Outlet />}>
            <Route index element={<CompaniesList />} />
            <Route path=":companyId" element={<CompanyDetails />} />
            <Route path=":companyId/permissions/:userId" element={<UserPermissions />} />
          </Route>

          <Route path="/users" element={<Outlet />}>
            <Route index element={<UsersList />} />
            <Route path=":userId" element={<UserDetails />} />
          </Route>

          <Route>
            <Route path="/buildings" element={<BuildingsList />} />
            <Route path="/buildings/:buildingId" element={<BuildingDetails />} />
          </Route>

          <Route path="/maintenances" element={<MaintenancesList />} />
          <Route path="/videos" element={<PlatformVideos />} />
          <Route path="/guarantees" element={<Guarantees />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/feed" element={<HomeFeed />} />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default AppRoutes;
