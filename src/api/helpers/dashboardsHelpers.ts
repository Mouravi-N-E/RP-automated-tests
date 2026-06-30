import { APIRequestContext } from '@playwright/test';

export async function cleanupDashboard(dashboardId: string, projectName: string, request: APIRequestContext) {
    const response = await request.delete(`${process.env.BASE_URL}/api/v1/${projectName}/dashboard/${dashboardId}`, {
    headers: {
      Authorization: `Bearer ${process.env.JWT_TOKEN}`,
        }
    });

  if (response.status() !== 200) {
    throw new Error(`Failed to delete dashboard. Status code: ${response.status()}`);
  }

  const responseData = await response.json();
  return responseData;
}
