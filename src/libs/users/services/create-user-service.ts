import { BASE_URL, httpClient } from "../../../http-client";

import { CreateUserRequestType } from "../models";

export const createUserService = async ({ body }: CreateUserRequestType) => {
  const url = `${BASE_URL}/add_user`;

  const config = {};

  const response = await httpClient({}).post({ url, body, config });

  return response.data;
};
