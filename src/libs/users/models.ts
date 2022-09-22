import { UseQueryOptions } from "@tanstack/react-query";

export type CreateUserRequestType = {
  body: {
    name: string;
    email: string;
  };
};

export type GetUsersServiceRequest = {
  pageSize: number;
  pageIndex: number;
};

export type UseGetUsersProps = {
  pageIndex: number;
  pageSize: number;
  queryOptions?: Omit<
    UseQueryOptions<any, unknown, any, (string | number)[]>,
    "initialData" | "queryFn" | "queryKey"
  > & { initialData?: (() => undefined) | undefined };
};

export type GetUserServiceRequest = {
  id: string;
};

export type DeleteUserRequestType = {
  userId: string;
};

export type EditUserRequestType = {
  body: {
    id: string;
    name: string;
    email: string;
  };
};
