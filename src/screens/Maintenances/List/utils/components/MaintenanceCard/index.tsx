// LIBS
import { useState } from 'react';
import { Form, Formik } from 'formik';

// COMPONENTS
import { icon } from '../../../../../../assets/icons';
import { Button } from '../../../../../../components/Buttons/Button';
import { Image } from '../../../../../../components/Image';
import { FormikInput } from '../../../../../../components/Form/FormikInput';
import * as Style from './styles';

// FUNCTIONS
import { schemaEditMaintenance } from './utils/functions';

// TYPES
import { IMaintenanceCard } from './utils/types';

export const MaintenanceCard = ({ maintenance }: IMaintenanceCard) => {
  const [cardIsOpen, setCardIsOpen] = useState<boolean>(false);
  const [cardIsEditing, setcardIsEditing] = useState<boolean>(false);

  return (
    <Style.MaintenancesCard>
      {cardIsEditing ? (
        <Style.MaintenancesCardContent>
          <Formik
            initialValues={{
              element: '',
              activity: '',
              frequency: 0,
              responsible: '',
              source: '',
              period: 0,
              delay: 0,
              observation: '',
            }}
            validationSchema={schemaEditMaintenance}
            onSubmit={async (values) => {
              console.log(values);
            }}
          >
            {({ errors, values, touched }) => (
              <Form>
                <>
                  <Style.MaintenancesCardTopContent>
                    <Style.MaintenancesGrid>
                      <FormikInput
                        label="Elemento"
                        name="element"
                        value={values.element}
                        error={touched.element && errors.element ? errors.element : null}
                        placeholder="Ex: João Silva"
                      />
                      <FormikInput
                        label="Frequencia"
                        name="frequency"
                        value={values.frequency}
                        error={touched.frequency && errors.frequency ? errors.frequency : null}
                        placeholder="Ex: João Silva"
                      />

                      <FormikInput
                        label="Frequencia"
                        name="frequency"
                        value={values.frequency}
                        error={touched.frequency && errors.frequency ? errors.frequency : null}
                        placeholder="Ex: João Silva"
                      />

                      <FormikInput
                        label="Responsavel"
                        name="responsible"
                        value={values.responsible}
                        error={touched.responsible && errors.responsible ? errors.responsible : null}
                        placeholder="Ex: João Silva"
                      />

                      <FormikInput
                        label="Fonte"
                        name="source"
                        value={values.source}
                        error={touched.source && errors.source ? errors.source : null}
                        placeholder="Ex: João Silva"
                      />

                      <Style.ArrowContainer>
                        <Style.Arrow cardIsOpen={cardIsEditing}>
                          <Image img={icon.downArrow} size="16px" />
                        </Style.Arrow>
                      </Style.ArrowContainer>
                    </Style.MaintenancesGrid>
                  </Style.MaintenancesCardTopContent>

                  <Style.Hr />
                  <Style.MaintenancesMoreGrid>
                    <p className="p2">
                      <span>Observação: </span>
                      {maintenance[0].observation}
                    </p>

                    <Style.MaintenancesCardBottomPeriod>
                      <p className="p2"> EDITANDO</p>
                      <p className="p2"> EDITANDO</p>
                    </Style.MaintenancesCardBottomPeriod>
                    <Style.MaintenancesCardGridMoreEditButton>
                      <Button
                        label="Cancelar"
                        type="button"
                        borderless
                        onClick={() => {
                          setcardIsEditing(false);
                          setCardIsOpen(true);
                        }}
                      />

                      <Button label="Editar" />
                    </Style.MaintenancesCardGridMoreEditButton>
                  </Style.MaintenancesMoreGrid>
                </>
              </Form>
            )}
          </Formik>
        </Style.MaintenancesCardContent>
      ) : (
        <Style.MaintenancesCardContent
          onClick={() => {
            setCardIsOpen((prevState) => !prevState);
          }}
        >
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
                <p className="p2">
                  <Image img={icon.alert} size="16px" />
                  <span>Período: </span>
                  {maintenance[0].period}
                </p>
                <p className="p2">
                  <span>Delay: </span>
                  {maintenance[0].delay}
                </p>
              </Style.MaintenancesCardBottomPeriod>
              <Style.MaintenancesCardGridMoreEditButton>
                <Button
                  label="Editar"
                  onClick={() => {
                    setcardIsEditing(true);
                  }}
                />
              </Style.MaintenancesCardGridMoreEditButton>
            </Style.MaintenancesMoreGrid>
          </Style.MaintenancesCardBottomContainer>
        </Style.MaintenancesCardContent>
      )}
    </Style.MaintenancesCard>
  );
};
