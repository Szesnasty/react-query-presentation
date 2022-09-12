import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DeleteUserRequestType } from "../models";
import { deleteUserService } from "../services/delete-user-service";

export const useDeleteUser = () => {
  const { mutate, isLoading, isError, isSuccess, data, error, ...rest } =
    useMutation<any, AxiosError, DeleteUserRequestType, unknown>(
      deleteUserService
    );

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
