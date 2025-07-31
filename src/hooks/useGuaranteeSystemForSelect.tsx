import { useState, useEffect, useCallback } from 'react';

import { Api } from '@services/api';

import { handleToastify } from '@utils/toastifyResponses';

interface IUseGuaranteeSystemForSelect {
  companyId: string;
  getDefault?: boolean;
}

interface IGuaranteeSystemForSelect {
  id: string;
  name: string;
}

export const useGuaranteeSystemForSelect = ({
  companyId,
  getDefault = false,
}: IUseGuaranteeSystemForSelect) => {
  const [guaranteeSystemsForSelect, setGuaranteeSystemsForSelect] = useState<
    IGuaranteeSystemForSelect[]
  >([]);
  const [loadingGuaranteeSystemsForSelect, setLoadingGuaranteeSystemsForSelect] =
    useState<boolean>(true);

  const getGuaranteeSystemsForSelect = useCallback(async () => {
    setLoadingGuaranteeSystemsForSelect(true);

    const uri = `/list/guarantee/systems`;

    const params = {
      companyId,
      getDefault,
    };

    try {
      const response = await Api.get(uri, { params });

      setGuaranteeSystemsForSelect(response.data.systems);
    } catch (error: any) {
      handleToastify(error.response);
    } finally {
      setLoadingGuaranteeSystemsForSelect(false);
    }
  }, [companyId, getDefault]);

  useEffect(() => {
    getGuaranteeSystemsForSelect();
  }, []);

  return { guaranteeSystemsForSelect, loadingGuaranteeSystemsForSelect };
};
