// LIBS
import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

// GLOBAL SERVICES
import { putEditBuilding } from '@services/apis/putEditBuilding';

// GLOBAL COMPONENTS
import { Modal } from '@components/Modal';
import { Button } from '@components/Buttons/Button';
import { FormikImageInput } from '@components/Form/FormikImageInput';
import { FormikInput } from '@components/Form/FormikInput';
import { FormikSelect } from '@components/Form/FormikSelect';
import { FormikCheckbox } from '@components/Form/FormikCheckbox';

// GLOBAL UTILS
import {
  applyMask,
  capitalizeFirstLetter,
  convertToFormikDate,
  uploadFile,
} from '@utils/functions';

// GLOBAL STYLES
import { theme } from '@styles/theme';

// GLOBAL TYPES
import type { IBuilding } from '@customTypes/IBuilding';

// STYLES
import * as Style from './styles';

interface IBuildingType {
  id: string;
  name: string;
}

interface IModalEditBuilding {
  onClose: () => void;
  building?: IBuilding;
  buildingTypes?: IBuildingType[];
  requestBuildingDetailsCall?: () => void;
}

const schemaModalEditBuilding = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  buildingTypeId: Yup.string().required('Tipo é obrigatório'),
  cep: Yup.string().required('CEP é obrigatório'),
  state: Yup.string().required('Estado é obrigatório'),
  city: Yup.string().required('Cidade é obrigatória'),
  warrantyExpiration: Yup.string().required('Término da garantia é obrigatório'),
  nextMaintenanceCreationBasis: Yup.string().required('Campo obrigatório'),
  image: Yup.mixed()
    .test(
      'fileSize',
      'Imagem muito grande (máx. 2MB)',
      (value) => !value || (value.size && value.size <= 2 * 1024 * 1024),
    )
    .test(
      'fileType',
      'Formato inválido',
      (value) =>
        !value ||
        typeof value === 'string' ||
        ['image/jpeg', 'image/png', 'image/webp'].includes(value.type),
    ),
});

export const ModalEditBuilding = ({
  onClose,
  building,
  buildingTypes,
  requestBuildingDetailsCall,
}: IModalEditBuilding) => {
  const [onQuery, setOnQuery] = useState<boolean>(false);

  const getNextMaintenanceCreationBasis = () => {
    if (!building) return 'executionDate';
    if (
      building.nextMaintenanceCreationBasis === 'executionDate' ||
      building.nextMaintenanceCreationBasis === 'notificationDate'
    ) {
      return building.nextMaintenanceCreationBasis;
    }
    return 'executionDate';
  };

  if (!building) return null;

  return (
    <Modal title="Editar edificação" setModal={onClose}>
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
          nextMaintenanceCreationBasis: getNextMaintenanceCreationBasis(),
          isActivityLogPublic: building.isActivityLogPublic || false,
          guestCanCompleteMaintenance: building.guestCanCompleteMaintenance || false,
          image: building.image || '',
        }}
        validationSchema={schemaModalEditBuilding}
        onSubmit={async (values) => {
          setOnQuery(true);
          try {
            let imageUrl = values.image;

            if (values.image && typeof values.image !== 'string') {
              const uploadResponse = await uploadFile(values.image);
              imageUrl = uploadResponse?.url || '';
            }

            await putEditBuilding(building.id ?? '', {
              ...values,
              image: imageUrl,
            });

            onClose();
            if (requestBuildingDetailsCall) requestBuildingDetailsCall();
          } catch (error) {
            console.error(error);
          } finally {
            setOnQuery(false);
          }
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
                    const file = event.target.files[0];
                    setFieldValue('image', file);
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
              </FormikSelect>

              <FormikInput
                label="CEP *"
                name="cep"
                value={values.cep}
                error={touched.cep && errors.cep ? errors.cep : null}
                placeholder="Ex: 88801-010"
                maxLength={9}
                onChange={(e) => {
                  setFieldValue('cep', applyMask({ mask: 'CEP', value: e.target.value }).value);
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
