// REACT
import { useEffect, useState } from 'react';

// LIBS
import axios from 'axios';
import { Form, Formik } from 'formik';
import { useSearchParams } from 'react-router-dom';

// SERVICES
import {
  EClientType,
  getPreRegistrationDetails,
  IClientFormData,
  IInternalData,
  schemaClientValidation,
} from '@services/apis/getPreRegistrationDetails';
import { finalizeRegistration } from '@services/apis/postPreRegistration';

// COMPONENTES
import { Button } from '@components/Buttons/Button';
import { FormikCheckbox } from '@components/Form/FormikCheckbox';
import { FormikImageInput } from '@components/Form/FormikImageInput';
import { FormikInput } from '@components/Form/FormikInput';
import { FormikSelect } from '@components/Form/FormikSelect';
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';

// UTILS
import { applyMask } from '@utils/functions';

// STYLES
import * as Style from './styles';

const EClientTypeLabel: Record<EClientType, string> = {
  [EClientType.RESIDENT_SYNDIC]: 'Síndico Morador',
  [EClientType.PROFESSIONAL_SYNDIC]: 'Síndico Profissional',
  [EClientType.CONSTRUCTION_COMPANY]: 'Construtora',
  [EClientType.ADMINISTRATION_COMPANY]: 'Administradora',
  [EClientType.OTHERS]: 'Outros',
};

const planTypeLabels: { [key: string]: string } = {
  monthly: 'Mensal',
  annual: 'Anual',
};

