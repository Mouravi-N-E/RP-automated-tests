import { APIRequestContext } from '@playwright/test';

export async function getJWTToken(request: APIRequestContext, options: { username?: string; password?: string; isAdmin?: boolean } = {}): Promise<string> {
  if (options.isAdmin) {
    options.username = process.env.LOGIN_ADMIN!;
    options.password = process.env.PASSWORD_ADMIN!;
  }
  if (!options.username || !options.password) {
    options.username = process.env.LOGIN_DEFAULT!;
    options.password = process.env.PASSWORD_DEFAULT!;
  }

  const { username, password } = options;
  const tokenResponse = await request.post(`${process.env.BASE_URL}/uat/sso/oauth/token`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from('ui:uiman').toString('base64')}`,
    },
    form: {
      grant_type: 'password',
      username,
      password,
    },
  });

  if (tokenResponse.status() !== 200) {
    throw new Error(`Failed to get JWT token. Status code: ${tokenResponse.status()}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}
