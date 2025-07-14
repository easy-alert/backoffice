import { Api } from '@services/api';
import { handleToastify } from '@utils/toastifyResponses';

export interface IPutIsBlockedUser {
  ServerMessage: {
    statusCode: number;
    message: string;
  };
  isBlocked?: boolean;
  [key: string]: any;
}

export async function putIsBlockedUser(userId: string): Promise<IPutIsBlockedUser | undefined> {
  const uri = '/account/users/changeIsBlockedUser';
  try {
    const response = await Api.put(uri, { userId });
    handleToastify(response);
    return response.data;
  } catch (error: any) {
    handleToastify(error.response);
    return undefined;
  }
}
