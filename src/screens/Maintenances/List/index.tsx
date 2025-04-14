/* eslint-disable no-alert */
// LIBS
import { useEffect, useState } from 'react';

// COMPONENTS
import * as Style from './styles';
import { IconButton } from '../../../components/Buttons/IconButton';
import { Image } from '../../../components/Image';
import { icon } from '../../../assets/icons/index';
import { DotSpinLoading } from '../../../components/Loadings/DotSpinLoading';
import { MaintenanceCategory } from './utils/components/MaintenanceCategory';

// TYPES
import type { ICategories, ICategoriesOptions } from './utils/types';
import type { ITimeInterval } from '../../../utils/types';
import type { IMaintenancePriority } from '../../../types/IMaintenancePriority';

// FUNCTIONS
import { getAllMaintenancePriorities } from '../../../services/apis/getAllMaintenancePriorities';
import { filterFunction, requestCategories, requestCategoriesForSelect } from './utils/functions';
import { requestListIntervals } from '../../../utils/functions';

// MODALS
import { ModalCreateCategory } from './utils/ModalCreateCategory';

export const MaintenancesList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('');
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [categoriesForFilter, setCategoriesForFilter] = useState<ICategories[]>([]);
  const [timeIntervals, setTimeIntervals] = useState<ITimeInterval[]>([]);
  const [categoriesOptions, setCategoriesOptions] = useState<ICategoriesOptions[]>([]);
  const [maintenancePriorities, setMaintenancePriorities] = useState<IMaintenancePriority[]>([]);

  // MODALS
  const [modalCreateCategoryOpen, setModalCreateCategoryOpen] = useState<boolean>(false);

  const handleGetAllMaintenancePriorities = async () => {
    try {
      const responseData = await getAllMaintenancePriorities();

      setMaintenancePriorities(responseData.maintenancePriorities);
    } catch (error) {
      console.log('🚀 ~ handleGetAllMaintenancePriorities ~ error', error);
    }
  };

  useEffect(() => {
    requestCategoriesForSelect({ setCategoriesOptions });
  }, [JSON.stringify(categories)]);

  useEffect(() => {
    handleGetAllMaintenancePriorities();
    requestListIntervals({ setTimeIntervals });
    requestCategories({ setLoading, setCategories, setCategoriesForFilter });
  }, []);

  return (
    <>
      {modalCreateCategoryOpen && (
        <ModalCreateCategory
          setModal={setModalCreateCategoryOpen}
          categories={categories}
          setCategories={setCategories}
        />
      )}

      {loading ? (
        <DotSpinLoading />
      ) : (
        <>
          <Style.Header>
            <Style.LeftSide>
              <Style.HeaderTitle>
                <h2>Manutenções</h2>

                <Style.SearchField>
                  <IconButton
                    icon={icon.search}
                    size="16px"
                    onClick={() => {
                      filterFunction({ setCategories, filter, categoriesForFilter });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Procurar"
                    value={filter}
                    onChange={(evt) => {
                      setFilter(evt.target.value);
                      if (evt.target.value === '') {
                        filterFunction({ setCategories, filter: '', categoriesForFilter });
                      }
                    }}
                    onKeyUp={(evt) => {
                      if (evt.key === 'Enter') {
                        filterFunction({ setCategories, filter, categoriesForFilter });
                      }
                    }}
                  />
                </Style.SearchField>
              </Style.HeaderTitle>
            </Style.LeftSide>

            <Style.RightSide>
              <IconButton
                hideLabelOnMedia
                fontWeight="500"
                label="Criar categoria"
                className="p2"
                icon={icon.plusWithBg}
                onClick={() => {
                  setModalCreateCategoryOpen(true);
                }}
              />
            </Style.RightSide>
          </Style.Header>

          {categories?.length ? (
            <Style.CategoriesContainer>
              {categories.map((category) => (
                <MaintenanceCategory
                  key={category.id}
                  category={category}
                  setCategories={setCategories}
                  categories={categories}
                  timeIntervals={timeIntervals}
                  categoriesOptions={categoriesOptions}
                  maintenancePriorities={maintenancePriorities}
                />
              ))}
            </Style.CategoriesContainer>
          ) : (
            <Style.NoMaintenancesContainer>
              <Image img={icon.paper} size="80px" radius="0" />
              <h3>Nenhuma categoria encontrada.</h3>
            </Style.NoMaintenancesContainer>
          )}
        </>
      )}
    </>
  );
};
