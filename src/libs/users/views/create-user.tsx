import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { CreateUserRequestType } from "../models";
// import { useCreateUser } from "../hooks/use-create-user";
import { createUserService } from "../services/create-user-service";

export const CreateUser = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { mutate, isLoading, isError, error } = useMutation<
    unknown,
    AxiosError,
    CreateUserRequestType,
    unknown
  >(createUserService, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate({ body: { name, email } });
  };

  return (
    <>
      <div>
        {isLoading && <h2>Loading...</h2>}
        {isError && <h2>{error?.message}</h2>}
        <form className="add-user-form" onSubmit={handleSubmit}>
          <h1 className="add-user-header">Create user</h1>
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
            Add
          </button>
        </form>
      </div>
    </>
  );
};
