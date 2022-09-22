import { BASE_URL, httpClient } from "../../../http-client";
import { EditUserRequestType } from "../models";

export const editUserService = async ({ body }: EditUserRequestType) => {
  const url = `${BASE_URL}/edit_user`;
  const config = {};

  const response = await httpClient({}).post({ url, body, config });

  return response.data;
};
