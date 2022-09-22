import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDeleteUser } from "../hooks/use-delete-user";
import { useGetUsers } from "../hooks/use-get-users";
import { CreateUser } from "./create-user";

export const UsersList = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const { data, isLoading, isFetching } = useGetUsers({
    pageIndex,
    pageSize: 2,
    queryOptions: { keepPreviousData: true },
  });
  const queryClient = useQueryClient();
  const { mutate, isSuccess } = useDeleteUser();

  let history = useHistory();

  function handleEdit(id: number) {
    history.push(`/edit/${id}`);
  }

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(["users"]);
    }
  }, [isSuccess, pageIndex, queryClient]);

  console.log(isFetching);
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
                    <b>{user.name}</b> {user.email}{" "}
                    <div className="buttons-container">
                      <button onClick={() => mutate({ userId: user.id })}>
                        Remove
                      </button>

                      <button onClick={() => handleEdit(user.id)}>Edit</button>
                    </div>
                  </div>
                );
              })}
            </div>
            {isFetching && <p>Loadinggggg...</p>}
          </>
        )}
        {data?.users?.length > 0 && (
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
