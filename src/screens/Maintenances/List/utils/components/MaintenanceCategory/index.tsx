/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */

// LIBS
import { useState } from 'react';
import { icon } from '../../../../../../assets/icons';

// COMPONENTS
import { IconButton } from '../../../../../../components/Buttons/IconButton';
import { PopoverButton } from '../../../../../../components/Buttons/PopoverButton';
import { theme } from '../../../../../../styles/theme';
import * as Style from './styles';

import { MaintenanceCard } from '../MaintenanceCard';

// FUNCTIONS
import { alphabeticalOrder, requestDeleteCategory } from './utils/functions';

// TYPES
import { IMaintenanceCategory, ISortType } from './utils/types';

export const MaintenanceCategory = ({
  category,
  categories,
  setCategories,
}: IMaintenanceCategory) => {
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [sortType, setSortType] = useState<ISortType>({ type: 'element' });

  return (
    <Style.Background>
      <Style.HeaderCategory>
        <Style.HeaderTitle>
          <Style.EditContainer>
            <h5>{category.name}</h5>
            <IconButton
              size="16px"
              icon={icon.edit}
              onClick={() => {
                // setIsEditingCategoryName(true);
              }}
            />
            <PopoverButton
              actionButtonBgColor={theme.color.danger}
              hiddenActionButtonLabel
              buttonIconSize="16px"
              type="IconButton"
              buttonIcon={icon.trash}
              label="Excluir"
              message={{
                title: 'Deseja excluir este usuário?',
                content: 'Atenção, essa ação não poderá ser desfeita posteriormente.',
                contentColor: theme.color.danger,
              }}
              actionButtonClick={() => {
                requestDeleteCategory({
                  categoryId: category.id,
                  categories,
                  setCategories,
                });
              }}
            />
          </Style.EditContainer>

          <IconButton
            hideLabelOnMedia
            icon={icon.plus}
            size="16px"
            label="Criar manutenção"
            onClick={() => {
              // setIsEditingCategoryName(true);
            }}
          />
        </Style.HeaderTitle>
      </Style.HeaderCategory>

      <Style.MaintenancesContainer>
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
                });
              }}
            >
              Elemento{isSorted && sortType.type === 'element' ? '▴' : '▾'}
            </p>
            <p
              className="p2"
              style={{
                color:
                  sortType.type === 'activity' ? theme.color.black : theme.color.gray4,
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
              Atividade{isSorted && sortType.type === 'activity' ? '▴' : '▾'}
            </p>
            <p
              className="p2"
              style={{
                color:
                  sortType.type === 'frequency' ? theme.color.black : theme.color.gray4,
              }}
              onClick={() => {
                setSortType({ type: 'frequency' });
                alphabeticalOrder({
                  category,
                  isSorted,
                  setIsSorted,
                  toSortString: 'frequency',
                });
              }}
            >
              Periodicidade{isSorted && sortType.type === 'frequency' ? '▴' : '▾'}
            </p>
            <p
              className="p2"
              style={{
                color:
                  sortType.type === 'responsible' ? theme.color.black : theme.color.gray4,
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
              Responsável{isSorted && sortType.type === 'responsible' ? '▴' : '▾'}
            </p>
            <p
              className="p2"
              style={{
                color: sortType.type === 'source' ? theme.color.black : theme.color.gray4,
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
              Fonte{isSorted && sortType.type === 'source' ? '▴' : '▾'}
            </p>
          </Style.MaintenancesGrid>
        </Style.MaintenancesHeader>

        {category.Maintenances.map((maintenance) => (
          <MaintenanceCard maintenance={maintenance} key={maintenance.id} />
        ))}
      </Style.MaintenancesContainer>
    </Style.Background>
  );
};
