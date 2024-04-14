import { type JSXElement } from "solid-js";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";

import "../index.css";
import "../nprogress.css";

function App(props: { children: JSXElement }) {
  const queryClient = new QueryClient();

  return (
    <div>
      <ul>
        <li>
          <a href="/">Home (No SSR)</a>
        </li>
        <li>
          <a href="/ssr">SSR (Has server-side-rendering)</a>
        </li>
      </ul>
      <hr />
      <QueryClientProvider client={queryClient}>
        <SolidQueryDevtools />
        {props.children}
      </QueryClientProvider>
    </div>
  );
}

export default App;
