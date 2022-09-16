/* eslint-disable no-console */

// LIBS
import { useState } from 'react';
import { Form, Formik } from 'formik';
import { icon } from '../../../../../../assets/icons';
import { Button } from '../../../../../../components/Buttons/Button';

// COMPONENTS
import { IconButton } from '../../../../../../components/Buttons/IconButton';
import { FormikInput } from '../../../../../../components/Form/FormikInput';
import * as Style from './styles';
import { requestDeleteCategory, requestEditCategory, schemeEditCategory } from './utils/functions';
import { IMaintenanceCategory } from './utils/types';
import { PopoverButton } from '../../../../../../components/Buttons/PopoverButton';
import { theme } from '../../../../../../styles/theme';

export const MaintenanceCategory = ({ category, categories, setCategories }: IMaintenanceCategory) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEditingCategoryName, setIsEditingCategoryName] = useState<boolean>(false);

  return (
    <Style.Background>
      <Style.HeaderCategory>
        {!isEditingCategoryName ? (
          <Style.HeaderTitle>
            <Style.EditContainer>
              <h5>{category.name}</h5>
              <IconButton
                icon={icon.editWithBg}
                onClick={() => {
                  setIsEditingCategoryName(true);
                }}
              />

              <PopoverButton
                actionButtonBgColor={theme.color.danger}
                hiddenActionButtonLabel
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
              icon={icon.plusWithBg}
              label="Criar manutenção"
              onClick={() => {
                // setIsEditingCategoryName(true);
              }}
            />
          </Style.HeaderTitle>
        ) : (
          <Formik
            initialValues={{ name: category.name }}
            validationSchema={schemeEditCategory}
            onSubmit={async (values) => {
              requestEditCategory({
                values,
                categories,
                setCategories,
                categoryId: category.id,
                setIsEditingCategoryName,
              });
            }}
          >
            {({ errors, values, touched }) => (
              <Form>
                <Style.FormContainer>
                  <FormikInput
                    name="name"
                    value={values.name}
                    error={touched.name && errors.name ? errors.name : null}
                    placeholder="Digite o nome da categoria"
                    maxLength={40}
                  />
                  <Style.ButtonsHeader>
                    <Button label="Salvar" type="submit" />
                    <Button
                      label="Cancelar"
                      type="button"
                      borderless
                      onClick={() => {
                        setIsEditingCategoryName(false);
                      }}
                    />
                  </Style.ButtonsHeader>
                </Style.FormContainer>
              </Form>
            )}
          </Formik>
        )}
      </Style.HeaderCategory>

      <Style.MaintenancesContainer>
        <h1>f</h1>
      </Style.MaintenancesContainer>
    </Style.Background>
  );
};
