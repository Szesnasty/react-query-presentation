import { useQueryClient } from "@tanstack/react-query";

export const Cache = () => {
  const cacheUsers = useQueryClient().getQueriesData<any>(["users"]);

  return (
    <>
      <div className="users-container">
        {
          <>
            <div className="list">
              <div>
                {cacheUsers.map((cache) =>
                  cache[1]?.users?.map((user: any) => {
                    return (
                      <div className="list-item" key={user.id}>
                        <b>{user.name}</b> {user.email}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </>
        }
      </div>
    </>
  );
};
