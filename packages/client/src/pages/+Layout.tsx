import { createMemo, type JSXElement } from "solid-js";
import solidLogo from "./assets/solid.svg";
import viteLogo from "/vite.svg";
import {
  QueryClient,
  QueryClientProvider,
  hydrate,
} from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";

import "../index.css";

function App(props: { children: JSXElement }) {
  const clientQuery = new QueryClient();

  return (
    <QueryClientProvider client={clientQuery}>
      <SolidQueryDevtools />
      {props.children}
    </QueryClientProvider>
  );
}

export default App;
