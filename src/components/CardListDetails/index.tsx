import React from 'react';

import { Tag } from '@components/Tag';
import { Image } from '@components/Image';

import * as Style from './styles';

interface Detail {
  label: string;
  value: string | React.ReactNode;
}

interface ICardListDetails {
  title: string;
  items: Array<{
    id: string | number;
    image?: string;
    icon?: string;
    onClick?: () => void;
    details: Detail[];
    status?: boolean;
  }>;
  emptyMessage?: string;
}

export const CardListDetails = ({
  title,
  items,
  emptyMessage = 'Nenhum item encontrado.',
}: ICardListDetails) => (
  <>
    <h2>{title}</h2>
    <Style.Container>
      {items.length > 0 ? (
        items.map((item) => {
          const allDetails =
            item.status !== undefined
              ? [...item.details, { label: 'Status', value: <Tag isInvalid={!item.status} /> }]
              : item.details;

          return (
            <Style.Card key={item.id} onClick={item.onClick}>
              <Style.Image>
                <Image width="80%" height="80%" img={item.image || item.icon} />
              </Style.Image>
              <Style.Info>
                {allDetails.map((detail) => (
                  <Style.DetailItem key={`${item.id}-${detail.label}`}>
                    <h2>{detail.label}</h2>
                    <p>{detail.value}</p>
                  </Style.DetailItem>
                ))}
              </Style.Info>
            </Style.Card>
          );
        })
      ) : (
        <p>{emptyMessage}</p>
      )}
    </Style.Container>
  </>
);
