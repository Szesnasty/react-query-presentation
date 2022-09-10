import axios from "axios";
import { HttpClientParams, HttpRequestParams } from "../models";

export const httpClient = <T>({ params }: HttpClientParams<T>) => {
  const axiosInstance = axios.create({ params });

  return {
    axiosInstance,
    get: async <T>({ url, config }: HttpRequestParams): Promise<T> =>
      await axiosInstance.get(url, config),
    post: async ({ url, body, config }: HttpRequestParams) =>
      await axiosInstance.post(url, body, config),
    put: async ({ url, body, config }: HttpRequestParams) =>
      await axiosInstance.put(url, body, config),
    patch: async ({ url, body, config }: HttpRequestParams) =>
      await axiosInstance.patch(url, body, config),
    delete: async ({ url, config }: HttpRequestParams) =>
      await axiosInstance.delete(url, config),
  };
};
