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
import { applyMask } from '../../../../../../utils/functions';
import { FormikTextArea } from '../../../../../../components/Form/FormikTextArea';

export const MaintenanceCard = ({ maintenance }: IMaintenanceCard) => {
  const [cardIsOpen, setCardIsOpen] = useState<boolean>(false);
  const [cardIsEditing, setcardIsEditing] = useState<boolean>(false);

  return (
    <Style.MaintenancesCard
      onClick={() => {
        setCardIsOpen((prevState) => !prevState);
      }}
    >
      {cardIsEditing ? (
        <Style.MaintenancesCardContent>
          <Formik
            initialValues={{
              element: '',
              activity: '',
              frequency: '',
              responsible: '',
              source: '',
              period: '',
              delay: '',
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
                    <Style.MaintenancesGrid isEditing={cardIsEditing}>
                      <FormikTextArea
                        name="element"
                        height="60px"
                        value={values.element}
                        error={touched.element && errors.element ? errors.element : null}
                        placeholder="Ex: João Silva"
                      />
                      <FormikTextArea
                        name="activity"
                        height="60px"
                        value={values.activity}
                        error={touched.activity && errors.activity ? errors.activity : null}
                        placeholder="Ex: João Silva"
                      />

                      <FormikInput
                        name="frequency"
                        value={applyMask({ value: values.frequency, mask: 'NUM' }).value}
                        error={touched.frequency && errors.frequency ? errors.frequency : null}
                        placeholder="Ex: João Silva"
                      />

                      <FormikInput
                        name="responsible"
                        value={values.responsible}
                        error={touched.responsible && errors.responsible ? errors.responsible : null}
                        placeholder="Ex: João Silva"
                      />

                      <FormikInput
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
                    <FormikTextArea
                      height="60px"
                      name="observation"
                      value={values.observation}
                      error={touched.observation && errors.observation ? errors.observation : null}
                      placeholder="Ex: João Silva"
                    />
                    <FormikInput
                      name="period"
                      value={applyMask({ value: values.period, mask: 'NUM' }).value}
                      error={touched.period && errors.period ? errors.period : null}
                      placeholder="Ex: João Silva"
                    />
                    <FormikInput
                      name="delay"
                      value={applyMask({ value: values.delay, mask: 'NUM' }).value}
                      error={touched.delay && errors.delay ? errors.delay : null}
                      placeholder="Ex: João Silva"
                    />

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

                      <Button label="Editar" type="submit" />
                    </Style.MaintenancesCardGridMoreEditButton>
                  </Style.MaintenancesMoreGrid>
                </>
              </Form>
            )}
          </Formik>
        </Style.MaintenancesCardContent>
      ) : (
        <Style.MaintenancesCardContent>
          <Style.MaintenancesCardTopContent>
            <Style.MaintenancesGrid isEditing={cardIsEditing}>
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
