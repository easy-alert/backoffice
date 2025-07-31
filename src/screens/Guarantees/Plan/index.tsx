// REACT
import { useEffect, useState } from 'react';

// SERVICES
import { getGuaranteePlan } from '@services/apis/getGuaranteePlan';
import { createGuaranteePlan, type ICreateGuaranteePlan } from '@services/apis/createGuaranteePlan';
import { updateGuarantee, type IUpdateGuarantee } from '@services/apis/updateGuarantee';
import { deleteGuarantee } from '@services/apis/deleteGuarantee';

// GLOBAL COMPONENTS
import { DotSpinLoading } from '@components/Loadings/DotSpinLoading';
import { IconButton } from '@components/Buttons/IconButton';

// GLOBAL ASSETS
import { icon } from '@assets/icons';

// GLOBAL TYPES
import type { IGuarantee } from '@customTypes/IGuarantee';

// COMPONENTS
import { GuaranteeCategory } from './components/GuaranteeCategory';
import { ModalCreateGuarantee } from './components/ModalCreateGuarantee';
import { ModalEditGuarantee } from './components/ModalEditGuarantee';

// STYLES
import * as Style from './styles';

export const Plan = () => {
  const [guarantees, setGuarantees] = useState<IGuarantee[]>([]);
  const [guaranteesForSearch, setGuaranteesForSearch] = useState<IGuarantee[]>([]);
  const [systemsCategories, setSystemsCategories] = useState<{ id: string; name: string }[]>([]);

  const [selectedSystemId, setSelectedSystemId] = useState<string | undefined>();
  const [selectedGuaranteeId, setSelectedGuaranteeId] = useState<string | undefined>();

  const [search, setSearch] = useState('');

  const [modalCreateGuarantee, setModalCreateGuarantee] = useState(false);
  const [modalEditGuarantee, setModalEditGuarantee] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleModalCreateGuarantee = (state: boolean, systemId?: string) => {
    setModalCreateGuarantee(state);
    setSelectedSystemId(systemId);
  };

  const handleModalEditGuarantee = (state: boolean, guaranteeId?: string) => {
    setModalEditGuarantee(state);
    setSelectedGuaranteeId(guaranteeId);
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
          guarantee?.system?.name?.toLowerCase().includes(value?.toLowerCase().trim() || '') ||
          guarantee?.description?.toLowerCase().includes(value?.toLowerCase().trim() || '') ||
          guarantee?.guaranteeToFailureTypes?.some((failureType) =>
            failureType?.failureType?.name
              ?.toLowerCase()
              .includes(value?.toLowerCase().trim() || ''),
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

  const handleCreateGuaranteePlan = async ({
    systemId,
    description,
    observation,
    failureTypesIds,
    warrantyPeriod,
  }: ICreateGuaranteePlan) => {
    setLoading(true);

    try {
      await createGuaranteePlan({
        systemId,
        description,
        observation,
        failureTypesIds,
        warrantyPeriod,
      });

      handleGetGuaranteePlan();
    } finally {
      setLoading(false);
    }
  };

  const handleEditGuaranteePlan = async (guarantee: IUpdateGuarantee) => {
    setLoading(true);

    try {
      await updateGuarantee(guarantee);

      handleGetGuaranteePlan();
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGuaranteePlan = async (id: string) => {
    setLoading(true);

    try {
      await deleteGuarantee(id);

      handleGetGuaranteePlan();
    } finally {
      setLoading(false);
    }
  };
  // #endregion

  useEffect(() => {
    handleGetGuaranteePlan();
  }, []);

  return (
    <>
      {modalCreateGuarantee && (
        <ModalCreateGuarantee
          selectedSystemId={selectedSystemId}
          handleModalCreateGuarantee={handleModalCreateGuarantee}
          handleCreateGuaranteePlan={handleCreateGuaranteePlan}
        />
      )}

      {modalEditGuarantee && (
        <ModalEditGuarantee
          guarantee={guarantees.find((guarantee) => guarantee.id === selectedGuaranteeId) || {}}
          handleEditGuaranteePlan={handleEditGuaranteePlan}
          handleModalEditGuarantee={handleModalEditGuarantee}
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
                    setSearch(evt.target.value);
                    handleSearch(evt.target.value);
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
                onAddGuarantee={() => handleModalCreateGuarantee(true, systemCategory.id)}
                onEditGuarantee={(guarantee) => handleModalEditGuarantee(true, guarantee.id)}
                onDeleteGuarantee={(guaranteeId) => handleDeleteGuaranteePlan(guaranteeId)}
              />
            ))}
          </Style.SystemsCategoriesContainer>
        </>
      )}
    </>
  );
};
