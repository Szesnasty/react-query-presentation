import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CreateUserRequestType } from "../models";
import { createUserService } from "../services/create-user-service";

type UseCreateUserType = {
  mutationOptions?: MutationOptions<
    any,
    AxiosError,
    CreateUserRequestType,
    unknown
  >;
};

export const useCreateUser = ({ mutationOptions }: UseCreateUserType) => {
  const { mutate, isLoading, isError, isSuccess, data, error, ...rest } =
    useMutation<any, AxiosError, CreateUserRequestType, unknown>(
      createUserService,
      { ...mutationOptions }
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
