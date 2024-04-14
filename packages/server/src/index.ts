import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { appRouter } from "./routes/_app";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  cors({
    // Only frontend is allowed
    origin: ["http://localhost:3000"],
  })
);
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  })
);

/**
 * https://hono.dev/getting-started/bun#change-port-number
 */
export default {
  port: 4001,
  fetch: app.fetch,
};
