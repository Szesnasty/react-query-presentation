import { useState } from "react";
import { useCreateUser } from "../hooks/use-create-user";

export const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { mutate, isLoading, isError, error } = useCreateUser({});

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate({ body: { name, email } });
  };

  return (
    <>
      {isLoading && <h2>Loading...</h2>}
      {isError && <h2>{error?.message}</h2>}
      <div>
        <h1>Create user</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            name={"name"}
            type={"text"}
            placeholder={"name"}
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"name"}
            type={"text"}
            placeholder={"email"}
          />
          <button type={"submit"}>Add</button>
        </form>
      </div>
    </>
  );
};
