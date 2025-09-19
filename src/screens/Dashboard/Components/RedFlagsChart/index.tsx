import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

// SERVICES
import { getRegistrationCompany } from '@services/apis/getRegistrationCompany';

// COMPONENTS
import { Modal } from '@components/Modal';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFlag, setModalFlag] = useState<string | null>(null);

  const [flagCounts, setFlagCounts] = useState<Record<string, number>>({
    red: 0,
    yellow: 0,
    green: 0,
    gray: 0,
  });

  const [flagCompanyNames, setFlagCompanyNames] = useState<Record<string, string[]>>({
    red: [],
    yellow: [],
    green: [],
    gray: [],
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companies = await getRegistrationCompany();
        const counts: Record<string, number> = { red: 0, yellow: 0, green: 0, gray: 0 };
        const names: Record<string, string[]> = { red: [], yellow: [], green: [], gray: [] };
        companies
          .filter((company) => company.isBlocked === false)
          .forEach((company) => {
            const flag = (company.maintenanceFlag as string) || 'gray';
            counts[flag] = (counts[flag] || 0) + 1;
            names[flag].push(company.name);
          });
        setFlagCounts(counts);
        setFlagCompanyNames(names);
      } catch (err) {
        setFlagCounts({ red: 0, yellow: 0, green: 0, gray: 0 });
        setFlagCompanyNames({ red: [], yellow: [], green: [], gray: [] });
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
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) => {
          const flag = Object.keys(flagCounts)[config.dataPointIndex];
          setModalFlag(flag);
          setModalOpen(true);
        },
      },
    },
    labels,
    colors: Object.keys(flagCounts).map((flag) => flagColors[flag]),
    legend: {
      position: 'bottom' as const,
      offsetY: 24,
    },
    tooltip: {
      enabled: true,
      custom({ series: chartSeries, seriesIndex }: { series: number[]; seriesIndex: number }) {
        const flag = Object.keys(flagCounts)[seriesIndex];
        const names = flagCompanyNames[flag] || [];
        const maxToShow = 10;
        const shownNames = names.slice(0, maxToShow);
        const list = shownNames.map((name) => `<li>${name}</li>`).join('');
        const more =
          names.length > maxToShow ? `<li>...e mais ${names.length - maxToShow} empresas</li>` : '';
        return `
          <div style="padding:8px; background:#fff; color:#222; border-radius:8px; max-width:350px;">
            ${chartSeries[seriesIndex]} empresas:
            <ul style="padding-left:18px; margin:0;">
              ${list}
              ${more}
            </ul>
          </div>
        `;
      },
    },
  };

  return (
    <Style.ChartContainer>
      <h3>Bandeiras de Atividade</h3>
      <ApexCharts options={options} series={series} type="donut" height={320} width="100%" />
      {modalOpen && modalFlag && (
        <Modal setModal={setModalOpen} title={flagLabels[modalFlag]} bodyWidth="460px" closeOutside>
          <ul>
            {flagCompanyNames[modalFlag].map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </Modal>
      )}
    </Style.ChartContainer>
  );
};