export const ClientRegistrationPage = () => {
  const [searchParams] = useSearchParams();

  const [internalData, setInternalData] = useState<IInternalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingCnpj, setIsFetchingCnpj] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setError('Token de pré-cadastro inválido ou não fornecido.');
      setIsLoading(false);
      return;
    }

    async function loadDetails() {
      try {
        const data = await getPreRegistrationDetails(token!);
        setInternalData(data);
      } catch (err) {
        setError(
          'Não foi possível carregar os dados. O link pode ter expirado ou já sido utilizado.',
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadDetails();
  }, [searchParams]);

  const handleSubmit = async (clientData: IClientFormData) => {
    const token = searchParams.get('token');
    if (!token) return;

    await finalizeRegistration({
      data: clientData,
      token,
      setIsSubmitting,
      setIsSuccess,
    });
  };

  const handleCnpjBlur = async (
    e: React.FocusEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    const cnpj = e.target.value.replace(/[^\d]/g, '');
    if (cnpj.length !== 14) return;

    setIsFetchingCnpj(true);
    try {
      const { data } = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
      const address = `${data.logradouro}, ${data.numero} - ${data.bairro}, ${data.municipio} - ${data.uf}`;
      setFieldValue('address', address);
    } catch (err) {
      console.error('Erro ao buscar CNPJ', err);
      setFieldValue('address', 'Não foi possível encontrar o endereço.');
    } finally {
      setIsFetchingCnpj(false);
    }
  };

  if (isLoading) {
    return <DotSpinLoading />;
  }

  if (error) {
    return (
      <Style.Container>
        <h1>Erro</h1>
        <p>{error}</p>
      </Style.Container>
    );
  }

  if (isSuccess) {
    return (
      <Style.Container>
        <Style.Wrapper>
          <div style={{ textAlign: 'center' }}>
            <h2>Cadastro finalizado com Sucesso!</h2>
            <p style={{ marginTop: '16px', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Sua solicitação foi recebida.
              <br />
              Em breve, nossa equipe entrará em contato para marcar a implementação.
            </p>
          </div>
        </Style.Wrapper>
      </Style.Container>
    );
  }

  return (
    <Style.Container>
      <Style.Wrapper>
        <h1>Finalize seu cadastro</h1>
        <Style.PlanSummary>
          <h3>Resumo do seu plano</h3>
          <p>
            <strong>Tipo de Cliente:</strong>{' '}
            {internalData
              ? EClientTypeLabel[internalData.clientType] || internalData.clientType
              : ''}
          </p>
          <p>
            <strong>Plano contratado:</strong>{' '}
            {internalData ? planTypeLabels[internalData.planType] || internalData.planType : ''}
          </p>
          <p>
            <strong>Valor da mensalidade:</strong> R$ {internalData?.monthlyPrice}
          </p>
          {internalData?.implementationPrice && (
            <p>
              <strong>Valor da implementação:</strong> R$ {internalData.implementationPrice}
            </p>
          )}
        </Style.PlanSummary>
        <Formik
          initialValues={{
            logo: '',
            clientName: '',
            cnpj: '',
            address: '',
            loginEmail: '',
            password: '',
            confirmPassword: '',
            contactPhone: '',
            paymentType: 'boleto',
            cardNumber: '',
            cardHolder: '',
            cardExpiration: '',
            cardCVV: '',
            dueDay: '',
            financialName: '',
            financialPhone: '',
            financialEmail: '',
            acceptTerms: false,
          }}
          validationSchema={schemaClientValidation}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <h3>Informações da Empresa</h3>
              <FormikImageInput
                name="logo"
                label="Logo da Empresa"
                defaultImage={values.logo}
                onChange={(event: any) => {
                  if (event.target.files?.length) {
                    setFieldValue('logo', event.target.files[0]);
                  }
                }}
                error={touched.logo && errors.logo ? errors.logo : null}
              />
              <FormikInput
                label="Nome da Empresa *"
                name="clientName"
                error={touched.clientName && errors.clientName ? errors.clientName : null}
              />
              <FormikInput
                label="Telefone de contato *"
                name="contactPhone"
                onChange={(e) =>
                  setFieldValue(
                    'contactPhone',
                    applyMask({ value: e.target.value, mask: 'TEL' }).value,
                  )
                }
                error={touched.contactPhone && errors.contactPhone ? errors.contactPhone : null}
              />
              <FormikInput
                label="CNPJ *"
                name="cnpj"
                onBlur={(e) => handleCnpjBlur(e, setFieldValue)}
                error={touched.cnpj && errors.cnpj ? errors.cnpj : null}
              />
              <FormikInput
                label="Endereço"
                name="address"
                disabled
                placeholder={isFetchingCnpj ? 'Buscando...' : 'Preenchido pelo CNPJ'}
              />

              <h3>Acesso à Plataforma</h3>
              <FormikInput
                label="E-mail de login *"
                name="loginEmail"
                type="email"
                error={touched.loginEmail && errors.loginEmail ? errors.loginEmail : null}
              />
              <FormikInput
                label="Senha *"
                name="password"
                type="password"
                error={touched.password && errors.password ? errors.password : null}
              />
              <FormikInput
                label="Confirmar senha *"
                name="confirmPassword"
                type="password"
                error={
                  touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : null
                }
              />

              <h3>Informações Financeiras</h3>
              <FormikSelect
                label="Tipo de pagamento *"
                name="paymentType"
                error={touched.paymentType && errors.paymentType ? errors.paymentType : null}
              >
                <option value="boleto">Boleto</option>
                <option value="cartao">Cartão de Crédito</option>
              </FormikSelect>
              {values.paymentType === 'cartao' && (
                <>
                  <FormikInput
                    label="Número do cartão *"
                    name="cardNumber"
                    error={touched.cardNumber && errors.cardNumber ? errors.cardNumber : null}
                  />
                  <FormikInput
                    label="Nome do titular *"
                    name="cardHolder"
                    error={touched.cardHolder && errors.cardHolder ? errors.cardHolder : null}
                  />
                  <FormikInput
                    label="Validade (MM/AA) *"
                    name="cardExpiration"
                    error={
                      touched.cardExpiration && errors.cardExpiration ? errors.cardExpiration : null
                    }
                  />
                  <FormikInput
                    label="CVV *"
                    name="cardCVV"
                    maxLength={4}
                    error={touched.cardCVV && errors.cardCVV ? errors.cardCVV : null}
                  />
                </>
              )}
              <FormikInput
                label="Dia de vencimento *"
                name="dueDay"
                type="number"
                error={touched.dueDay && errors.dueDay ? errors.dueDay : null}
              />
              <FormikInput
                label="Nome do responsável financeiro *"
                name="financialName"
                error={touched.financialName && errors.financialName ? errors.financialName : null}
              />
              <FormikInput
                label="Telefone do financeiro"
                name="financialPhone"
                onChange={(e) =>
                  setFieldValue(
                    'financialPhone',
                    applyMask({ value: e.target.value, mask: 'TEL' }).value,
                  )
                }
              />
              <FormikInput label="E-mail do financeiro" name="financialEmail" type="email" />

              <FormikCheckbox
                label="Li e aceito os termos de uso do sistema."
                name="acceptTerms"
                error={touched.acceptTerms && errors.acceptTerms ? errors.acceptTerms : null}
              />
              <Button label="Finalizar Cadastro" type="submit" center loading={isSubmitting} />
            </Form>
          )}
        </Formik>
      </Style.Wrapper>
    </Style.Container>
  );
};
