import { screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Greeting } from "./greeting";
import { renderWithProviders, trpcMsw } from "../__test__/setup";

describe("Greeting", () => {
  const server = setupServer(
    trpcMsw.example.hello.query((req, res, ctx) => {
      const input = req.getInput();
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
      const greeting = screen.getByText(/Hello from tRPC/i);
      expect(greeting).toBeVisible();
    });
  });
});
