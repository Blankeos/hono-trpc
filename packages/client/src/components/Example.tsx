import { createMutation, createQuery } from "@tanstack/solid-query";
import { trpcClient } from "../lib/trpcClient";
import { createSignal, Show } from "solid-js";

export function Example(props: { header: string }) {
  // User List
  const userListQuery = createQuery(() => ({
    queryKey: ["userList"],
    queryFn: async () => {
      const response = await trpcClient.userList.query();

      return response;
    },
  }));

  // User By Id
  const [userByIdInput, setUserByIdInput] = createSignal("1");

  const userByIdQuery = createQuery(() => ({
    queryKey: ["userById", userByIdInput()],
    queryFn: async () => {
      const response = await trpcClient.userById.query(userByIdInput());

      return response;
    },
  }));

  // User By Name or Id
  const [queryByNameInput, setQueryByNameInput] = createSignal("Carlo");
  const [queryByIdInput, setQueryByIdInput] = createSignal("1");

  const userByIdOrNameQuery = createQuery(() => ({
    queryKey: ["userByIdOrName", queryByNameInput(), queryByIdInput()],
    queryFn: async () => {
      let name: string | undefined;
      let id: string | undefined;

      if (queryByIdInput() && queryByIdInput() !== "") {
        id = queryByIdInput();
      }
      if (queryByNameInput() && queryByNameInput() !== "") {
        name = queryByNameInput();
      }

      const response = await trpcClient.userByIdOrName.query({
        id: id,
        name: name,
      });

      return response;
    },
  }));

  // User Create
  const [userCreateInput, setUserCreateInput] = createSignal("");
  const userCreateMutation = createMutation(() => ({
    mutationKey: ["createUser"],
    mutationFn: async ({ name }: { name: string }) => {
      const response = await trpcClient.userCreate.mutate({
        name: name,
      });

      return response;
    },
    onSuccess: () => {
      userListQuery.refetch();
      userByIdQuery.refetch();
    },
  }));

  return (
    <>
      <h1>{props.header}</h1>

      <hr />

      <div>UserList</div>
      <Show when={userListQuery.isLoading}>
        <pre>Loading...</pre>
      </Show>
      <Show when={userListQuery.data} fallback={<pre>No users found.</pre>}>
        <pre>{JSON.stringify(userListQuery.data, null, 2)}</pre>
      </Show>

      <hr />

      <div>UserById | ID: {userByIdInput()}</div>
      <input
        value={userByIdInput()}
        onInput={(e) => setUserByIdInput(e.target.value)}
      />
      <Show when={userByIdQuery.isLoading}>
        <pre>Loading...</pre>
      </Show>
      <Show
        when={userByIdQuery.data}
        fallback={<pre>No user by {userByIdInput()} found.</pre>}
      >
        <pre>{JSON.stringify(userByIdQuery.data, null, 2)}</pre>
      </Show>

      <hr />

      <div>
        UserByIdOrName | ID: {queryByIdInput()} | Name: {queryByNameInput()}
      </div>
      <label>ID </label>
      <input
        value={queryByIdInput()}
        onInput={(e) => setQueryByIdInput(e.target.value)}
      />
      <br />
      <label>Name </label>
      <input
        value={queryByNameInput()}
        onInput={(e) => setQueryByNameInput(e.target.value)}
      />

      <Show when={userByIdOrNameQuery.isLoading}>
        <pre>Loading...</pre>
      </Show>
      <Show
        when={userByIdOrNameQuery.data}
        fallback={<pre>No user found.</pre>}
      >
        <pre>{JSON.stringify(userByIdOrNameQuery.data, null, 2)}</pre>
      </Show>

      <hr />

      <div>CreateUser</div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          await userCreateMutation.mutateAsync({
            name: userCreateInput(),
          });
        }}
      >
        <label id="name">Name </label>
        <input
          value={userCreateInput()}
          onInput={(e) => setUserCreateInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <pre>{JSON.stringify(userCreateMutation.data, null, 2)}</pre>
    </>
  );
}
