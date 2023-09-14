// LIBS
import { useEffect, useState } from 'react';

// COMPONENTS

import * as Style from './styles';
import { Modal } from '../../../../../../components/Modal';
import { IAccesHistory, IModalEditCompanyAndOwner } from './types';
import { requestCompanyBuildingAccessHistories } from './functions';
import { DotSpinLoading } from '../../../../../../components/Loadings/DotSpinLoading';

// TYPES

// FUNCTIONS

export const ModalBuildingAccessHistories = ({
  companyId,
  setModal,
}: IModalEditCompanyAndOwner) => {
  const [loading, setLoading] = useState<boolean>(true);

  const [data, setData] = useState<IAccesHistory[]>([]);

  useEffect(() => {
    requestCompanyBuildingAccessHistories({
      companyId,
      setData,
      setLoading,
    });
  }, []);

  return (
    <Modal title="Contagem de acessos" setModal={setModal}>
      {loading ? (
        <Style.LoadingContainer>
          <DotSpinLoading />
        </Style.LoadingContainer>
      ) : (
        <Style.Container>
          <Style.Table>
            <Style.THead>
              <Style.Tr>
                <Style.Th>Edificação</Style.Th>
                <Style.Th>Contagem</Style.Th>
              </Style.Tr>
            </Style.THead>

            <Style.TBody>
              {data?.length > 0 &&
                data?.map((building) => (
                  <Style.Tr key={building.id}>
                    <Style.Td>{building.name}</Style.Td>
                    <Style.Td>{building.accessCount}</Style.Td>
                  </Style.Tr>
                ))}

              {data?.length === 0 && (
                <Style.Tr>
                  <Style.Td>Nenhum histórico de acesso encontrado.</Style.Td>
                  <Style.Td />
                </Style.Tr>
              )}
            </Style.TBody>
          </Style.Table>
        </Style.Container>
      )}
    </Modal>
  );
};
