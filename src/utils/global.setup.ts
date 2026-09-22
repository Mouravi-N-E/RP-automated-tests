import { test as setup } from '@playwright/test';
import { getJWTToken } from './apiAuth';

setup('getApiToken', async ({ request }) => {
  const jwtToken = await getJWTToken(request, {isAdmin: true});
  process.env.JWT_TOKEN = jwtToken;
}); 
