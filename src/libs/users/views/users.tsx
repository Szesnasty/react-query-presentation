import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
// import { useDeleteUser } from "../hooks/use-delete-user";
// import { useGetUsers } from "../hooks/use-get-users";
import { CreateUser } from "./create-user";
import { MdDelete, MdEdit } from "react-icons/md";
import { getUsersService } from "../services/get-users-service";
import { AxiosError } from "axios";
import { GetUsersResponse } from "../models";
import { deleteUserService } from "../services/delete-user-service";

export const UsersList = () => {
  const [pageIndex, setPageIndex] = useState(0);

  const { isLoading, data, isError, error } = useQuery<
    GetUsersResponse,
    AxiosError
  >(["users", pageIndex], async () =>
    getUsersService({ pageIndex, pageSize: 2 })
  );

  const queryClient = useQueryClient();

  const { mutate, isSuccess, reset } = useMutation(deleteUserService);

  let history = useHistory();

  const handleEdit = (id: number) => {
    history.push(`/edit/${id}`);
  };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(["users"]);
      toast("User removed!", { type: "success", autoClose: 2000 });
      reset();
    }
  }, [isSuccess, queryClient, reset]);

  if (isError && error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <CreateUser />
      <div className="users-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="list">
              {data?.users.map((user: any) => {
                return (
                  <div className="list-item" key={user.id}>
                    <b>{user.name}</b> {user.email}
                    <div className="buttons-container">
                      <button
                        className="icon-btn"
                        onClick={() => mutate({ userId: user.id })}
                      >
                        <MdDelete className="icon" />
                      </button>

                      <button
                        className="icon-btn"
                        onClick={() => handleEdit(user.id)}
                      >
                        <MdEdit className="icon" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {data && data?.users?.length > 0 && (
          <div className="pagination-panel">
            <button
              disabled={!data?.table[0].prev}
              onClick={() =>
                setPageIndex((prevNum) =>
                  data.table[0].prev ? prevNum - 1 : prevNum
                )
              }
            >
              Prev
            </button>
            <button
              disabled={!data?.table[0].next}
              onClick={() =>
                setPageIndex((prevNum) =>
                  data.table[0].next ? prevNum + 1 : prevNum
                )
              }
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};
