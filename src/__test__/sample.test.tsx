import { api } from "../utils/api";
import { renderWithProviders, trpcMsw } from "./setup";
import { screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

function Greeting() {
  const query = api.example.hello.useQuery({ text: "foo" });
  return <div>{query.data?.greeting ?? "Loading..."}</div>;
}

describe("Greeting", () => {
  const server = setupServer(
    trpcMsw.example.hello.query((req, res, ctx) => {
      const input = req.getInput();
      console.log("---request:", req);
      return res(
        ctx.status(200),
        ctx.data({
          greeting: `Hello ${input.text}!`,
        })
      );
    })
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it("should render our query", async () => {
    renderWithProviders(<Greeting />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      const greeting = screen.getByText(/foo/i);
      expect(greeting).toBeVisible();
    });
  });
});
