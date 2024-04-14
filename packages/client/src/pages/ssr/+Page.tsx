import { hydrate, useQueryClient } from "@tanstack/solid-query";
import { useData } from "vike-solid/useData";
import { Data } from "./+data";
import { Example } from "../../components/Example";

export default function SSRPage() {
  const data = useData<Data>();
  const queryClient = useQueryClient();
  hydrate(queryClient, data.dehydratedState);

  return <Example header="Has SSR" />;
}
