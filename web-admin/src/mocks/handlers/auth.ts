import { AUTH_COOKIE, authenticate, networkDelay, requireAuth } from '../utils';
import Cookies from 'js-cookie';
import { http, HttpResponse } from 'msw';

type LoginBody = {
  email: string;
  password: string;
};

// todo: move API_URL to constants.ts
export const authHandlers = [
  http.post(
    `${import.meta.env.VITE_API_URL}/auth/login`,
    async ({ request }) => {
      await networkDelay();

      try {
        const credentials = (await request.json()) as LoginBody;
        const result = authenticate(credentials);

        // todo: remove once tests in Github Actions are fixed
        Cookies.set(AUTH_COOKIE, result.jwt, { path: '/' });

        return HttpResponse.json(result, {
          headers: {
            // with a real API servier, the token cookie should also be Secure and HttpOnly
            'Set-Cookie': `${AUTH_COOKIE}=${result.jwt}; Path=/;`,
          },
        });
      } catch (error: any) {
        return HttpResponse.json(
          { message: error?.message || 'Server Error' },
          { status: 500 }
        );
      }
    }
  ),

  http.post(`${import.meta.env.VITE_API_URL}/auth/logout`, async () => {
    await networkDelay();

    // todo: remove once tests in Github Actions are fixed
    Cookies.remove(AUTH_COOKIE);

    return HttpResponse.json(
      { message: 'Logged out' },
      {
        headers: {
          'Set-Cookie': `${AUTH_COOKIE}=; Path=/;`,
        },
      }
    );
  }),

  http.get(`${import.meta.env.VITE_API_URL}/auth/me`, async ({ cookies }) => {
    await networkDelay();

    try {
      const { user } = requireAuth(cookies);
      return HttpResponse.json({ data: user });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 }
      );
    }
  }),
];
