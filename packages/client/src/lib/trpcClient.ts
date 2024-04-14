import { createTRPCProxyClient, httpBatchLink, httpLink } from "@trpc/client";
import type { AppRouter } from "server/src/routes/_app";

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    // httpLink({
    //   url: "http://localhost:4001/trpc",
    // }),
    httpBatchLink({
      url: "http://localhost:4001/trpc",
      // You can pass any HTTP headers you wish here
      // async headers() {
      //   return {
      //     authorization: getAuthCookie(),
      //   };
      // },
    }),
  ],
});
