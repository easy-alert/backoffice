import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as Style from './styles';
import { Api } from '../../../services/api';
import { applyMask, catchHandler } from '../../../utils/functions';
import { Image } from '../../../components/Image';
import { icon } from '../../../assets/icons';
import { IconButton } from '../../../components/Buttons/IconButton';
import { DotSpinLoading } from '../../../components/Loadings/DotSpinLoading';
import { ModalCreateSupplier } from './ModalCreateSupplier';

interface ISupplier {
  id: string;
  image: string;
  name: string;
  occupationArea: string;
  description: string;

  phone: string | null;
  email: string | null;
}

export const SuppliersList = () => {
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>('');
  const [modalCreateSupplierOpen, setModalCreateSupplierOpen] = useState(false);

  const [query] = useSearchParams();
  const querySearch = query.get('querySearch');

  const findManySuppliers = async (searchParameter: string) => {
    await Api.get(`/suppliers?search=${searchParameter}`)
      .then((res) => {
        setSuppliers(res.data.suppliers);
      })
      .catch((err) => {
        catchHandler(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (querySearch) setSearch(querySearch);

    findManySuppliers(querySearch ?? search);
  }, []);

  return loading ? (
    <DotSpinLoading />
  ) : (
    <>
      {modalCreateSupplierOpen && (
        <ModalCreateSupplier
          setModal={setModalCreateSupplierOpen}
          onThenRequest={async () => {
            findManySuppliers(search);
          }}
        />
      )}
      <Style.Header>
        <Style.LeftSide>
          <h2>Fornecedores</h2>

          <Style.SearchField>
            <IconButton
              icon={icon.search}
              size="16px"
              onClick={() => {
                findManySuppliers(search);
              }}
            />
            <input
              type="text"
              maxLength={80}
              placeholder="Procurar"
              value={search}
              onChange={(evt) => {
                setSearch(evt.target.value);
                if (evt.target.value === '') {
                  findManySuppliers('');
                }
              }}
              onKeyUp={(evt) => {
                if (evt.key === 'Enter') {
                  findManySuppliers(search);
                }
              }}
            />
          </Style.SearchField>
        </Style.LeftSide>
        <IconButton
          hideLabelOnMedia
          fontWeight="500"
          label="Cadastrar"
          className="p2"
          icon={icon.plusWithBg}
          onClick={() => {
            setModalCreateSupplierOpen(true);
          }}
        />
      </Style.Header>

      {suppliers?.length > 0 ? (
        <Style.Wrapper>
          {suppliers.map((supplier) => (
            <Style.Card key={supplier.id} to={`/suppliers/${supplier.id}?querySearch=${search}`}>
              <Style.ImageDiv>
                <Image img={supplier.image} size="100px" />
              </Style.ImageDiv>

              <Style.CardContent>
                <Style.CardHeader>
                  <h5>{supplier.name}</h5>
                  <p className="p2">{supplier.occupationArea}</p>
                </Style.CardHeader>

                <p className="p1">{supplier.description}</p>
              </Style.CardContent>

              <Style.CardFooter>
                <Style.Line />
                <p className="p4">
                  {supplier.phone ? applyMask({ mask: 'TEL', value: supplier.phone }).value : '-'}
                </p>
                <p className="p4">{supplier.email || '-'}</p>
              </Style.CardFooter>
            </Style.Card>
          ))}
        </Style.Wrapper>
      ) : (
        <Style.Container>
          <Image img={icon.paper} size="80px" radius="0" />
          <h3>Nenhum fornecedor encontrado.</h3>
        </Style.Container>
      )}
    </>
  );
};
