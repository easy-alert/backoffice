// REACT
import { useState } from 'react';

// GLOBAL COMPONENTS
import { IconButton } from '@components/Buttons/IconButton';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// COMPONENTS
import { GuaranteeCategory } from './components/GuaranteeCategory';
import { ModalCreateGuarantee } from './components/ModalCreateGuarantee';

// STYLES
import * as Style from './styles';

// TYPES
import type { Category } from './components/utils/types';

export const Guarantees = () => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: crypto.randomUUID(),
      name: 'Pisos de ambientes internos',
      guarantees: [],
    },
  ]);

  const handleCreateCategory = (categoryName: string) => {
    setCategories((prev) => [
      { id: crypto.randomUUID(), name: categoryName, guarantees: [] },
      ...prev,
    ]);
  };

  return (
    <>
      <Style.Header>
        <Style.Title>
          <h2>Garantias</h2>
          <Style.SearchField>
            <IconButton
              // label='Procurar'
              icon={icon.search}
              size="16px"
              onClick={() => {
                //  loadUsers({
                //    searchPage: 1,
                //  });
              }}
            />
          </Style.SearchField>
        </Style.Title>
        <IconButton
          hideLabelOnMedia
          fontWeight="500"
          label="Criar garantia"
          className="p2"
          icon={icon.plusWithBg}
          onClick={() => setShowModal(true)}
        />
      </Style.Header>
      {categories.map((category, idx) => (
        <GuaranteeCategory
          key={category.id}
          category={category}
          setCategories={setCategories}
          index={idx}
        />
      ))}
      {showModal && (
        <ModalCreateGuarantee setModal={setShowModal} onCreate={handleCreateCategory} />
      )}
    </>
  );
};
