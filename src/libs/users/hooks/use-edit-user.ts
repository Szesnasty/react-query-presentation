import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EditUserRequestType } from "../models";
import { editUserService } from "../services/edit-user-services";

export const useEditUser = () => {
  const { mutate, isLoading, isError, isSuccess, data, error, ...rest } =
    useMutation<any, AxiosError, EditUserRequestType, unknown>(editUserService);

  return {
    mutate,
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    ...rest,
  };
};
