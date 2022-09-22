/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */

// LIBS
import { useState } from 'react';
import { icon } from '../../../../../../assets/icons';

// COMPONENTS
import { IconButton } from '../../../../../../components/Buttons/IconButton';

import { theme } from '../../../../../../styles/theme';
import * as Style from './styles';
import { MaintenanceCard } from '../MaintenanceCard';

// MODALS
import { ModalCreateMaintenance } from './utils/ModalCreateMaintenance';
import { ModalEditCategory } from './utils/ModalEditCategory';

// FUNCTIONS
import { alphabeticalOrder, nestedObjectAlphabeticalOrder } from './utils/functions';

// TYPES
import { IMaintenanceCategory, ISortType } from './utils/types';

export const MaintenanceCategory = ({
  category,
  categories,
  setCategories,
  timeIntervals,
}: IMaintenanceCategory) => {
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [sortType, setSortType] = useState<ISortType>({ type: 'element' });
  const [modalCreateMaintenanceOpen, setModalCreateMaintenanceOpen] =
    useState<boolean>(false);
  const [modalEditCategoryOpen, setModalEditCategoryOpen] = useState<boolean>(false);

  return (
    <>
      {modalCreateMaintenanceOpen && (
        <ModalCreateMaintenance
          modalState={modalCreateMaintenanceOpen}
          setModalState={setModalCreateMaintenanceOpen}
          categoryId={category.id}
          categories={categories}
          setCategories={setCategories}
          timeIntervals={timeIntervals}
        />
      )}
      {modalEditCategoryOpen && (
        <ModalEditCategory
          modalState={modalEditCategoryOpen}
          setModalState={setModalEditCategoryOpen}
          categoryId={category.id}
          categoryName={category.name}
          categories={categories}
          setCategories={setCategories}
        />
      )}
      <Style.Background>
        <Style.HeaderCategory>
          <Style.HeaderTitle>
            <Style.Container>
              <h5>{category.name}</h5>
              <IconButton
                size="16px"
                icon={icon.edit}
                onClick={() => {
                  setModalEditCategoryOpen(true);
                }}
              />
            </Style.Container>

            <IconButton
              hideLabelOnMedia
              icon={icon.plus}
              size="16px"
              label="Criar manutenção"
              onClick={() => {
                setModalCreateMaintenanceOpen(true);
              }}
            />
          </Style.HeaderTitle>
        </Style.HeaderCategory>

        <Style.MaintenancesContainer>
          {category.Maintenances.length ? (
            <Style.MaintenancesHeader>
              <Style.MaintenancesGrid>
                <p
                  className="p2"
                  style={{
                    color:
                      sortType.type === 'element' ? theme.color.black : theme.color.gray4,
                  }}
                  onClick={() => {
                    setSortType({ type: 'element' });
                    alphabeticalOrder({
                      category,
                      isSorted,
                      setIsSorted,
                      toSortString: 'element',
                      defaultSortedColumn: true,
                    });
                  }}
                >
                  Elemento{isSorted && sortType.type === 'element' ? '▴' : '▾'}
                </p>
                <p
                  className="p2"
                  style={{
                    color:
                      sortType.type === 'activity'
                        ? theme.color.black
                        : theme.color.gray4,
                  }}
                  onClick={() => {
                    setSortType({ type: 'activity' });
                    alphabeticalOrder({
                      category,
                      isSorted,
                      setIsSorted,
                      toSortString: 'activity',
                    });
                  }}
                >
                  Atividade{isSorted && sortType.type === 'activity' ? '▾' : '▴'}
                </p>
                <p
                  className="p2"
                  style={{
                    color:
                      sortType.type === 'frequency'
                        ? theme.color.black
                        : theme.color.gray4,
                  }}
                  onClick={() => {
                    setSortType({ type: 'frequency' });
                    nestedObjectAlphabeticalOrder({
                      category,
                      isSorted,
                      setIsSorted,
                      toSortString: 'singularLabel',
                      toSortObject: 'FrequencyTimeInterval',
                    });
                  }}
                >
                  Frequência{isSorted && sortType.type === 'frequency' ? '▾' : '▴'}
                </p>
                <p
                  className="p2"
                  style={{
                    color:
                      sortType.type === 'responsible'
                        ? theme.color.black
                        : theme.color.gray4,
                  }}
                  onClick={() => {
                    setSortType({ type: 'responsible' });
                    alphabeticalOrder({
                      category,
                      isSorted,
                      setIsSorted,
                      toSortString: 'responsible',
                    });
                  }}
                >
                  Responsável{isSorted && sortType.type === 'responsible' ? '▾' : '▴'}
                </p>
                <p
                  className="p2"
                  style={{
                    color:
                      sortType.type === 'source' ? theme.color.black : theme.color.gray4,
                  }}
                  onClick={() => {
                    setSortType({ type: 'source' });
                    alphabeticalOrder({
                      category,
                      isSorted,
                      setIsSorted,
                      toSortString: 'source',
                    });
                  }}
                >
                  Fonte{isSorted && sortType.type === 'source' ? '▾' : '▴'}
                </p>
              </Style.MaintenancesGrid>
            </Style.MaintenancesHeader>
          ) : (
            <p className="p2" style={{ opacity: 0.7 }}>
              Nenhuma manutenção cadastrada.
            </p>
          )}

          {category.Maintenances.map((maintenance) => (
            <MaintenanceCard
              maintenance={maintenance}
              key={maintenance.id}
              timeIntervals={timeIntervals}
            />
          ))}
        </Style.MaintenancesContainer>
      </Style.Background>
    </>
  );
};
