// REACT
import { useState } from 'react';

// LIBS
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

// GLOBAL COMPONENTS
import { IconButton } from '@components/Buttons/IconButton';
import { Image } from '@components/Image';
import { Modal } from '@components/Modal';
import { FormikInput } from '@components/Form/FormikInput';
import { Button } from '@components/Buttons/Button';
import { PopoverButton } from '@components/Buttons/PopoverButton';

// GLOBAL STYLES
import { theme } from '@styles/theme';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// COMPONENTS
import { GuaranteeEdit } from '../GuaranteeEdit';
import { ModalRegisterGuarantee } from '../ModalRegisterGuaratee';

// STYLES
import * as Style from './styles';

// TYPES
import type { Category, Guarantee, GuaranteeCategoryProps, SortType } from './utils/types';

function ModalEditCategory({
  open,
  onClose,
  categoryId,
  categoryName,
  setCategories,
}: {
  open: boolean;
  onClose: () => void;
  categoryId: string;
  categoryName: string;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}) {
  const [onQuery, setOnQuery] = useState(false);

  const schema = Yup.object().shape({
    categoryName: Yup.string().required('Nome obrigatório'),
  });

  const handleDelete = () => {
    setOnQuery(true);
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
    setOnQuery(false);
    onClose();
  };

  if (!open) return null;

  return (
    <Modal title="Editar garantia" setModal={onClose}>
      <Formik
        initialValues={{ categoryName }}
        validationSchema={schema}
        onSubmit={async (values) => {
          setOnQuery(true);
          setCategories((prev) =>
            prev.map((cat) =>
              cat.id === categoryId ? { ...cat, name: values.categoryName } : cat,
            ),
          );
          setOnQuery(false);
          onClose();
        }}
      >
        {({ errors, values, touched }) => (
          <Style.FormContainer>
            <Form>
              <FormikInput
                autoFocus
                label="Nome da garantia"
                name="categoryName"
                value={values.categoryName}
                error={touched.categoryName && errors.categoryName ? errors.categoryName : null}
                placeholder=" "
              />
              <Style.ButtonContainer>
                {!onQuery && (
                  <PopoverButton
                    actionButtonBgColor={theme.color.actionDanger}
                    borderless
                    type="Button"
                    label="Excluir"
                    message={{
                      title: 'Deseja excluir esta categoria?',
                      content:
                        'Atenção, todas as garantias dentro dessa categoria também serão excluídas. Essa ação não poderá ser desfeita posteriormente.',
                      contentColor: theme.color.danger,
                    }}
                    actionButtonClick={handleDelete}
                  />
                )}
                <Button label="Salvar" type="submit" loading={onQuery} />
              </Style.ButtonContainer>
            </Form>
          </Style.FormContainer>
        )}
      </Formik>
    </Modal>
  );
}

