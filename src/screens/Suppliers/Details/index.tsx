import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Api } from '../../../services/api';
import { applyMask, catchHandler, replaceInitialURLSlashes } from '../../../utils/functions';
import * as Style from './styles';
import { icon } from '../../../assets/icons';
import { IconButton } from '../../../components/Buttons/IconButton';
import { PopoverButton } from '../../../components/Buttons/PopoverButton';
import { ReturnButton } from '../../../components/Buttons/ReturnButton';
import { DotSpinLoading } from '../../../components/Loadings/DotSpinLoading';
import { theme } from '../../../styles/theme';
import { Image } from '../../../components/Image';
// eslint-disable-next-line import/no-cycle
import { ModalEditSupplier } from './ModalEditSupplier';
import { ColorfulTable, ColorfulTableContent } from '../../../components/ColorfulTable';

export interface ISupplier {
  id: string;
  image: string;
  name: string;
  occupationArea: string;
  description: string;
  link: string;

  contractedValue: number | null;
  phone: string | null;
  email: string | null;
}

export const SupplierDetails = () => {
  const { supplierId } = useParams() as { supplierId: string };
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [onQuery, setOnQuery] = useState<boolean>(false);
  const [modalEditSupplierOpen, setModalEditSupplierOpen] = useState(false);

  const [supplier, setSupplier] = useState<ISupplier>({
    contractedValue: 0,
    description: '',
    email: '',
    id: '',
    image: '',
    link: '',
    name: '',
    occupationArea: '',
    phone: '',
  });

  const deleteSupplier = async () => {
    setOnQuery(true);

    await Api.delete(`/suppliers/${supplierId}`)
      .then((res) => {
        toast.success(res.data.ServerMessage.message);
        navigate(`/suppliers${window.location.search}`);
      })
      .catch((err) => {
        catchHandler(err);
      })
      .finally(() => {
        setOnQuery(false);
      });
  };

  const findSupplierById = async () => {
    await Api.get(`/suppliers/${supplierId}`)
      .then((res) => {
        setSupplier(res.data.supplier);
      })
      .catch((err) => {
        catchHandler(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    findSupplierById();
  }, []);

  return (
    <>
      {loading && <DotSpinLoading />}

      {!loading && (
        <>
          {modalEditSupplierOpen && (
            <ModalEditSupplier
              setModal={setModalEditSupplierOpen}
              onThenRequest={findSupplierById}
              supplier={supplier}
            />
          )}
          <Style.Header>
            <h2>Detalhes de fornecedor</h2>
          </Style.Header>

          <ReturnButton path={`/suppliers${window.location.search}`} />
          <Style.CardSection>
            <Style.Card>
              <h6>Imagem/Logo</h6>
              <Image img={supplier?.image} size="80px" />
            </Style.Card>

            <Style.Card>
              <h6>Nome</h6>
              <p className="p2">{supplier.name}</p>
            </Style.Card>

            <Style.Card>
              <h6>Descrição</h6>
              <p className="p2">{supplier.description}</p>
            </Style.Card>

            <Style.Card>
              <h6>Link</h6>
              <a target="_blank" rel="noreferrer" className="p2" href={supplier.link}>
                {replaceInitialURLSlashes(supplier.link)}
              </a>
            </Style.Card>

            <Style.Card>
              <h6>Área de atuação</h6>
              <p className="p2">{supplier.occupationArea}</p>
            </Style.Card>

            <Style.Card>
              <h6>Telefone/Celular</h6>
              <p className="p2">
                {supplier.phone ? applyMask({ mask: 'TEL', value: supplier.phone }).value : '-'}
              </p>
            </Style.Card>

            <Style.Card>
              <h6>E-mail</h6>
              <p className="p2">{supplier.email || '-'}</p>
            </Style.Card>

            <Style.Card>
              <h6>Valor contratado</h6>
              <p className="p2">
                {supplier.contractedValue
                  ? applyMask({ mask: 'BRL', value: String(supplier.contractedValue) }).value
                  : '-'}
              </p>
            </Style.Card>
          </Style.CardSection>

          <Style.Footer>
            <PopoverButton
              disabled={onQuery}
              actionButtonBgColor={theme.color.actionDanger}
              type="IconButton"
              label="Excluir"
              buttonIcon={icon.trashWithBg}
              message={{
                title: 'Deseja excluir este fornecedor?',
                content: 'Atenção, essa ação não poderá ser desfeita posteriormente.',
                contentColor: theme.color.danger,
              }}
              actionButtonClick={deleteSupplier}
            />

            <IconButton
              disabled={onQuery}
              hideLabelOnMedia
              icon={icon.editWithBg}
              label="Editar"
              onClick={() => {
                setModalEditSupplierOpen(true);
              }}
            />
          </Style.Footer>

          <Style.RegionsWrapper>
            <Style.RegionsHeader>
              <h2>Regiões</h2>
              <IconButton
                disabled={onQuery}
                hideLabelOnMedia
                icon={icon.plusWithBg}
                label="Cadastrar região"
                onClick={() => {
                  // setModalEditCompanyAndOwnerIsOpen(true);
                }}
              />
            </Style.RegionsHeader>
            <Style.TableDiv>
              <ColorfulTable
                colsHeader={[
                  { label: 'Tipo' },
                  { label: 'Estado' },
                  { label: 'Cidade' },
                  { label: '' },
                ]}
              >
                <ColorfulTableContent
                  colsBody={[
                    { cell: 'coluna' },
                    { cell: 'coluna' },
                    { cell: 'coluna' },
                    {
                      cell: (
                        <Style.ButtonsDiv>
                          <PopoverButton
                            disabled={onQuery}
                            actionButtonBgColor={theme.color.actionDanger}
                            type="IconButton"
                            label="Excluir"
                            hiddenIconButtonLabel
                            buttonIconSize="16px"
                            buttonIcon={icon.trash}
                            message={{
                              title: 'Deseja excluir essa região?',
                              content: 'Atenção, essa ação não poderá ser desfeita posteriormente.',
                              contentColor: theme.color.danger,
                            }}
                            actionButtonClick={deleteSupplier}
                          />

                          <IconButton
                            size="16px"
                            icon={icon.edit}
                            onClick={() => {
                              // setModalEditCompanyAndOwnerIsOpen(true);
                            }}
                          />
                        </Style.ButtonsDiv>
                      ),
                    },
                  ]}
                />
              </ColorfulTable>
            </Style.TableDiv>
          </Style.RegionsWrapper>
        </>
      )}
    </>
  );
};
