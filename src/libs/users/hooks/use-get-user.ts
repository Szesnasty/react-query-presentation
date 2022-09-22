import { useQuery } from "@tanstack/react-query";
import { getUserService } from "../services/get-user-service";

export const useGetUser = (id: string) => {
  const { isLoading, isError, ...rest } = useQuery(["user", id], () =>
    getUserService({ id })
  );

  return {
    isLoading,
    isError,
    ...rest,
  };
};
