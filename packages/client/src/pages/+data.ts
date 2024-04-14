export { data };

import { QueryClient } from "@tanstack/solid-query";

export type Data = Awaited<ReturnType<typeof data>>;

async function data() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: typeof window !== "undefined",
        staleTime: Infinity,
        retryDelay: 2000,
      },
    },
  });

  return {
    queryClient,
  };
}
