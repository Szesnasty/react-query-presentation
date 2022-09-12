import { useQuery } from "@tanstack/react-query";
import { UseGetUsersProps } from "../models";
import { getUsersService } from "../services/get-users-service";

export const useGetUsers = ({
  pageIndex = 0,
  pageSize = 5,
  queryOptions,
}: UseGetUsersProps) => {
  const { isLoading, isError, ...rest } = useQuery(
    ["users", pageIndex, pageSize],
    () => getUsersService({ pageIndex, pageSize }),
    { ...queryOptions }
  );

  return {
    isLoading,
    isError,
    ...rest,
  };
};
