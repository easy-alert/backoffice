// LIBS
import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

// COMPONENTS
import { Button } from '@components/Buttons/Button';
import { FormikImageInput } from '@components/Form/FormikImageInput';
import { FormikInput } from '@components/Form/FormikInput';
import { Modal } from '@components/Modal';
import { FormikSelect } from '@components/Form/FormikSelect';
import { FormikCheckbox } from '@components/Form/FormikCheckbox';
import { theme } from '@styles/theme';

// TYPES
import { IBuilding, IUpdateBuildingData } from '@customTypes/IBuilding';

// SERVICES
import { putEditBuilding } from '@services/apis/putEditBuilding';

// STYLES
import * as Style from './styles';

interface IBuildingType {
  id: string;
  name: string;
}

interface IModalEditBuilding {
  setModal: (value: boolean) => void;
  building?: IBuilding;
  buildingTypes?: IBuildingType[];
  requestBuildingDetailsCall?: () => void;
}

// UTILITÁRIOS
const applyMask = ({ mask, value }: { mask: string; value: string }) => {
  if (mask === 'CEP') {
    const onlyNumbers = value.replace(/\D/g, '');
    return {
      value: onlyNumbers.replace(/(\d{5})(\d{3})/, '$1-$2'),
      length: 9,
    };
  }
  return { value, length: value.length };
};

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const convertToFormikDate = (date: Date) => date.toISOString().split('T')[0];

const schemaModalEditBuilding = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  buildingTypeId: Yup.string().required('Tipo é obrigatório'),
  cep: Yup.string().required('CEP é obrigatório'),
  state: Yup.string().required('Estado é obrigatório'),
  city: Yup.string().required('Cidade é obrigatória'),
  warrantyExpiration: Yup.string().required('Término da garantia é obrigatório'),
  nextMaintenanceCreationBasis: Yup.string().required('Campo obrigatório'),
});

const requestEditBuilding = async ({
  buildingId,
  setModal,
  setOnQuery,
  values,
  requestBuildingDetailsCall,
}: any) => {
  setOnQuery(true);

  try {
    const buildingData: Partial<IUpdateBuildingData> = {
      name: values.name?.trim() || '',
      buildingTypeId: values.buildingTypeId || '',
      cep: values.cep?.replace(/\D/g, '') || '',
      state: values.state?.trim() || '',
      city: values.city?.trim() || '',
      warrantyExpiration: values.warrantyExpiration
        ? new Date(values.warrantyExpiration)
        : undefined,

      nextMaintenanceCreationBasis: values.nextMaintenanceCreationBasis || '',
      neighborhood: values.neighborhood?.trim() || undefined,
      streetName: values.streetName?.trim() || undefined,
      deliveryDate: values.deliveryDate ? new Date(values.deliveryDate) : undefined,
      keepNotificationAfterWarrantyEnds: values.keepNotificationAfterWarrantyEnds,
      mandatoryReportProof: values.mandatoryReportProof,
      isActivityLogPublic: values.isActivityLogPublic,
      guestCanCompleteMaintenance: values.guestCanCompleteMaintenance,
    };

    if (values.image && typeof values.image === 'string') {
      buildingData.image = values.image;
    }

    await putEditBuilding({
      buildingId,
      buildingData,
    });

    setModal(false);
    if (requestBuildingDetailsCall) requestBuildingDetailsCall();
  } catch (error) {
    console.error('Erro ao editar edificação:', error);
  } finally {
    setOnQuery(false);
  }
};

