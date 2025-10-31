import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: ${({ theme }) => theme.size.lg};
  width: 100%;
  box-sizing: border-box;

  h1 {
    font-size: 24px;
    color: ${({ theme }) => theme.color.gray6};
    margin-bottom: ${({ theme }) => theme.size.lg};
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;

  th,
  td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray1};
  }

  th {
    background-color: ${({ theme }) => theme.color.gray0};
    font-weight: 600;
    color: ${({ theme }) => theme.color.gray5};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  td[colSpan] {
    text-align: center;
    color: ${({ theme }) => theme.color.gray4};
    padding: 32px;
  }
`;

const statusColors = {
  pending: { background: '#FFFBEB', color: '#B45309' },
  completed: { background: '#F0FDF4', color: '#166534' },
  expired: { background: '#FEF2F2', color: '#991B1B' },
};

export const StatusBadge = styled.span<{ status: 'pending' | 'completed' | 'expired' }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5;

  background-color: ${({ status }) => statusColors[status].background};
  color: ${({ status }) => statusColors[status].color};
`;
