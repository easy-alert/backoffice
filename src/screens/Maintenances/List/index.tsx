/* eslint-disable no-alert */
// LIBS
import { useEffect, useState } from 'react';

// COMPONENTS
import { Form, Formik } from 'formik';
import * as Style from './styles';
import { IconButton } from '../../../components/Buttons/IconButton';
import { Image } from '../../../components/Image';
import { icon } from '../../../assets/icons/index';
import { DotSpinLoading } from '../../../components/Loadings/DotSpinLoading';
import { Button } from '../../../components/Buttons/Button';
import { requestCategories, requestCreateCategory, schemeCreateCategory } from './utils/functions';
import { FormikInput } from '../../../components/Form/FormikInput';
import { MaintenanceCategory } from './utils/components/MaintenanceCategory';
import { ICategories } from './utils/types';

export const MaintenancesList = () => {
  // UTILS
  const [loading, setLoading] = useState<boolean>(true);

  // FILTER
  const [filter, setFilter] = useState<string>('');

  // CONSTS
  const [categories, setCategories] = useState<ICategories[]>([]);

  const [createMaintenancesIsOpen, setCreateMaintenancesIsOpen] = useState<boolean>(false);

  useEffect(() => {
    requestCategories({ setLoading, setCategories });
  }, []);

  return (
    <>
      {/* {Modal} */}
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
                      requestCategories({ setCategories, filter });
                    }}
                  />
                  <input
                    type="text"
                    maxLength={40}
                    placeholder="Procurar"
                    value={filter}
                    onChange={(evt) => {
                      setFilter(evt.target.value);
                      if (evt.target.value === '') {
                        requestCategories({ setCategories, filter: '' });
                      }
                    }}
                    onKeyUp={(evt) => {
                      if (evt.key === 'Enter') {
                        requestCategories({ setCategories, filter });
                      }
                    }}
                  />
                </Style.SearchField>
              </Style.HeaderTitle>

              {!createMaintenancesIsOpen && (
                <IconButton
                  hideLabelOnMedia
                  fontWeight="500"
                  label="Criar categoria"
                  className="p2"
                  icon={icon.plusWithBg}
                  onClick={() => {
                    setCreateMaintenancesIsOpen((prevState) => !prevState);
                  }}
                />
              )}
            </Style.LeftSide>

            <Style.CreateMaintenancesContainer createMaintenancesIsOpen={createMaintenancesIsOpen}>
              <Formik
                initialValues={{ name: '' }}
                validationSchema={schemeCreateCategory}
                onSubmit={async (values, actions) => {
                  await requestCreateCategory({
                    values,
                    setCreateMaintenancesIsOpen,
                    resetForm: actions.resetForm,
                    setCategories,
                    categories,
                  });
                }}
              >
                {({ errors, values, touched, resetForm }) => (
                  <Form>
                    <Style.CreateMaintenancesContainerContent>
                      <FormikInput
                        name="name"
                        value={values.name}
                        error={touched.name && errors.name ? errors.name : null}
                        placeholder="Digite o nome da categoria"
                        maxLength={40}
                      />
                      <Style.CreateMaintenancesButtons>
                        <Button label="Criar" type="submit" />
                        <Button
                          label="Fechar"
                          type="button"
                          borderless
                          onClick={() => {
                            resetForm();
                            setCreateMaintenancesIsOpen(false);
                          }}
                        />
                      </Style.CreateMaintenancesButtons>
                    </Style.CreateMaintenancesContainerContent>
                  </Form>
                )}
              </Formik>
            </Style.CreateMaintenancesContainer>
          </Style.Header>

          {categories?.length ? (
            <Style.CategoriesContainer>
              {categories.map((category) => (
                <MaintenanceCategory
                  key={category.name}
                  category={category}
                  setCategories={setCategories}
                  categories={categories}
                />
              ))}
            </Style.CategoriesContainer>
          ) : (
            <Style.NoMaintenancesContainer>
              <Image img={icon.paper} size="80px" radius="0" />
              <h3>Nenhuma manutenção encontrada.</h3>
            </Style.NoMaintenancesContainer>
          )}
        </>
      )}
    </>
  );
};
