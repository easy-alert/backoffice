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
  const [guaranteesForSearch, setGuaranteesForSearch] = useState<IGuarantee[]>([]);
  const [systemsCategories, setSystemsCategories] = useState<{ id: string; name: string }[]>([]);

  const [systemsToSelect, setSystemsToSelect] = useState<IGuaranteeSystem[]>([]);
  const [failureTypesToSelect, setFailureTypesToSelect] = useState<IGuaranteeFailureType[]>([]);

  const [search, setSearch] = useState('');

  const [modalCreateGuarantee, setModalCreateGuarantee] = useState(false);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleModalCreateGuarantee = (state: boolean) => {
    setModalCreateGuarantee(state);
  };

  const handleSystemsCategories = (responseGuarantees: IGuarantee[]) => {
    const systemsCategoriesSet = new Set<string>();

    const filteredSystemsCategories = responseGuarantees
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
  };

  const handleSearch = (value: string) => {
    if (value !== '') {
      const newGuarantees = guarantees.filter(
        (guarantee) =>
          guarantee?.system?.name?.toLowerCase().includes(value?.toLowerCase() || '') ||
          guarantee?.description?.toLowerCase().includes(value?.toLowerCase() || '') ||
          guarantee?.failureTypes?.some((failureType) =>
            failureType?.failureType?.name?.toLowerCase().includes(value?.toLowerCase() || ''),
          ),
      );

      setGuaranteesForSearch(newGuarantees);
      handleSystemsCategories(newGuarantees);
    } else {
      setGuaranteesForSearch(guarantees);
      handleSystemsCategories(guarantees);
    }
  };

  // #region api functions
  const handleGetGuaranteePlan = async () => {
    setLoading(true);

    try {
      const responseData = await getGuaranteePlan({
        companyId: [],
      });

      setGuarantees(responseData?.guarantees || []);
      setGuaranteesForSearch(responseData?.guarantees || []);
      handleSystemsCategories(responseData?.guarantees || []);
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
      await createGuaranteePlan({
        systemId,
        description,
        failureTypesIds,
        warrantyPeriod,
      });

      handleGetGuaranteePlan();
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
                <IconButton icon={icon.search} size="16px" onClick={() => handleSearch(search)} />

                <input
                  type="text"
                  placeholder="Procurar"
                  value={search}
                  onChange={(evt) => {
                    setSearch(evt.target.value.trim());
                    handleSearch(evt.target.value.trim());
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
                guarantees={guaranteesForSearch}
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
