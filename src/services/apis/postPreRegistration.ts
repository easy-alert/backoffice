import { Api } from '@services/api';
import { handleToastify } from '@utils/toastifyResponses';
import { IFinalizeRegistration } from './getPreRegistrationDetails';

export async function finalizeRegistration({
  data,
  token,
  setIsSubmitting,
  setIsSuccess,
}: IFinalizeRegistration) {
  const api = `/pre-registrations/complete/${token}`;
  setIsSubmitting(true);
  try {
    const response = await Api.post(api, data);
    handleToastify(response);

    setIsSuccess(true);

    return response.data;
  } catch (error: any) {
    handleToastify(error.response);
    return {};
  } finally {
    setIsSubmitting(false);
  }
}
