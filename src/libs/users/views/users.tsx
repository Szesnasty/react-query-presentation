import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDeleteUser } from "../hooks/use-delete-user";
import { useGetUsers } from "../hooks/use-get-users";

export const UsersList = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const { data, isLoading } = useGetUsers({
    pageIndex,
    pageSize: 2,
    queryOptions: {},
  });
  const queryClient = useQueryClient();
  const { mutate, isSuccess, variables } = useDeleteUser();

  let history = useHistory();

  function handleEdit(id: number) {
    history.push(`/edit/${id}`);
  }

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(["users"]);
    }
  }, [isSuccess, pageIndex, queryClient]);

  return (
    <div className="users-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
      )}
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
  );
};
