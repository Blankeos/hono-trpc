import { trpcClient } from "../../lib/trpcClient";
import { createDehydratedState } from "../../lib/createDehydratedState";

export { data };
export type Data = Awaited<ReturnType<typeof data>>;

async function data() {
  const prefetchQueries: Parameters<typeof createDehydratedState>["0"] = [
    {
      queryKey: ["userList"],
      queryFn: async () => {
        const response = await trpcClient.userList.query();
        return response;
      },
    },
    {
      queryKey: ["userById", "1"],
      queryFn: async () => {
        const response = await trpcClient.userById.query("1");
        return response;
      },
    },
    {
      queryKey: ["userByIdOrName", "Carlo", "1"],
      queryFn: async () => {
        const response = await trpcClient.userByIdOrName.query({
          id: "1",
          name: "Carlo",
        });
        return response;
      },
    },
  ];

  return {
    dehydratedState: await createDehydratedState(prefetchQueries),
  };
}
