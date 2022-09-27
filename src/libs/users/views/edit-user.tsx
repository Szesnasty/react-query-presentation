import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";

import { useHistory, useLocation } from "react-router";
import { useEditUser } from "../hooks/use-edit-user";
import { useGetUser } from "../hooks/use-get-user";

export const EditUser = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const history = useHistory();
  const { data } = useGetUser(
    location.pathname.split("/")[location.pathname.split("/").length - 1]
  );

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
    }
  }, [location, data]);

  const { mutate, isSuccess } = useEditUser();

  useEffect(() => {
    if (isSuccess) {
      queryClient.removeQueries(["users"]);
      queryClient.setQueryData(
        [
          "user",
          location.pathname.split("/")[location.pathname.split("/").length - 1],
        ],
        { name: name, email: email }
      );
      history.push(`/`);
    }
  }, [
    data,
    data,
    email,
    history,
    isSuccess,
    location.pathname,
    name,
    queryClient,
  ]);

  const handleEdit = (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    mutate({
      body: {
        id,
        email,
        name,
      },
    });
  };

  return (
    <div>
      <form
        className="add-user-form"
        onSubmit={(e) =>
          handleEdit(
            e,
            location.pathname.split("/")[
              location.pathname.split("/").length - 1
            ]
          )
        }
      >
        <h1 className="add-user-header">Edit user</h1>
        <input
          className="input-form"
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={"name"}
          type={"text"}
          placeholder={"name"}
        />
        <input
          className="input-form"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"name"}
          type={"text"}
          placeholder={"email"}
        />
        <button className="primary-btn" type={"submit"}>
          Edit
        </button>
      </form>
    </div>
  );
};
