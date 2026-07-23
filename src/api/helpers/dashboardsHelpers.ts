import { APIRequestContext, request } from '@playwright/test';
import type { AllDashboardsData } from '../models/getAllDashboardsModel';
import type { CreateDashboardResponse } from '../models/createDashboardsResponse';

let apiRequest: APIRequestContext;
(async () => {
  apiRequest = await request.newContext({
    baseURL: process.env.BASE_URL,
  });
})();

export async function cleanupDashboard(dashboardId: string, projectName: string) {
    const response = await apiRequest.delete(`/api/v1/${projectName}/dashboard/${dashboardId}`, {
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

export async function getAllDashboards(projectName: string,): Promise<AllDashboardsData> {
    const response = await apiRequest.get(`/api/v1/${projectName}/dashboard`, {
        headers: {
            Authorization: `Bearer ${process.env.JWT_TOKEN}`,
        },
    });
    if (response.status() !== 200) {
        throw new Error(`Failed to get dashboards. Status code: ${response.status()}`);
    }

    const responseData = await response.json();
    return responseData;
}

export async function createNewDashboard(projectName: string, dashboardName: string, description: string): Promise<CreateDashboardResponse> {
    const response = await apiRequest.post(`/api/v1/${projectName}/dashboard`, {
        headers: {
            Authorization: `Bearer ${process.env.JWT_TOKEN}`,
        },
        data: {
            name: dashboardName,
            description: description,
        },
    });
    const responseData: CreateDashboardResponse = await response.json();
    if (response.status() !== 201) {
        throw new Error(`Failed to create dashboard. Error Message: ${(await response.json()).message}`);
    }

    return responseData;
}
