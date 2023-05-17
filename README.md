# Example for mocking a tRPC API endpoint with `msw-trpc`

This repo contains a Next.js app using tRPC, and a unit test for a component that uses Mock Service Worker with `msw-trpc` to intercept network requests.

It is reduced to the bare minimum to focus only on the msw testing setup, and should not be used as a reference on how to build an entire app.

The files you'll probably want to look at are:
- `vitest.config.ts` is a minimal Vitest config
- `src/__test__/setup.tsx` creates our mocked tRPC client and a function to render components with the required providers
- `src/components/greeting.tsx` exports the Greeting component that we are testing
- `src/components/greeting.test.tsx` tests our Greeting component

To get started:
```
pnpm i
pnpm test
```

resources:
- [msw-trpc](https://github.com/maloguertin/msw-trpc)

TODO: 
- some imports are not using `~` because vitest couldn't traverse the import alias for some reason. fix this.

PRs welcome. Open an issue first if you're not sure, or contact me on twitter/discord/etc.