// REACT
import { useState } from 'react';

// GLOBAL COMPONENTS
import { Button } from '@components/Buttons/Button';

// COMPONENTS
import { Plan } from './Plan';
import { SystemsList } from './SystemsList';
import { FailureTypesList } from './FailureTypesList';

// STYLES
import * as Style from './styles';

// TYPES
export const Guarantees = () => {
  const [guaranteePage, setGuaranteePage] = useState<'plan' | 'systems' | 'failureTypes'>('plan');

  const handleGuaranteePageChange = (page: 'plan' | 'systems' | 'failureTypes') => {
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
          active={guaranteePage === 'systems'}
          onClick={() => handleGuaranteePageChange('systems')}
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

      {guaranteePage === 'plan' && <Plan />}
      {guaranteePage === 'systems' && <SystemsList />}
      {guaranteePage === 'failureTypes' && <FailureTypesList />}
    </Style.Container>
  );
};
