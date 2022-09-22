import { BASE_URL, httpClient } from "../../../http-client";
import { GetUserServiceRequest } from "../models";

export const getUserService = async ({ id }: GetUserServiceRequest) => {
  const url = `${BASE_URL}/users/${id}`;
  const config = {};

  const response = await httpClient({}).get<any>({ url, config });

  return response.data;
};
