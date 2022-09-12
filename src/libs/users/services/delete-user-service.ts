import { BASE_URL, httpClient } from "../../../http-client";
import { DeleteUserRequestType } from "../models";

export const deleteUserService = async ({ userId }: DeleteUserRequestType) => {
  const url = `${BASE_URL}/delete_user`;
  const config = {
    data: {
      id: userId,
    },
  };

  const response = await httpClient({}).delete({ url, config });

  return response.data;
};
