import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

// SERVICES
import { getRegistrationCompany } from '@services/apis/getRegistrationCompany';

// STYLES
import * as Style from './styles';

const flagLabels: Record<string, string> = {
  gray: 'Nunca teve manutenção',
  red: 'Inativa há mais de 3 meses',
  yellow: 'Inativa entre 1 e 3 meses',
  green: 'Ativa (≤ 1 mês sem manutenção)',
};

const flagColors: Record<string, string> = {
  red: '#e74c3c',
  yellow: '#f1c40f',
  green: '#2ecc71',
  gray: '#bdc3c7',
};

export const RedFlagsChart: React.FC = () => {
  const [flagCounts, setFlagCounts] = useState<Record<string, number>>({
    red: 0,
    yellow: 0,
    green: 0,
    gray: 0,
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companies = await getRegistrationCompany();
        const counts: Record<string, number> = { red: 0, yellow: 0, green: 0, gray: 0 };
        companies.forEach((company) => {
          const flag = (company.maintenanceFlag as string) || 'gray';
          counts[flag] = (counts[flag] || 0) + 1;
        });
        setFlagCounts(counts);
      } catch (err) {
        setFlagCounts({ red: 0, yellow: 0, green: 0, gray: 0 });
      }
    };
    fetchCompanies();
  }, []);

  const series = Object.values(flagCounts);
  const labels = Object.keys(flagCounts).map((flag) => flagLabels[flag]);

  const options = {
    chart: {
      type: 'donut' as const,
      height: 320,
    },
    labels,
    colors: Object.keys(flagCounts).map((flag) => flagColors[flag]),
    legend: {
      position: 'bottom' as const,
      offsetY: 24,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} empresas`,
      },
    },
  };

  return (
    <Style.ChartContainer>
      <h3>Bandeiras de Atividade</h3>
      <ApexCharts options={options} series={series} type="donut" height={320} width="100%" />
    </Style.ChartContainer>
  );
};
