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

export const MaintenanceCard = ({
  maintenance,
  timeIntervals,
  categories,
  setCategories,
  categoryId,
}: IMaintenanceCard) => {
  const [cardIsOpen, setCardIsOpen] = useState<boolean>(false);
  const [modalEditMaintenanceOpen, setModalEditMaintenanceOpen] = useState<boolean>(false);

  return (
    <>
      {modalEditMaintenanceOpen && (
        <ModalEditMaintenance
          setModal={setModalEditMaintenanceOpen}
          selectedMaintenance={maintenance}
          timeIntervals={timeIntervals}
          categories={categories}
          setCategories={setCategories}
          categoryId={categoryId}
        />
      )}
      <Style.MaintenancesCard
        onClick={() => {
          setCardIsOpen((prevState) => !prevState);
        }}
      >
        <Style.MaintenancesCardContent>
          <Style.MaintenancesCardTopContent>
            <Style.MaintenancesGrid cardIsOpen={cardIsOpen}>
              <p className="p2">{maintenance.element}</p>
              <p className="p2">{maintenance.activity}</p>
              <p className="p2">
                A cada{' '}
                {`${maintenance.frequency} ${
                  maintenance.frequency > 1
                    ? maintenance.FrequencyTimeInterval.pluralLabel
                    : maintenance.FrequencyTimeInterval.singularLabel
                }`}
              </p>
              <p className="p2">{maintenance.responsible}</p>
              <p className="p2">{maintenance.source}</p>
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
                {maintenance.observation && maintenance.observation !== ''
                  ? maintenance.observation
                  : '-'}
              </p>

              <p className="p2">
                <span>Prazo para execução: </span>
                {`${maintenance.period} ${
                  maintenance.period > 1
                    ? maintenance.PeriodTimeInterval.pluralLabel
                    : maintenance.PeriodTimeInterval.singularLabel
                }`}
              </p>
              {/*
              <Style.PeriodIconWrapper title="Tempo para iniciar a notificação após a entrega da obra.">
                <Image img={icon.alert} size="16px" />
                <p className="p2">
                  <span>Delay: </span>
                  {maintenance.delay > 0
                    ? `${maintenance.delay} ${
                        maintenance.delay > 1
                          ? maintenance.DelayTimeInterval.pluralLabel
                          : maintenance.DelayTimeInterval.singularLabel
                      }`
                    : '-'}
                </p>
              </Style.PeriodIconWrapper> */}

              <Style.MaintenancesCardGridMoreEditButton>
                <div>
                  <Button
                    label="Editar"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalEditMaintenanceOpen(true);
                    }}
                  />
                </div>
              </Style.MaintenancesCardGridMoreEditButton>
            </Style.MaintenancesMoreGrid>
          </Style.MaintenancesCardBottomContainer>
        </Style.MaintenancesCardContent>
      </Style.MaintenancesCard>
    </>
  );
};
