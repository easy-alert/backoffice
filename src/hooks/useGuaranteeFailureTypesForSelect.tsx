import { useState, useEffect, useCallback } from 'react';

import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

interface IUseGuaranteeFailureTypesForSelect {
  companyId: string;
  getDefault?: boolean;
}

interface IGuaranteeFailureTypeForSelect {
  id: string;
  name: string;
}

export const useGuaranteeFailureTypesForSelect = ({
  companyId,
  getDefault = false,
}: IUseGuaranteeFailureTypesForSelect) => {
  const [guaranteeFailureTypesForSelect, setGuaranteeFailureTypesForSelect] = useState<
    IGuaranteeFailureTypeForSelect[]
  >([]);
  const [loadingGuaranteeFailureTypesForSelect, setLoadingGuaranteeFailureTypesForSelect] =
    useState<boolean>(true);

  const getGuaranteeFailureTypesForSelect = useCallback(async () => {
    setLoadingGuaranteeFailureTypesForSelect(true);

    const uri = `/list/guarantee/failure-types`;

    const params = {
      companyId,
      getDefault,
    };

    try {
      const response = await Api.get(uri, { params });

      setGuaranteeFailureTypesForSelect(response.data.failureTypes);
    } catch (error: any) {
      handleToastify(error.response);
    } finally {
      setLoadingGuaranteeFailureTypesForSelect(false);
    }
  }, [companyId, getDefault]);

  useEffect(() => {
    getGuaranteeFailureTypesForSelect();
  }, []);

  return { guaranteeFailureTypesForSelect, loadingGuaranteeFailureTypesForSelect };
};
