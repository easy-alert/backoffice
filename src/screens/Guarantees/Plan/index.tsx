// REACT
import { useEffect, useState } from 'react';

// SERVICES
import { getGuaranteePlan } from '@services/apis/getGuaranteePlan';
import { getGuaranteeSystems } from '@services/apis/getGuaranteeSystems';
import { getGuaranteeFailureTypes } from '@services/apis/getGuaranteeFailureTypes';
import { createGuaranteePlan, ICreateGuaranteePlan } from '@services/apis/createGuaranteePlan';

// GLOBAL COMPONENTS
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';
import { IconButton } from '@components/Buttons/IconButton';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// GLOBAL TYPES
import type { IGuaranteeSystem } from '@customTypes/IGuaranteeSystem';
import type { IGuaranteeFailureType } from '@customTypes/IGuaranteeFailureType';
import type { IGuarantee } from '@customTypes/IGuarantee';

// COMPONENTS
import { ModalCreateGuarantee } from './components/ModalCreateGuarantee';

// STYLES
import * as Style from './styles';
import { GuaranteeCategory } from './components/GuaranteeCategory';

// TYPES

export const Plan = () => {
  const [guarantees, setGuarantees] = useState<IGuarantee[]>([]);
  const [systemsCategories, setSystemsCategories] = useState<{ id: string; name: string }[]>([]);

  const [systemsToSelect, setSystemsToSelect] = useState<IGuaranteeSystem[]>([]);
  const [failureTypesToSelect, setFailureTypesToSelect] = useState<IGuaranteeFailureType[]>([]);

  const [modalCreateGuarantee, setModalCreateGuarantee] = useState(false);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleModalCreateGuarantee = (state: boolean) => {
    setModalCreateGuarantee(state);
  };

  // #region api functions
  const handleGetGuaranteePlan = async () => {
    setLoading(true);

    try {
      const responseData = await getGuaranteePlan({
        companyId: [],
      });

      setGuarantees(responseData?.guarantees || []);

      const systemsCategoriesSet = new Set<string>();

      const filteredSystemsCategories = responseData?.guarantees
        .map((guarantee) => {
          const systemId = guarantee.system?.id || '';
          if (!systemsCategoriesSet.has(systemId)) {
            systemsCategoriesSet.add(systemId);
            return { id: systemId, name: guarantee.system?.name || '' };
          }
          return null;
        })
        .filter((systemCategory) => systemCategory !== null) as { id: string; name: string }[];

      setSystemsCategories(filteredSystemsCategories);
    } finally {
      setLoading(false);
    }
  };

  const handleGetGuaranteeSystems = async () => {
    setLoading(true);

    try {
      const responseData = await getGuaranteeSystems({
        companyId: [],
      });

      setSystemsToSelect(responseData?.systems || []);
      setRefresh(!refresh);
    } finally {
      setLoading(false);
    }
  };

  const handleGetGuaranteeFailureTypes = async () => {
    setLoading(true);

    try {
      const responseData = await getGuaranteeFailureTypes({
        companyId: [],
      });

      setFailureTypesToSelect(responseData?.failureTypes || []);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGuaranteePlan = async ({
    systemId,
    description,
    failureTypesIds,
    warrantyPeriod,
  }: ICreateGuaranteePlan) => {
    setLoading(true);

    try {
      const responseData = await createGuaranteePlan({
        systemId,
        description,
        failureTypesIds,
        warrantyPeriod,
      });

      setGuarantees(responseData?.guarantees || []);
    } finally {
      setLoading(false);
    }
  };
  // #endregion

  useEffect(() => {
    handleGetGuaranteePlan();
    handleGetGuaranteeSystems();
    handleGetGuaranteeFailureTypes();
  }, []);

  useEffect(() => {
    handleGetGuaranteePlan();
  }, [refresh]);

  return (
    <>
      {modalCreateGuarantee && (
        <ModalCreateGuarantee
          systems={systemsToSelect}
          failureTypes={failureTypesToSelect}
          handleModalCreateGuarantee={handleModalCreateGuarantee}
          handleCreateGuaranteePlan={handleCreateGuaranteePlan}
        />
      )}

      {loading ? (
        <DotSpinLoading />
      ) : (
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
              onClick={() => handleModalCreateGuarantee(true)}
            />
          </Style.Header>

          <Style.SystemsCategoriesContainer>
            {systemsCategories.map((systemCategory) => (
              <GuaranteeCategory
                key={systemCategory.id}
                category={systemCategory}
                guarantees={guarantees}
                onAddGuarantee={() => {
                  // TODO: Implement add guarantee functionality
                  console.log('Add guarantee for system:', systemCategory.id);
                }}
                onEditGuarantee={(guarantee) => {
                  // TODO: Implement edit guarantee functionality
                  console.log('Edit guarantee:', guarantee.id);
                }}
                onDeleteGuarantee={(guaranteeId) => {
                  // TODO: Implement delete guarantee functionality
                  console.log('Delete guarantee:', guaranteeId);
                }}
              />
            ))}
          </Style.SystemsCategoriesContainer>
        </>
      )}
    </>
  );
};
