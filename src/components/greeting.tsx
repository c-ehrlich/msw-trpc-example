import { api } from "../utils/api";

export function Greeting() {
  const query = api.example.hello.useQuery({ text: "from tRPC" });
  return <h1>{query.data?.greeting ?? "Loading..."}</h1>;
}
