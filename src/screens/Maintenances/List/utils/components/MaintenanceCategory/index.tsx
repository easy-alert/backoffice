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
import { schemeEditCategory } from './utils/functions';
import { IFormDataEditCategory } from './utils/types';
import { ICategories } from '../../types';

export const MaintenanceCategory = ({
  category,
}: {
  category: ICategories;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEditingCategoryName, setIsEditingCategoryName] =
    useState<boolean>(false);

  return (
    <Style.Background>
      <Style.HeaderCategory>
        {!isEditingCategoryName ? (
          <Style.HeaderTitle>
            <h5>{category.name}</h5>
            <IconButton
              icon={icon.editWithBg}
              onClick={() => {
                setIsEditingCategoryName(true);
              }}
            />
          </Style.HeaderTitle>
        ) : (
          <Formik
            initialValues={{ name: '' }}
            validationSchema={schemeEditCategory}
            onSubmit={async (data: IFormDataEditCategory) => {
              console.log(data);
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
    </Style.Background>
  );
};
