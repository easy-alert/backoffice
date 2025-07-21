import React from 'react';

import { Tag } from '@components/Tag';
import { Image } from '@components/Image';

import * as Style from './styles';

type Detail = {
  label: string;
  value: string | React.ReactNode;
};

type CardListDetailsProps = {
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
};

export const CardListDetails: React.FC<CardListDetailsProps> = ({
  title,
  items,
  emptyMessage = 'Nenhum item encontrado.',
}) => (
  <>
    <h2>{title}</h2>
    <Style.CompaniesSection>
      {items.length > 0 ? (
        items.map((item) => (
          <Style.CompanyCard key={item.id} onClick={item.onClick}>
            <Style.Image>
              <Image width="80%" height="80%" img={item.image || item.icon} />
            </Style.Image>
            <Style.CompanyInfo>
              {item.details.map((detail) => (
                <Style.DetailItem key={`${item.id}-${detail.label}`}>
                  <h2>{detail.label}</h2>
                  <p>{detail.value}</p>
                </Style.DetailItem>
              ))}
              {typeof item.status === 'boolean' && (
                <Style.DetailItem>
                  <h2>Status</h2>
                  <Tag isInvalid={!item.status} />
                </Style.DetailItem>
              )}
            </Style.CompanyInfo>
          </Style.CompanyCard>
        ))
      ) : (
        <p>{emptyMessage}</p>
      )}
    </Style.CompaniesSection>
  </>
);
