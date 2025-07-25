import { IconButton } from '@components/Buttons/IconButton';

import { icon } from '@assets/icons';

import type { IGuarantee } from '@customTypes/IGuarantee';

import { GuaranteeCard } from '../GuaranteeCard';

import * as Style from './styles';

interface IGuaranteeCategory {
  category: {
    id: string;
    name: string;
  };
  guarantees: IGuarantee[];
  onAddGuarantee?: () => void;
  onEditGuarantee?: (guarantee: IGuarantee) => void;
  onDeleteGuarantee?: (guaranteeId: string) => void;
}

export const GuaranteeCategory = ({
  category,
  guarantees = [],
  onAddGuarantee,
  onEditGuarantee,
  onDeleteGuarantee,
}: IGuaranteeCategory) => {
  const categoryGuarantees = guarantees.filter((guarantee) => guarantee.system?.id === category.id);

  return (
    <Style.CategoryContainer>
      <Style.CategoryHeader>
        <Style.CategoryTitle>{category.name}</Style.CategoryTitle>
        <Style.CategoryActions>
          {onAddGuarantee && <IconButton icon={icon.plus} onClick={onAddGuarantee} size="16px" />}
        </Style.CategoryActions>
      </Style.CategoryHeader>

      <Style.GuaranteesList>
        {categoryGuarantees.length > 0 ? (
          categoryGuarantees.map((guarantee) => (
            <GuaranteeCard
              key={guarantee.id}
              guarantee={guarantee}
              onEdit={onEditGuarantee}
              onDelete={onDeleteGuarantee}
            />
          ))
        ) : (
          <Style.EmptyState>Nenhuma garantia cadastrada para este sistema.</Style.EmptyState>
        )}
      </Style.GuaranteesList>
    </Style.CategoryContainer>
  );
};
