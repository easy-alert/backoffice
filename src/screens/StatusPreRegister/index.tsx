import { useEffect, useState } from 'react';

// SERVICES
import { ILinkData, requestLinksList, statusLabels } from '@services/apis/getStatusPreRegister';

// COMPONENTES
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';
import { Table, TableContent } from '@components/Table';

// STYLES
import * as Style from './styles';

export const StatusPreRegister = () => {
  const [links, setLinks] = useState<ILinkData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setError(null);
        setIsLoading(true);

        const data = await requestLinksList();
        setLinks(data);
      } catch (err) {
        setError('Não foi possível carregar os links.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, []);

  if (isLoading) {
    return <DotSpinLoading />;
  }

  if (error) {
    return <p style={{ padding: '2rem' }}>{error}</p>;
  }

  const colsHeader = [
    { label: 'Nome do Cliente' },
    { label: 'Status' },
    { label: 'Data de Criação' },
    { label: 'Data de Expiração' },
  ];

  const rows =
    links.length > 0
      ? links.map((link) => (
          <TableContent
            key={link.id}
            onClick={() => undefined}
            colsBody={[
              { cell: link.name },
              {
                cell: (
                  <Style.StatusBadge status={link.status}>
                    {statusLabels[link.status]}
                  </Style.StatusBadge>
                ),
              },
              { cell: new Date(link.createdAt).toLocaleDateString('pt-BR') },
              { cell: new Date(link.expiresAt).toLocaleDateString('pt-BR') },
            ]}
          />
        ))
      : [
          <TableContent
            key="empty"
            colsBody={[
              {
                cell: 'Nenhum link encontrado.',
                cssProps: { gridColumn: '1 / -1', textAlign: 'center' },
              },
            ]}
            onClick={() => undefined}
          />,
        ];

  return (
    <Style.PageContainer>
      <h1>Status dos Links de Pré-Cadastro</h1>

      <Table colsHeader={colsHeader}>{rows}</Table>
    </Style.PageContainer>
  );
};
