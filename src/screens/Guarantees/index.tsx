// REACT
import { useState } from 'react';

// GLOBAL COMPONENTS
import { Button } from '@components/Buttons/Button';

// COMPONENTS
import { FailureTypesList } from './FailureTypesList';

// STYLES
import * as Style from './styles';

// TYPES
export const Guarantees = () => {
  const [guaranteePage, setGuaranteePage] = useState<'plan' | 'system' | 'failureTypes'>(
    'plan',
  );

  const handleGuaranteePageChange = (page: 'plan' | 'system' | 'failureTypes') => {
    setGuaranteePage(page);
  };

  return (
    <Style.Container>
      <Style.ButtonGroup>
        <Style.ButtonWrapper
          active={guaranteePage === 'plan'}
          onClick={() => handleGuaranteePageChange('plan')}
        >
          <Button label="Plano" />
        </Style.ButtonWrapper>

        <Style.ButtonWrapper
          active={guaranteePage === 'system'}
          onClick={() => handleGuaranteePageChange('system')}
        >
          <Button label="Sistema" />
        </Style.ButtonWrapper>

        <Style.ButtonWrapper
          active={guaranteePage === 'failureTypes'}
          onClick={() => handleGuaranteePageChange('failureTypes')}
        >
          <Button label="Tipos de falha" />
        </Style.ButtonWrapper>
      </Style.ButtonGroup>

      {/* {guaranteePage === 'plan' && <MaintenanceReports />} */}
      {/* {guaranteePage === 'ticket' && <TicketReports />} */}
      {guaranteePage === 'failureTypes' && <FailureTypesList />}
    </Style.Container>
  )
};
