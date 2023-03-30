import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
// COMPONENTS
import { AuthProvider } from './contexts/Auth/AuthProvider';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import { Sidebar } from './components/Sidebar';

// AUTHENTICATION
import { Login } from './screens/Authentication/Login';

// COMPANIES
import { CompaniesList } from './screens/Companies/List';
import { CompanyDetails } from './screens/Companies/Details';
import { MaintenancesList } from './screens/Maintenances/List';

// CATEGORIES

const AppRoutes = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Login />} />

        <Route
          path="/"
          element={
            <RequireAuth>
              <Sidebar />
            </RequireAuth>
          }
        >
          <Route path="/companies" element={<Outlet />}>
            <Route index element={<CompaniesList />} />
            <Route path=":companyId" element={<CompanyDetails />} />
          </Route>

          <Route path="/maintenances" element={<MaintenancesList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default AppRoutes;
