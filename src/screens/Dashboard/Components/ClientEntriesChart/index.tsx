// REACT
import React, { useEffect, useState } from 'react';

// LIBS
import ApexCharts from 'react-apexcharts';

// SERVICES
import { Company, getRegistrationCompany } from '@services/apis/getRegistrationCompany';

// STYLES
import * as Style from './styles';

export const ClientEntriesChart: React.FC = () => {
  const [data, setData] = useState<Company[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [years, setYears] = useState<string[]>([]);

  const monthNames = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companies = await getRegistrationCompany();
        setData(companies);

        const yearSet = new Set<string>();
        companies.forEach((company) => {
          if (company.createdAt) {
            yearSet.add(new Date(company.createdAt).getUTCFullYear().toString());
          }
        });
        const yearsArr = Array.from(yearSet).sort((a, b) => b.localeCompare(a));
        setYears(yearsArr);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Falha ao buscar empresas para o gráfico:', err.message);
        } else {
          console.error('Falha ao buscar empresas para o gráfico:', err);
        }
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (years.length > 0 && !years.includes(selectedYear)) {
      setSelectedYear(years[0]);
    }
  }, [years, selectedYear]);

  const grouped: { [month: string]: number } = {};
  const companiesByMonth: { [month: string]: Company[] } = {};
  data.forEach((company) => {
    if (company.createdAt && selectedYear) {
      const date = new Date(company.createdAt);
      const year = date.getUTCFullYear().toString();
      if (year === selectedYear) {
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        grouped[month] = (grouped[month] || 0) + 1;
        if (!companiesByMonth[month]) companiesByMonth[month] = [];
        companiesByMonth[month].push(company);
      }
    }
  });

  const values = months.map((m) => grouped[m] || 0);

  const options = {
    chart: {
      toolbar: { show: false },
      height: 320,
      offsetY: 20,
    },
    xaxis: {
      categories: monthNames,
      title: {
        text: 'Mês',
        style: {
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 500,
          fontSize: '14px',
        },
      },
      labels: {
        rotate: -45,
        style: {
          fontSize: '12px',
          fontFamily: 'DM Sans, sans-serif',
        },
      },
    },
    colors: ['#008FFB'],
    tooltip: {
      custom({ dataPointIndex }: { dataPointIndex: number }) {
        const month = months[dataPointIndex];
        const companies = companiesByMonth[month] || [];
        return `
          <div class="tooltip-container">
            <div><b>${month}/${selectedYear}</b></div>
            <div>Cadastros: <b>${companies.length}</b></div>
            <div class="companies-list">
              ${
                companies.length > 0
                  ? companies.map((c) => `<div class="company-item">• ${c.name}</div>`).join('')
                  : "<div class='company-item'>Nenhuma empresa cadastrada.</div>"
              }
            </div>
          </div>
        `;
      },
    },
  };
  const series = [{ name: 'Cadastros', data: values }];

  return (
    <Style.ChartContainer>
      <h3>Cadastros de Empresas em {selectedYear}</h3>
      <Style.YearSelectWrapper>
        <Style.YearLabel htmlFor="year-select">
          Ano:&nbsp;
          <Style.YearSelect
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Style.YearSelect>
        </Style.YearLabel>
      </Style.YearSelectWrapper>
      <ApexCharts options={options} series={series} type="bar" height={320} width="100%" />
    </Style.ChartContainer>
  );
};
