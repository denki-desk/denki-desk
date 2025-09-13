# Authentication

## Overview

Authentication in this project is handled at the **routing layer** using TanStack Router. Routes that require a valid session are placed under the `/_authenticated` layout. If the user is not authenticated, they are redirected to the `/sign-in` page.

For **development and QA environments**, authentication is mocked using MSW (Mock Service Worker) with a seeded set of users. This allows login/logout flows to be tested without needing a backend. In **production**, these requests are handled by the real API (`API_URL`).

---

## Authenticated Routes

Authenticated pages are wrapped under the `/_authenticated` file route. Example:

```tsx
import { createFileRoute, redirect } from '@tanstack/react-router';
import { AuthenticatedLayout } from '../../components/layout/authenticated-layout';

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

```

- `beforeLoad` checks `context.auth.isAuthenticated`.
- If the user is not logged in, they are redirected to `/sign-in`.
- The original URL is preserved in the `redirect` query param so that users can return after logging in.

---

## QA Test Users

In QA and development, authentication is mocked using a static seeder:

```tsx
export const users = [
  {
    id: '1',
    email: 'ava.johnson@example.com',
    password: 'password',
    name: 'Ava.johnson',
  },
  {
    id: '2',
    email: 'liam.wilson@example.com',
    password: 'password',
    name: 'Liam.wilson',
  },
];

```

### Test Credentials

- **User 1**
  - Email: `ava.johnson@example.com`
  - Password: `password`
- **User 2**
  - Email: `liam.wilson@example.com`
  - Password: `password`

---

## Login Flow

1. User submits credentials to `/auth/login`.
2. In dev/QA, MSW intercepts this request:
  - Validates against the seeded users.
  - Issues a mock JWT token.
  - Persists the token in a cookie (`AUTH_COOKIE`).
3. After login, TanStack Router updates `context.auth.isAuthenticated` to `true`.

---

## Logout Flow

1. User clicks **Logout**, which calls `/auth/logout`.
2. MSW clears the `AUTH_COOKIE` in dev/QA.
3. Router resets `context.auth.isAuthenticated` and redirects to `/sign-in`.

---

## Session Persistence

- **Cookie-based**: Session is stored in `AUTH_COOKIE`.
- On reload, `/auth/me` verifies the cookie and restores the user session.
- If the cookie is missing or invalid, the user is logged out and redirected when accessing protected routes.

---

## Production Notes

- In production, the `/auth/login`, `/auth/logout`, and `/auth/me` endpoints are handled by the real API.
- Cookies should be marked **Secure** and **HttpOnly** for safety.
- The `/_authenticated` route pattern still applies — only authenticated users will see those pages.

---

## ✅ With this setup:

- **Developers** can work without a backend using MSW.
- **QA testers** can log in with the seeded users.
- **Production** uses the real API but the same route-level guards.
