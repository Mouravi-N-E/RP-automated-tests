import { APIRequestContext } from '@playwright/test';

export async function getJWTToken(request: APIRequestContext, admin: boolean = false): Promise<string> {  
    const tokenResponse = await request.post(`${process.env.BASE_URL}/uat/sso/oauth/token`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from('ui:uiman').toString('base64')}`,
    },
    form: {
      grant_type: 'password',
      username: admin ? process.env.LOGIN_ADMIN! : process.env.LOGIN_DEFAULT!,
      password: admin ? process.env.PASSWORD_ADMIN! : process.env.PASSWORD_DEFAULT!,
    },
  });

  if (tokenResponse.status() !== 200) {
    throw new Error(`Failed to get JWT token. Status code: ${tokenResponse.status()}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}
