## Description of Error

After upgrading `@clerk/nextjs` from version 6.9.15 to 6.10.1, server actions started failing on `await currentUser()` with the following error:

```
 ⨯ Error: Clerk: Unable to decrypt request data, this usually means the encryption key is invalid. Ensure the encryption key is properly set. For more information, see: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys. (code=encryption_key_invalid)
    at v (.next/server/chunks/85.js:33:677)
    at y (.next/server/chunks/85.js:33:639)
    at l (.next/server/chunks/85.js:17:32492)
    at <unknown> (.next/server/chunks/85.js:15:30598)
    at <unknown> (.next/server/chunks/85.js:15:30225)
    at k (.next/server/chunks/85.js:15:31759)
    at async m (.next/server/app/page.js:1:32973)
    at async h (.next/server/app/page.js:1:33057) {
  digest: '689539690'
}
```

### Implementation-specific Details

- Instead of using `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, I have an environment variable called `CLERK_PUBLISHABLE_KEY` that I pass to `<ClerkProvider>` and `clerkMiddleware` at runtime (this is so I can use the same docker image with both test and live keys).
- This error did not happen when using the default environment variables instead of passing them at runtime as described above.

### Replication Instructions

1. Add your clerk keys to `.env.local`. Note: the publishable key should be called `CLERK_PUBLISHABLE_KEY` not `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`.

```
CLERK_PUBLISHABLE_KEY=pk_***
CLERK_SECRET_KEY=sk_***

```

2. Generate a `CLERK_ENCRYPTION_KEY` and add it to `.env.local`:

```bash
echo CLERK_ENCRYPTION_KEY=$(openssl rand -base64 32) >> .env.local
```

3. Create a production build (error not seen in development mode)

```bash
npm run build
```

4. Run and try to load the page

```bash
npm run start
```

### Expected Error

When I attempt to load the page I get an error in the server component render. It errors out on the line:

```ts
const user = await currentUser();
```

With the following error message (on the server):

```
 ⨯ Error: Clerk: Unable to decrypt request data, this usually means the encryption key is invalid. Ensure the encryption key is properly set. For more information, see: https://clerk.com/docs/references/nextjs/clerk-middleware#dynamic-keys. (code=encryption_key_invalid)
    at v (.next/server/chunks/85.js:33:677)
    at y (.next/server/chunks/85.js:33:639)
    at l (.next/server/chunks/85.js:17:32492)
    at <unknown> (.next/server/chunks/85.js:15:30598)
    at <unknown> (.next/server/chunks/85.js:15:30225)
    at k (.next/server/chunks/85.js:15:31759)
    at async m (.next/server/app/page.js:1:32973)
    at async h (.next/server/app/page.js:1:33057) {
  digest: '689539690'
}
```

This happens whether or not you are logged in.
