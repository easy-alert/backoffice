// REACT
import { useState } from 'react';

// LIBS
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';

// COMPONENTS
import { Modal } from '@components/Modal';
import { Button } from '@components/Buttons/Button';
import { FormikInput } from '@components/Form/FormikInput';
import { FormikSelect } from '@components/Form/FormikSelect';

// UTILS
import { internalDataSchema, requestGenerateLink } from './utils/functions';

// TYPES
import type { IModalPreRegistrationClient } from './utils/types';

// STYLES
import * as Style from './styles';

export const ModalRegisterClient = ({ setModal }: IModalPreRegistrationClient) => {
  const [onQuery, setOnQuery] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  return (
    <Modal
      title={generatedLink ? 'Link gerado com sucesso!' : 'Gerar link de pré-cadastro'}
      setModal={setModal}
    >
      <Formik
        initialValues={{
          name: '',
          clientType: '',
          condosQty: 1,
          plan: '',
          monthlyValue: '',
          implementationValue: '',
          implementationDueDate: '',
        }}
        validationSchema={internalDataSchema}
        onSubmit={(formData) => requestGenerateLink({ formData, setOnQuery, setGeneratedLink })}
      >
        {({ errors, touched }) => (
          <Style.FormContainer>
            {!generatedLink ? (
              <Form>
                <FormikInput
                  label="Nome do Cliente *"
                  name="name"
                  type="text"
                  placeholder="Ex: Condomínio Central Park"
                  error={touched.name && errors.name ? errors.name : null}
                />
                <FormikSelect
                  name="clientType"
                  label="Tipo do cliente *"
                  error={touched.clientType && errors.clientType ? errors.clientType : null}
                >
                  <option value="">Selecione o tipo</option>
                  <option value="residentSyndic">Síndico Morador</option>
                  <option value="professionalSyndic">Síndico Profissional</option>
                  <option value="constructionCompany">Construtora</option>
                  <option value="administrationCompany">Administradora</option>
                  <option value="others">Outros</option>
                </FormikSelect>

                <FormikInput
                  label="Quantidade de condomínios *"
                  name="condosQty"
                  type="number"
                  placeholder="Ex: 3"
                  error={touched.condosQty && errors.condosQty ? errors.condosQty : null}
                />

                <FormikSelect
                  name="plan"
                  label="Plano *"
                  error={touched.plan && errors.plan ? errors.plan : null}
                >
                  <option value="">Selecione o plano</option>
                  <option value="semester">Semestral</option>
                  <option value="annual">Anual</option>
                </FormikSelect>

                <FormikInput
                  label="Valor da mensalidade (R$) *"
                  name="monthlyValue"
                  type="number"
                  placeholder="Ex: 299.90"
                  error={touched.monthlyValue && errors.monthlyValue ? errors.monthlyValue : null}
                />

                <FormikInput
                  label="Valor de implementação (R$) *"
                  name="implementationValue"
                  type="number"
                  placeholder="Ex: 499.90"
                  error={
                    touched.implementationValue && errors.implementationValue
                      ? errors.implementationValue
                      : null
                  }
                />
                <FormikInput
                  label="Vencimento da implementação *"
                  name="implementationDueDate"
                  type="date"
                  error={
                    touched.implementationDueDate && errors.implementationDueDate
                      ? errors.implementationDueDate
                      : null
                  }
                />

                <Button label="Gerar link para cliente" type="submit" center loading={onQuery} />
              </Form>
            ) : (
              <Style.GeneratedLinkContainer>
                <p>Envie o link abaixo para o cliente finalizar o cadastro.</p>

                <Style.LinkBox
                  value={generatedLink}
                  readOnly
                  onClick={(e: any) => e.target.select()}
                />

                <Button
                  label="Copiar link"
                  type="button"
                  center
                  onClick={() => {
                    navigator.clipboard.writeText(generatedLink);
                    toast.info('Link copiado!');
                  }}
                />
              </Style.GeneratedLinkContainer>
            )}
          </Style.FormContainer>
        )}
      </Formik>
    </Modal>
  );
};
