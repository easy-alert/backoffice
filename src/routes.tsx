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
import { UserDetails } from '@screens/Users/List/Details';
import { BuildingsList } from '@screens/Building/List';
import { BuildingDetails } from '@screens/Building/List/Details';
import Dashboard from '@screens/Dashboard';
import { HomeFeed } from '@screens/HomeFeed';

// CATEGORIES

const AppRoutes = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <RequireAuth>
              <Sidebar />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="/login" replace />} />

          <Route path="/dashboard" element={<Dashboard />} />

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
          <Route path="/feed" element={<HomeFeed />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default AppRoutes;
