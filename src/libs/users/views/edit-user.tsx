import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";

import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";

import { useGetUser } from "../hooks/use-get-user";
import { EditUserRequestType } from "../models";
import { editUserService } from "../services/edit-user-services";

export const EditUser = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const history = useHistory();
  const { data, isLoading: isLoadingUser } = useGetUser(
    location.pathname.split("/")[location.pathname.split("/").length - 1]
  );

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
    }
  }, [location, data]);

  const { mutate, isLoading } = useMutation<
    any,
    AxiosError,
    EditUserRequestType,
    unknown
  >(editUserService, {
    onSuccess: () => {
      // queryClient.removeQueries(["users"]);
      // queryClient.setQueryData(
      //   [
      //     "user",
      //     location.pathname.split("/")[location.pathname.split("/").length - 1],
      //   ],
      //   { name: name, email: email }
      // );
      toast("User edited!", { type: "success" });

      history.push(`/`);
    },
  });

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

  if (isLoading || isLoadingUser) {
    return <p>Loading</p>;
  }

  return email && name ? (
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
          required
          className="input-form"
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={"name"}
          type={"text"}
          placeholder={"name"}
        />
        <input
          required
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
  ) : null;
};
