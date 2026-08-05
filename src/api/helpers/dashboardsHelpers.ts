import { APIRequestContext, request } from '@playwright/test';
import type { AllDashboardsDataResponse} from '../models/getAllDashboardsModelResponse';
import type { CreateDashboardResponse } from '../models/createDashboardsResponse';
import { UpdateDashboardRequest } from '../models/updateDashboardRequest';
import { GetDashboardResponse } from '../models/getDashboardResponse';
import { addWidgetToDashboardRequest } from '../models/addWidgetToDash';

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

export async function getAllDashboards(projectName: string,): Promise<AllDashboardsDataResponse> {
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

export async function getDashboardById(projectName: string, dashboardId: string): Promise<GetDashboardResponse> {
    const response = await apiRequest.get(`/api/v1/${projectName}/dashboard/${dashboardId}`, {
        headers: {
            Authorization: `Bearer ${process.env.JWT_TOKEN}`,
        },
    });
    if (response.status() !== 200) {
        throw new Error(`Failed to get dashboard. Error Message: ${(await response.json()).message}`);
    }

    const responseData = await response.json();
    return responseData;
}

export async function createNewDashboard(projectName: string, dashboardName: string, description?: string): Promise<CreateDashboardResponse> {
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

export async function updateDashboard(projectName: string, dashboardId: string, updateData: UpdateDashboardRequest): Promise<CreateDashboardResponse> {
    const response = await apiRequest.put(`/api/v1/${projectName}/dashboard/${dashboardId}`, {
        headers: {
            Authorization: `Bearer ${process.env.JWT_TOKEN}`,
        },
        data: updateData,
    });
    if (response.status() !== 200) {
        throw new Error(`Failed to update dashboard. Error Message: ${(await response.json()).message}`);
    }
    const responseData: CreateDashboardResponse = await response.json();
    return responseData;
}

export async function addWidgetToDashboard(projectName: string, dashboardId: string, widgetData: addWidgetToDashboardRequest): Promise<void> {
    const response = await apiRequest.put(`/api/v1/${projectName}/dashboard/${dashboardId}/add`, {
        headers: {
            Authorization: `Bearer ${process.env.JWT_TOKEN}`,
        }, 
        data: widgetData,
    });
    if (response.status() !== 200) {
        throw new Error(`Failed to add widget to dashboard. Error Message: ${(await response.json()).message}`);
    }
}
