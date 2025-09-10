// REACT
import { useEffect, useState } from 'react';

// SERVICES
import { Api } from '@services/api';

// GLOBAL COMPONENTS
import { ColorfulTable, ColorfulTableContent } from '@components/ColorfulTable';
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';
import { Input } from '@components/Inputs/Input';
import TableCell from '@components/TableCell';

// GLOBAL UTILS
import { handleToastify } from '@utils/toastifyResponses';

// COMPONENTS
import { ClientEntriesChart } from './Components';

// STYLES
import * as Style from './styles';

interface IDashboardLoadings {
  activeCompanies: boolean;
  blockedCompanies: boolean;
  activeBuildings: boolean;
  blockedBuildings: boolean;
  activeUsers: boolean;
  blockedUsers: boolean;
  mostActiveCompanies: boolean;
}

interface IMostActiveCompany {
  id: string;
  name: string;
  _count: {
    MaintenancesHistory: number;
  };
}

function Dashboard() {
  const [companiesQuantity, setCompaniesQuantity] = useState({
    activeCompanies: 0,
    blockedCompanies: 0,
  });
  const [buildingsQuantity, setBuildingsQuantity] = useState({
    activeBuildings: 0,
    blockedBuildings: 0,
  });
  const [usersQuantity, setUsersQuantity] = useState({
    activeUsers: 0,
    blockedUsers: 0,
  });

  const [mostActiveCompanies, setMostActiveCompanies] = useState<IMostActiveCompany[]>([]);

  const [mostActiveCompaniesTake, setMostActiveCompaniesTake] = useState(10);

  const [dashboardLoadings, setDashboardLoadings] = useState<IDashboardLoadings>({
    activeCompanies: false,
    blockedCompanies: false,
    activeBuildings: false,
    blockedBuildings: false,
    activeUsers: false,
    blockedUsers: false,
    mostActiveCompanies: false,
  });

  // #region api functions
  const handleGetCompaniesQuantity = async (status: string) => {
    setDashboardLoadings((prevState) => ({
      ...prevState,
      [`${status}Companies`]: true,
    }));

    try {
      const response = await Api.get(`/dashboard/companies/quantity?status=${status}`);

      const { companiesCount } = response.data as {
        companiesCount: number;
      };

      setCompaniesQuantity((prevState) => ({
        ...prevState,
        [`${status}Companies`]: companiesCount || 0,
      }));
    } catch (error: any) {
      handleToastify(error);
    } finally {
      setDashboardLoadings((prevState) => ({
        ...prevState,
        [`${status}Companies`]: false,
      }));
    }
  };

  const handleGetBuildingsQuantity = async (status: string) => {
    setDashboardLoadings((prevState) => ({
      ...prevState,
      [`${status}Buildings`]: true,
    }));

    try {
      const response = await Api.get(`/dashboard/buildings/quantity?status=${status}`);

      const { buildingsCount } = response.data as {
        buildingsCount: number;
      };

      setBuildingsQuantity((prevState) => ({
        ...prevState,
        [`${status}Buildings`]: buildingsCount || 0,
      }));
    } catch (error: any) {
      handleToastify(error);
    } finally {
      setDashboardLoadings((prevState) => ({
        ...prevState,
        [`${status}Buildings`]: false,
      }));
    }
  };

  const handleGetUsersQuantity = async (status: string) => {
    setDashboardLoadings((prevState) => ({
      ...prevState,
      [`${status}Users`]: true,
    }));

    try {
      const response = await Api.get(`/dashboard/users/quantity?status=${status}`);

      const { usersCount } = response.data as {
        usersCount: number;
      };

      setUsersQuantity((prevState) => ({
        ...prevState,
        [`${status}Users`]: usersCount || 0,
      }));
    } catch (error: any) {
      handleToastify(error);
    } finally {
      setDashboardLoadings((prevState) => ({
        ...prevState,
        [`${status}Users`]: false,
      }));
    }
  };

  const handleGetMostActiveCompanies = async () => {
    setDashboardLoadings((prevState) => ({
      ...prevState,
      mostActiveCompanies: true,
    }));

    const params = {
      take: mostActiveCompaniesTake,
    };

    try {
      const response = await Api.get('/dashboard/companies/ranking/most-active', { params });

      const { companies } = response.data as {
        companies: IMostActiveCompany[];
      };

      setMostActiveCompanies(companies);
    } catch (error: any) {
      handleToastify(error);

      setMostActiveCompanies([]);
    } finally {
      setDashboardLoadings((prevState) => ({
        ...prevState,
        mostActiveCompanies: false,
      }));
    }
  };
  // #endregion

  // #region dashboard functions
  const handleGetAllCompaniesQuantity = async () => {
    try {
      handleGetCompaniesQuantity('active');
      handleGetCompaniesQuantity('blocked');
    } catch (error: any) {
      handleToastify(error);
    }
  };

  const handleGetAllBuildingsQuantity = async () => {
    try {
      handleGetBuildingsQuantity('active');
      handleGetBuildingsQuantity('blocked');
    } catch (error: any) {
      handleToastify(error);
    }
  };

  const handleGetAllUsersQuantity = async () => {
    try {
      handleGetUsersQuantity('active');
      handleGetUsersQuantity('blocked');
    } catch (error: any) {
      handleToastify(error);
    }
  };

  const handleGetDashboardData = async () => {
    // get active and blocked companies quantity
    handleGetAllCompaniesQuantity();

    // get active and blocked buildings quantity
    handleGetAllBuildingsQuantity();

    // get active and blocked users quantity
    handleGetAllUsersQuantity();

    // get most active companies
    handleGetMostActiveCompanies();
  };
  // #endregion

  useEffect(() => {
    handleGetDashboardData();
  }, []);

  return (
    <Style.Container>
      <Style.HeaderTitle>Dashboard</Style.HeaderTitle>

      <Style.Wrappers>
        <Style.ChartsRow>
          <ClientEntriesChart />
        </Style.ChartsRow>

        <Style.QuantitiesCards>
          {/* active companies */}
          <Style.QuantityCard>
            {dashboardLoadings.activeCompanies ? (
              <DotSpinLoading />
            ) : (
              <Style.QuantityCardContent>
                <h5>Empresas ativas</h5>
                <p>{companiesQuantity.activeCompanies}</p>
              </Style.QuantityCardContent>
            )}
          </Style.QuantityCard>

          {/* blocked companies */}
          <Style.QuantityCard>
            {dashboardLoadings.blockedCompanies ? (
              <DotSpinLoading />
            ) : (
              <Style.QuantityCardContent>
                <h5>Empresas bloqueadas</h5>
                <p>{companiesQuantity.blockedCompanies}</p>
              </Style.QuantityCardContent>
            )}
          </Style.QuantityCard>

          {/* active buildings */}
          <Style.QuantityCard>
            {dashboardLoadings.activeBuildings ? (
              <DotSpinLoading />
            ) : (
              <Style.QuantityCardContent>
                <h5>Prédios ativos</h5>
                <p>{buildingsQuantity.activeBuildings}</p>
              </Style.QuantityCardContent>
            )}
          </Style.QuantityCard>

          {/* blocked buildings */}
          <Style.QuantityCard>
            {dashboardLoadings.blockedBuildings ? (
              <DotSpinLoading />
            ) : (
              <Style.QuantityCardContent>
                <h5>Prédios bloqueados</h5>
                <p>{buildingsQuantity.blockedBuildings}</p>
              </Style.QuantityCardContent>
            )}
          </Style.QuantityCard>

          {/* active users */}
          <Style.QuantityCard>
            {dashboardLoadings.activeUsers ? (
              <DotSpinLoading />
            ) : (
              <Style.QuantityCardContent>
                <h5>Usuários ativos</h5>
                <p>{usersQuantity.activeUsers}</p>
              </Style.QuantityCardContent>
            )}
          </Style.QuantityCard>

          {/* blocked users */}
          <Style.QuantityCard>
            {dashboardLoadings.blockedUsers ? (
              <DotSpinLoading />
            ) : (
              <Style.QuantityCardContent>
                <h5>Usuários bloqueados</h5>
                <p>{usersQuantity.blockedUsers}</p>
              </Style.QuantityCardContent>
            )}
          </Style.QuantityCard>
        </Style.QuantitiesCards>

        <Style.CompletedMaintenancesContainer>
          <Style.CompletedMaintenancesHeader>
            <h3>Empresas mais ativas</h3>

            <div>
              <Input
                type="number"
                label=""
                value={mostActiveCompaniesTake}
                onChange={(e) => setMostActiveCompaniesTake(Number(e.target.value))}
                min={1}
                max={100}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (mostActiveCompaniesTake < 1) {
                      setMostActiveCompaniesTake(1);
                    } else if (mostActiveCompaniesTake > 100) {
                      setMostActiveCompaniesTake(100);
                    }
                    handleGetMostActiveCompanies();
                  }
                }}
                onBlur={() => {
                  if (mostActiveCompaniesTake < 1) {
                    setMostActiveCompaniesTake(1);
                  } else if (mostActiveCompaniesTake > 100) {
                    setMostActiveCompaniesTake(100);
                  }
                  handleGetMostActiveCompanies();
                }}
                placeholder="Digite a quantidade de empresas"
              />
            </div>
          </Style.CompletedMaintenancesHeader>

          <ColorfulTable
            colsHeader={[
              { label: '#', cssProps: { width: '5%', textAlign: 'center' } },
              { label: 'Empresa' },
              { label: 'Manutenções Concluídas', cssProps: { width: '10%', textAlign: 'center' } },
            ]}
          >
            {mostActiveCompanies.length === 0 && !dashboardLoadings.mostActiveCompanies && (
              <ColorfulTableContent
                colsBody={[
                  {
                    colSpan: 3,
                    cell: (
                      <Style.EmptyContainer>
                        <h4>Nenhuma empresa encontrada</h4>
                      </Style.EmptyContainer>
                    ),
                  },
                ]}
              />
            )}

            {mostActiveCompanies.length > 0 &&
              !dashboardLoadings.mostActiveCompanies &&
              mostActiveCompanies.map((company, index) => (
                <ColorfulTableContent
                  key={company.id}
                  colsBody={[
                    {
                      cell: (
                        <TableCell
                          type="string"
                          value={index + 1}
                          style={{ textAlign: 'center' }}
                        />
                      ),
                    },
                    {
                      cell: (
                        <TableCell
                          type="string"
                          value={company.name || ''}
                          style={{ fontWeight: 'bold' }}
                        />
                      ),
                    },
                    {
                      cell: (
                        <TableCell
                          type="string"
                          // eslint-disable-next-line no-underscore-dangle
                          value={company._count.MaintenancesHistory || 0}
                          style={{ textAlign: 'center' }}
                        />
                      ),
                    },
                  ]}
                />
              ))}
          </ColorfulTable>
        </Style.CompletedMaintenancesContainer>
      </Style.Wrappers>
    </Style.Container>
  );
}

export default Dashboard;
