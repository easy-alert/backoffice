// LIBS
import { useState } from 'react';

// COMPONENTS
import { icon } from '../../../../../../assets/icons';
import { Button } from '../../../../../../components/Buttons/Button';
import { Image } from '../../../../../../components/Image';
import * as Style from './styles';

// TYPES
import { IMaintenanceCard } from './utils/types';

// MODALS
import { ModalEditMaintenance } from './utils/ModalEditMaintenance';

export const MaintenanceCard = ({ maintenance }: IMaintenanceCard) => {
  const [cardIsOpen, setCardIsOpen] = useState<boolean>(false);
  const [modalEditMaintenanceOpen, setModalEditMaintenanceOpen] =
    useState<boolean>(false);

  return (
    <>
      <ModalEditMaintenance
        modalState={modalEditMaintenanceOpen}
        setModalState={setModalEditMaintenanceOpen}
        selectedMaintenance={maintenance}
      />
      <Style.MaintenancesCard
        onClick={() => {
          setCardIsOpen((prevState) => !prevState);
        }}
      >
        <Style.MaintenancesCardContent>
          <Style.MaintenancesCardTopContent>
            <Style.MaintenancesGrid>
              <p className="p2">{maintenance[0].element}</p>
              <p className="p2">{maintenance[0].activity}</p>
              <p className="p2"> {maintenance[0].frequency}</p>
              <p className="p2"> {maintenance[0].responsible}</p>
              <p className="p2"> {maintenance[0].source}</p>
              <Style.ArrowContainer>
                <Style.Arrow cardIsOpen={cardIsOpen}>
                  <Image img={icon.downArrow} size="16px" />
                </Style.Arrow>
              </Style.ArrowContainer>
            </Style.MaintenancesGrid>
          </Style.MaintenancesCardTopContent>

          <Style.MaintenancesCardBottomContainer cardIsOpen={cardIsOpen}>
            <Style.Hr />
            <Style.MaintenancesMoreGrid>
              <p className="p2">
                <span>Observação: </span>
                {maintenance[0].observation}
              </p>

              <Style.MaintenancesCardBottomPeriod>
                <Style.PeriodIconWrapper>
                  <Image img={icon.alert} size="16px" />
                  <p className="p2">
                    <span>Período: </span>
                    {maintenance[0].period}
                  </p>
                </Style.PeriodIconWrapper>
                <p className="p2">
                  <span>Delay: </span>
                  {maintenance[0].delay}
                </p>
              </Style.MaintenancesCardBottomPeriod>
              <Style.MaintenancesCardGridMoreEditButton>
                <Button
                  label="Editar"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalEditMaintenanceOpen(true);
                  }}
                />
              </Style.MaintenancesCardGridMoreEditButton>
            </Style.MaintenancesMoreGrid>
          </Style.MaintenancesCardBottomContainer>
        </Style.MaintenancesCardContent>
      </Style.MaintenancesCard>
    </>
  );
};
