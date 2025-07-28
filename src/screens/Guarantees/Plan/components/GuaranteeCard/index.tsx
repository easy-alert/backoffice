import { IconButton } from '@components/Buttons/IconButton';

import { icon } from '@assets/icons';

import type { IGuarantee } from '@customTypes/IGuarantee';

import * as Style from './styles';

interface IGuaranteeCard {
  guarantee: IGuarantee;
  onEdit?: (guarantee: IGuarantee) => void;
  onDelete?: (guaranteeId: string) => void;
}

const formatWarrantyPeriod = (months: number): string => {
  if (months < 12) {
    return `${months} meses`;
  }
  if (months === 12) {
    return '1 ano';
  }
  return `${months / 12} anos`;
};

export const GuaranteeCard = ({ guarantee, onEdit, onDelete }: IGuaranteeCard) => (
  <Style.Card>
    <Style.CardContent>
      <Style.CardHeader>
        <Style.CardTitle>{guarantee.description || 'Sem descrição'}</Style.CardTitle>
        <Style.CardActions>
          {onEdit && (
            <IconButton icon={icon.editWithBg} onClick={() => onEdit(guarantee)} size="16px" />
          )}

          {onDelete && (
            <IconButton
              icon={icon.trashWithBg}
              onClick={() => onDelete(guarantee.id || '')}
              size="16px"
            />
          )}
        </Style.CardActions>
      </Style.CardHeader>

      <Style.CardDetails>
        {guarantee.failureTypes && (
          <Style.DetailItem>
            <span>Tipo de falha:</span>

            <Style.FailureTypeTagsContainer>
              {guarantee.failureTypes.map((failureType) => (
                <Style.FailureTypeTag key={failureType.failureType.id}>
                  {failureType.failureType.name}
                </Style.FailureTypeTag>
              ))}
            </Style.FailureTypeTagsContainer>
          </Style.DetailItem>
        )}

        {guarantee.standardWarrantyPeriod && (
          <Style.DetailItem>
            <span>Período de garantia:</span>
            <span>{formatWarrantyPeriod(guarantee.standardWarrantyPeriod)}</span>
          </Style.DetailItem>
        )}
      </Style.CardDetails>
    </Style.CardContent>
  </Style.Card>
);