export const GuaranteeCategory = ({ category, setCategories, index }: GuaranteeCategoryProps) => {
  const [isSorted, setIsSorted] = useState(false);
  const [sortType, setSortType] = useState<SortType>('description');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [selectedGuarantee, setSelectedGuarantee] = useState<Guarantee | null>(null);
  const [modalCreateGuaranteeOpen, setModalCreateGuaranteeOpen] = useState(false);
  const [modalEditCategoryOpen, setModalEditCategoryOpen] = useState(false);

  const handleAddGuarantee = (guarantee: Guarantee) => {
    setCategories((prev) =>
      prev.map((cat, i) =>
        i === index ? { ...cat, guarantees: [...cat.guarantees, guarantee] } : cat,
      ),
    );
  };

  const handleSaveEdit = (edited: Guarantee) => {
    setCategories((prev) =>
      prev.map((cat, i) =>
        i === index
          ? {
              ...cat,
              guarantees: cat.guarantees.map((g) => (g.id === edited.id ? { ...g, ...edited } : g)),
            }
          : cat,
      ),
    );
  };

  const handleEdit = (guarantee: Guarantee) => {
    setSelectedGuarantee(guarantee);
    setModalEditOpen(true);
  };

  const handleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSort = (type: SortType) => {
    setCategories((prev) =>
      prev.map((cat, i) => {
        if (i !== index) return cat;
        const sortedGuarantees = [...cat.guarantees];
        if (sortType === type) {
          setIsSorted(!isSorted);
          sortedGuarantees.reverse();
        } else {
          setSortType(type);
          setIsSorted(false);
          sortedGuarantees.sort((a, b) => a[type].localeCompare(b[type]));
        }
        return { ...cat, guarantees: sortedGuarantees };
      }),
    );
  };

  return (
    <Style.Background>
      <Style.HeaderTitle>
        <Style.ContainerIcon>
          <h5>{category.name}</h5>
          <IconButton size="16px" icon={icon.edit} onClick={() => setModalEditCategoryOpen(true)} />
        </Style.ContainerIcon>
        <IconButton
          hideLabelOnMedia
          icon={icon.plus}
          size="16px"
          label="Cadastrar garantia"
          onClick={() => setModalCreateGuaranteeOpen(true)}
        />
      </Style.HeaderTitle>

      <ModalEditCategory
        open={modalEditCategoryOpen}
        onClose={() => setModalEditCategoryOpen(false)}
        categoryId={category.id}
        categoryName={category.name}
        setCategories={setCategories}
      />

      <ModalRegisterGuarantee
        open={modalCreateGuaranteeOpen}
        onClose={() => setModalCreateGuaranteeOpen(false)}
        onCreate={handleAddGuarantee}
      />

      <Style.GuaranteesContainer>
        {category.guarantees.length ? (
          <>
            <Style.GuaranteesHeader>
              <Style.GuaranteesGrid>
                <Style.SortHeader
                  highlighted={sortType === 'description'}
                  onClick={() => handleSort('description')}
                >
                  <p className="p2">Descrição</p>
                  <Image
                    img={
                      isSorted && sortType === 'description' ? icon.downTriangle : icon.upTriangle
                    }
                    size="8px"
                  />
                </Style.SortHeader>
                <Style.SortHeader
                  highlighted={sortType === 'failures'}
                  onClick={() => handleSort('failures')}
                >
                  <p className="p2">Falhas</p>
                  <Image
                    img={isSorted && sortType === 'failures' ? icon.downTriangle : icon.upTriangle}
                    size="8px"
                  />
                </Style.SortHeader>
                <Style.SortHeader
                  highlighted={sortType === 'term'}
                  onClick={() => handleSort('term')}
                >
                  <p className="p2">Prazo</p>
                  <Image
                    img={isSorted && sortType === 'term' ? icon.downTriangle : icon.upTriangle}
                    size="8px"
                  />
                </Style.SortHeader>
                <Style.SortHeader
                  highlighted={sortType === 'source'}
                  onClick={() => handleSort('source')}
                >
                  <p className="p2">Fonte</p>
                  <Image
                    img={isSorted && sortType === 'source' ? icon.downTriangle : icon.upTriangle}
                    size="8px"
                  />
                </Style.SortHeader>
                <div />
              </Style.GuaranteesGrid>
            </Style.GuaranteesHeader>
            {category.guarantees.map((g) => (
              <div key={g.id}>
                <Style.GuaranteeCard
                  cardIsOpen={expandedId === g.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={expandedId === g.id}
                  onClick={() => handleExpand(g.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleExpand(g.id);
                    }
                  }}
                >
                  <p className="p2">{g.description}</p>
                  <p className="p2">{g.failures}</p>
                  <p className="p2">{g.term}</p>
                  <p className="p2">{g.source}</p>
                  <Style.Arrow cardIsOpen={expandedId === g.id}>
                    <Image img={icon.downArrow} size="16px" />
                  </Style.Arrow>
                </Style.GuaranteeCard>
                {expandedId === g.id && (
                  <Style.ExpandedContent>
                    <div>
                      <span style={{ color: '#B42318', fontWeight: 500 }}>Observação:</span>
                      {g.observation}
                    </div>
                    <Style.EditButton onClick={() => handleEdit(g)}>Editar</Style.EditButton>
                  </Style.ExpandedContent>
                )}
              </div>
            ))}
          </>
        ) : (
          <p style={{ opacity: 0.7 }}>Nenhuma garantia cadastrada.</p>
        )}
      </Style.GuaranteesContainer>

      <GuaranteeEdit
        open={modalEditOpen}
        onClose={() => setModalEditOpen(false)}
        guarantee={selectedGuarantee}
        onSave={handleSaveEdit}
      />
    </Style.Background>
  );
};
