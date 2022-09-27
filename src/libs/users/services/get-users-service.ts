import { AxiosResponse } from "axios";
import { BASE_URL, httpClient } from "../../../http-client";
import { GetUsersResponse, GetUsersServiceRequest } from "../models";

export const getUsersService = async ({
  pageIndex,
  pageSize,
}: GetUsersServiceRequest) => {
  const url = `${BASE_URL}/users?pageIndex=${pageIndex}&pageSize=${pageSize}`;
  const config = {};

  const response = await httpClient({}).get<AxiosResponse<GetUsersResponse>>({
    url,
    config,
  });

  return response.data;
};
