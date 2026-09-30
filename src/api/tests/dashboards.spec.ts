import { test, expect } from '@playwright/test';
import { cleanupDashboard, createNewDashboard, getAllDashboards, getDashboardById, updateDashboard, addWidgetToDashboard } from '../helpers/dashboardsHelpers';
import { ErrorMessages } from '../models/errorMessages/dashboardEndpointErrors';
import { Widget } from '../models/getAllDashboardsModelResponse';
import path from 'path';
import fs from 'fs';

const variables = path.join(__dirname, '../../playwright/.setup/testVariables.json');

test.describe('Dashboards API Tests', () => {
    const newDashIds: string[] = [];    
    let projectName = (fs.existsSync(variables) ? JSON.parse(fs.readFileSync(variables, 'utf-8')).ProjectName : null);

    test.afterAll(async () => {
        for (const dashboardId of newDashIds) {
            await cleanupDashboard(dashboardId, projectName);
        }
    });

    test.describe('/dashboard endpoint tests', () => {
        test('Get dashboards', async () => {
            const dashboards = await getAllDashboards(projectName);
            console.log('Dashboards:', dashboards.content[0].name);
            expect(dashboards.content.length).toBeGreaterThan(0);
        });

        test('Create dashboard', async () => {
            const dashboardResponse = await createNewDashboard(projectName, 'New Dashboard', 'Dashboard created via API test');
            const dashboardId = dashboardResponse.id;
            newDashIds.push(dashboardId!);

            expect(dashboardResponse.id).toBeDefined();
        });

        test('Create dashboard with existing name should fail', async () => {
            const dashName = 'Existing Dashboard';
            const dashboardId = (await createNewDashboard(projectName, dashName)).id;
            newDashIds.push(dashboardId!);
            const errorData = await createNewDashboard(projectName, dashName).catch(e => e);
            expect(errorData.message).toContain(ErrorMessages.existingDashboardName(dashName));
        });
    });

    test.describe('/dashboard/:id endpoint tests', () => {
        let dashboardId: string;
        let dashName: string;
        test.beforeAll(async () => {
            dashName = 'Dashboard for ID Tests';
            dashboardId = (await createNewDashboard(projectName, dashName)).id!;
            newDashIds.push(dashboardId);
        });
        test('Get dashboard by ID', async () => {
            const response = await getDashboardById(projectName, dashboardId);
            expect(response.id).toBe(dashboardId);
            expect(response.name).toBe(dashName);
        });

        test('Get dashboard with invalid number ID should fail', async () => {
            const invalidDashboardId = 'invalid-id';
            const errorData = await getDashboardById(projectName, invalidDashboardId).catch(e => e);
            expect(errorData.message).toContain(ErrorMessages.invalidTypeDashId(invalidDashboardId));
        });

        test('Get dashboard with non-existing ID should fail', async () => {
            const invalidDashboardId = '3';
            const errorData = await getDashboardById(projectName, invalidDashboardId).catch(e => e);
            expect(errorData.message).toContain(ErrorMessages.invalidDashboardId(invalidDashboardId));
        });
    });

    test.describe('Dashboard update tests', () => {
        let dashboardId: string;
        let dashName: string;
        test.beforeAll(async () => {
            dashName = 'Dashboard for Update Tests';
            dashboardId = (await createNewDashboard(projectName, dashName)).id!;
            newDashIds.push(dashboardId);
        });

        test('Update dashboard happy path', async () => {
            const updatedName = 'Updated Dashboard Name';
            const updatedDescription = 'Updated description for the dashboard';
            const updateResponse = await updateDashboard(projectName, dashboardId, {
                name: updatedName,
                description: updatedDescription,
            });

            expect(updateResponse.message).toBe(`Dashboard with ID = '${dashboardId}' successfully updated`);
            const updatedDashboard = await getDashboardById(projectName, dashboardId);
            expect(updatedDashboard.name).toBe(updatedName);
            expect(updatedDashboard.description).toBe(updatedDescription);
        });

        test('Update dashboard with invalid data (existing name) should fail', async () => {
            const existingDashboardName = 'Existing Dash';
            const existingDashboardId = (await createNewDashboard(projectName, existingDashboardName)).id!;
            newDashIds.push(existingDashboardId);

            const errorData = await updateDashboard(projectName, dashboardId, {
                name: existingDashboardName,
            }).catch(e => e);

            expect(errorData.message).toContain(ErrorMessages.existingDashboardName(existingDashboardName));
        });
    });

    test.describe('Widgets test cases', () => {
        let dashboardId: string;
        let dashName: string;
        test.beforeAll(async () => {
            dashName = 'Dashboard for Widget Tests';
            dashboardId = (await createNewDashboard(projectName, dashName)).id!;
            newDashIds.push(dashboardId);
        });

        test('Add widget to dashboard happy path', async () => {
            const widgetData: Widget = {
                widgetId: 137, //temporary hardcoded value, should be replaced with a valid widget ID once widget api is available
                widgetName: 'Test Widget',
                widgetType: 'chart',
                widgetSize: { width: 4, height: 3 },
                widgetPosition: { positionX: 0, positionY: 0 },
            };

            await addWidgetToDashboard(projectName, dashboardId, {
                addWidget: widgetData,
            });
            const updatedDashboard = await getDashboardById(projectName, dashboardId);
            expect(updatedDashboard.widgets.length).toBe(1);
        });
    });
});

// add widget to dashboard happy path

// remove widget from dashboard happy path
