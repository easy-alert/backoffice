/* eslint-disable import/no-cycle */
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
import { ModalEditSupplier } from './ModalEditSupplier';
import { ColorfulTable, ColorfulTableContent } from '../../../components/ColorfulTable';
import { ModalCreateRegion } from './ModalCreateRegion';
import { ModalEditRegion } from './ModalEditRegion';

export interface IRegion {
  id: string;
  type: string;

  cities: { city: string }[];
  states: { state: string }[];
}

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

  regions: IRegion[];
}

export const SupplierDetails = () => {
  const { supplierId } = useParams() as { supplierId: string };
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [onQuery, setOnQuery] = useState<boolean>(false);
  const [onRegionQuery, setOnRegionQuery] = useState<boolean>(false);
  const [modalEditSupplierOpen, setModalEditSupplierOpen] = useState(false);
  const [modalCreateRegionOpen, setModalCreateRegionOpen] = useState(false);
  const [modalEditRegionOpen, setModalEditRegionOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<IRegion>();

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
    regions: [],
  });

  const handleRegionType = (type: string) => {
    switch (type) {
      case 'country':
        return 'Brasil';

      case 'state':
        return 'Estado';

      case 'city':
        return 'Cidade';

      default:
        return '';
    }
  };

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

  const deleteSupplierRegion = async (regionId: string) => {
    setOnRegionQuery(true);

    await Api.delete(`/suppliers/regions/${regionId}`)
      .then((res) => {
        toast.success(res.data.ServerMessage.message);
        findSupplierById();
      })
      .catch((err) => {
        catchHandler(err);
      })
      .finally(() => {
        setOnRegionQuery(false);
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
          {modalCreateRegionOpen && (
            <ModalCreateRegion
              setModal={setModalCreateRegionOpen}
              onThenRequest={findSupplierById}
            />
          )}
          {modalEditRegionOpen && selectedRegion && (
            <ModalEditRegion
              setModal={setModalEditRegionOpen}
              onThenRequest={findSupplierById}
              region={selectedRegion}
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
                  setModalCreateRegionOpen(true);
                }}
              />
            </Style.RegionsHeader>
            <Style.TableDiv>
              {supplier.regions.length > 0 ? (
                <ColorfulTable
                  colsHeader={[
                    { label: 'Tipo' },
                    { label: 'Estados' },
                    { label: 'Cidades' },
                    { label: '' },
                  ]}
                >
                  {supplier.regions.map((region) => (
                    <ColorfulTableContent
                      key={region.id}
                      colsBody={[
                        { cell: handleRegionType(region.type), cssProps: { width: '10%' } },
                        {
                          cell: region.states.map(({ state }) => state).join(', ') || '-',
                          cssProps: { width: 'fit-content' },
                        },
                        {
                          cell: region.cities.map(({ city }) => city).join(', ') || '-',
                          cssProps: { width: '60%' },
                        },
                        {
                          cell: (
                            <Style.ButtonsDiv>
                              <PopoverButton
                                disabled={onRegionQuery}
                                actionButtonBgColor={theme.color.actionDanger}
                                type="IconButton"
                                label="Excluir"
                                hiddenIconButtonLabel
                                buttonIconSize="16px"
                                buttonIcon={icon.trash}
                                message={{
                                  title: 'Deseja excluir essa região?',
                                  content:
                                    'Atenção, essa ação não poderá ser desfeita posteriormente.',
                                  contentColor: theme.color.danger,
                                }}
                                actionButtonClick={() => {
                                  deleteSupplierRegion(region.id);
                                }}
                              />

                              <IconButton
                                size="16px"
                                icon={icon.edit}
                                onClick={() => {
                                  setSelectedRegion(region);
                                  setModalEditRegionOpen(true);
                                }}
                              />
                            </Style.ButtonsDiv>
                          ),
                        },
                      ]}
                    />
                  ))}
                </ColorfulTable>
              ) : (
                <Style.NoData>
                  <Image img={icon.paper} size="60px" radius="0" />
                  <h6>Nenhuma região cadastrada.</h6>
                </Style.NoData>
              )}
            </Style.TableDiv>
          </Style.RegionsWrapper>
        </>
      )}
    </>
  );
};