export const ModalEditBuilding = ({
  setModal,
  building,
  buildingTypes,
  requestBuildingDetailsCall,
}: IModalEditBuilding) => {
  const [onQuery, setOnQuery] = useState<boolean>(false);

  if (!building) return null;
  console.log('building', building);

  return (
    <Modal title="Editar edificação" setModal={setModal}>
      <Formik
        initialValues={{
          id: building.id || '',
          name: building.name || '',
          buildingTypeId: building.buildingTypeId || building.BuildingType?.id || '',
          cep: building.cep ? applyMask({ mask: 'CEP', value: building.cep }).value : '',
          city: building.city ?? '',
          state: building.state ?? '',
          neighborhood: building.neighborhood ?? '',
          streetName: building.streetName ?? '',
          deliveryDate: building.deliveryDate
            ? convertToFormikDate(new Date(building.deliveryDate))
            : '',
          warrantyExpiration: building.warrantyExpiration
            ? convertToFormikDate(new Date(building.warrantyExpiration))
            : '',
          keepNotificationAfterWarrantyEnds: building.keepNotificationAfterWarrantyEnds || false,
          mandatoryReportProof: building.mandatoryReportProof || false,
          nextMaintenanceCreationBasis: building.nextMaintenanceCreationBasis || 'executionDate',
          isActivityLogPublic: building.isActivityLogPublic || false,
          guestCanCompleteMaintenance: building.guestCanCompleteMaintenance || false,
          image: building.image || '',
        }}
        validationSchema={schemaModalEditBuilding}
        onSubmit={async (values) => {
          await requestEditBuilding({
            buildingId: building.id,
            setModal,
            setOnQuery,
            values,
            requestBuildingDetailsCall,
          });
        }}
      >
        {({ errors, values, touched, setFieldValue }) => (
          <Style.FormContainer>
            <Form>
              <FormikImageInput
                name="image"
                label="Logo"
                error={touched.image && errors.image ? errors.image : null}
                defaultImage={values.image}
                onChange={(event: any) => {
                  if (event.target.files?.length) {
                    setFieldValue('image', event.target.files[0]);
                  }
                }}
              />

              <FormikInput
                label="Nome *"
                name="name"
                value={values.name}
                error={touched.name && errors.name ? errors.name : null}
                placeholder="Ex: Monte Ravello"
              />

              <FormikSelect
                label="Tipo *"
                name="buildingTypeId"
                value={values.buildingTypeId}
                selectPlaceholderValue={values.buildingTypeId}
                error={
                  touched.buildingTypeId && errors.buildingTypeId ? errors.buildingTypeId : null
                }
              >
                <option value="" disabled hidden>
                  Selecione
                </option>
                {buildingTypes &&
                  buildingTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {capitalizeFirstLetter(type.name)}
                    </option>
                  ))}
                {!buildingTypes?.some((type) => type.id === values.buildingTypeId) &&
                  building.BuildingType && (
                    <option key={building.BuildingType.id} value={building.BuildingType.id}>
                      {capitalizeFirstLetter(building.BuildingType.name)}
                    </option>
                  )}
              </FormikSelect>

              <FormikInput
                label="CEP *"
                name="cep"
                value={values.cep}
                error={touched.cep && errors.cep ? errors.cep : null}
                placeholder="Ex: 88801-010"
                maxLength={applyMask({ value: values.cep, mask: 'CEP' }).length}
                onChange={(e) => {
                  setFieldValue('cep', applyMask({ value: e.target.value, mask: 'CEP' }).value);
                }}
              />

              <FormikInput
                label="Estado *"
                name="state"
                value={values.state}
                error={touched.state && errors.state ? errors.state : null}
                placeholder="Ex: Santa Catarina"
              />

              <FormikInput
                label="Cidade *"
                name="city"
                value={values.city}
                error={touched.city && errors.city ? errors.city : null}
                placeholder="Ex: Criciúma"
              />

              <FormikInput
                label="Bairro"
                name="neighborhood"
                value={values.neighborhood}
                error={touched.neighborhood && errors.neighborhood ? errors.neighborhood : null}
                placeholder="Ex: Centro"
              />

              <FormikInput
                label="Logradouro"
                name="streetName"
                value={values.streetName}
                error={touched.streetName && errors.streetName ? errors.streetName : null}
                placeholder="Ex: Rua Henrique Lage"
              />

              <FormikInput
                type="date"
                label="Data de início"
                name="deliveryDate"
                value={values.deliveryDate}
                error={touched.deliveryDate && errors.deliveryDate ? errors.deliveryDate : null}
                disabled
              />

              <FormikInput
                type="date"
                label="Término da garantia *"
                name="warrantyExpiration"
                value={values.warrantyExpiration}
                error={
                  touched.warrantyExpiration && errors.warrantyExpiration
                    ? errors.warrantyExpiration
                    : null
                }
              />

              <FormikSelect
                selectPlaceholderValue={values.nextMaintenanceCreationBasis}
                label="Próxima manutenção baseada em *"
                name="nextMaintenanceCreationBasis"
                error={
                  touched.nextMaintenanceCreationBasis && errors.nextMaintenanceCreationBasis
                    ? errors.nextMaintenanceCreationBasis
                    : null
                }
              >
                <option value="executionDate">Data de execução</option>
                <option value="notificationDate">Data de notificação</option>
              </FormikSelect>

              <FormikCheckbox
                name="keepNotificationAfterWarrantyEnds"
                labelColor={theme.color.gray4}
                label="Notificar após garantia?"
              />

              <FormikCheckbox
                name="mandatoryReportProof"
                labelColor={theme.color.gray4}
                label="Comprovantes de relato obrigatórios?"
              />

              <FormikCheckbox
                name="isActivityLogPublic"
                labelColor={theme.color.gray4}
                label="Tornar logs de atividade público?"
              />

              <FormikCheckbox
                name="guestCanCompleteMaintenance"
                labelColor={theme.color.gray4}
                label="Convidado pode concluir manutenção?"
              />

              <Style.ButtonContainer>
                <Button label="Salvar" type="submit" loading={onQuery} bgColor="primary" />
              </Style.ButtonContainer>
            </Form>
          </Style.FormContainer>
        )}
      </Formik>
    </Modal>
  );
};
