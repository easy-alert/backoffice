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

  const [submittedName, setSubmittedName] = useState('');

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

    setSubmittedName(clientData.clientName);

    const digits = clientData.CNPJorCPF?.replace(/[^\d]/g, '') ?? '';

    const finalData = {
      ...clientData,
      cnpj: digits.length === 14 ? digits : null,
      cpf: digits.length === 11 ? digits : null,
    };
    delete (finalData as any).CNPJorCPF;

    await finalizeRegistration({
      data: finalData as any,
      token,
      setIsSubmitting,
      setIsSuccess,
    });
  };

  const handleDocumentBlur = async (
    e: React.FocusEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    const document = e.target.value.replace(/[^\d]/g, '');
    if (document.length !== 14) return;

    setIsFetchingCnpj(true);
    try {
      const { data } = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${document}`);
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
          <Style.SuccessContainer>
            <h2>Parabéns! Seu cadastro foi recebido!</h2>

            <p>
              Olá <strong>{submittedName}</strong>, tudo bem? Parabéns pela escolha da Easy Alert!
              Esse é o primeiro passo para uma gestão de manutenções descomplicada e eficiente.
            </p>

            <Style.InfoCard>
              <Style.SectionTitle>
                <span>📧</span>
                <h3>Infos importantes do setor financeiro:</h3>
              </Style.SectionTitle>
              <p>
                Boletos são enviados mensalmente pelo e-mail <strong>boleto@nibo.com.br</strong>,
                com o assunto: “Lembrete de fatura – [{submittedName}]”.
                <br />
                Boletos e NFs também ficam disponíveis na aba <strong>Financeiro</strong> da
                plataforma.
              </p>
            </Style.InfoCard>

            <Style.InfoCard>
              <Style.SectionTitle>
                <span>🗓️</span>
                <h3>Próximos Passos</h3>
              </Style.SectionTitle>
              <p>
                O próximo passo é agendar sua primeira reunião de implementação com nossa equipe.
              </p>

              <div style={{ textAlign: 'center', margin: '16px 0' }}>
                <Style.CalendlyButton
                  href="https://calendly.com/suporte-easyalert/suporte-easy-alert"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  👉 Agendar Reunião de Implementação
                </Style.CalendlyButton>
              </div>
              <Style.RequirementList>
                <li>⏱️ A reunião dura de 1 a 2 horas.</li>
                <li>💻 Participe por um computador, em local silencioso e com internet estável.</li>
                <li>📂 Tenha em mãos o histórico de manutenções do condomínio.</li>
              </Style.RequirementList>
            </Style.InfoCard>
          </Style.SuccessContainer>
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
            CNPJorCPF: '',
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
            billingEmail: '',
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
                label="CNPJ/CPF *"
                name="CNPJorCPF"
                placeholder="Insira o CNPJ ou CPF"
                error={touched.CNPJorCPF && errors.CNPJorCPF ? errors.CNPJorCPF : null}
                onBlur={(e) => handleDocumentBlur(e, setFieldValue)}
                onChange={(e) => {
                  setFieldValue(
                    'CNPJorCPF',
                    applyMask({
                      mask: e.target.value.length > 14 ? 'CNPJ' : 'CPF',
                      value: e.target.value,
                    }).value,
                  );
                }}
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
              <FormikSelect
                label="Dia de vencimento da mensalidade *"
                name="dueDay"
                error={touched.dueDay && errors.dueDay ? errors.dueDay : null}
              >
                <option value="">Selecione um dia</option>
                <option value={5}>Dia 05</option>
                <option value={10}>Dia 10</option>
                <option value={15}>Dia 15</option>
                <option value={20}>Dia 20</option>
              </FormikSelect>
              <FormikInput
                label="E-mail para receber as cobranças *"
                name="billingEmail"
                type="email"
                error={touched.billingEmail && errors.billingEmail ? errors.billingEmail : null}
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
