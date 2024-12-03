import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// COMPONENTS
import { AuthProvider } from '@contexts/Auth/AuthProvider';
import { RequireAuth } from '@contexts/Auth/RequireAuth';
import { Sidebar } from '@components/Sidebar';

// AUTHENTICATION
import { Login } from '@screens/Authentication/Login';

// COMPANIES
import { CompaniesList } from '@screens/Companies/List';
import { CompanyDetails } from '@screens/Companies/Details';
import { MaintenancesList } from '@screens/Maintenances/List';
import { Tutorials } from '@screens/Tutorials';

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
          <Route path="/tutorials" element={<Tutorials />} />

          {/* Desativado em função das tasks SA-6535 em diante que mudou isso pra company */}
          {/* <Route path="/suppliers" element={<Outlet />}>
            <Route index element={<SuppliersList />} />
            <Route path=":supplierId" element={<SupplierDetails />} />
          </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default AppRoutes;
