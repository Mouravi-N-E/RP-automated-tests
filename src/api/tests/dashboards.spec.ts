import { test, expect } from '@playwright/test';
import { cleanupDashboard, createNewDashboard, getAllDashboards, getDashboardById } from '../helpers/dashboardsHelpers';
import { ErrorMessages } from '../models/errorMessages/dashboardEndpointErrors';

test.describe('Dashboards API Tests', () => {
    const newDashIds: string[] = [];
    const projectName = 'MENTORING-PROJECT';

    test.afterAll(async () => {
        for (const dashboardId of newDashIds) {
            await cleanupDashboard(dashboardId, projectName.toLowerCase());
        }
    });

    test.describe('/dashboard endpoint tests', () => {
        test('Get dashboards', async () => {
            const dashboards = await getAllDashboards(projectName.toLowerCase());
            console.log('Dashboards:', dashboards.content[0].name);
            expect(dashboards.content.length).toBeGreaterThan(0);
        });

        test('Create dashboard', async () => {
            const dashboardResponse = await createNewDashboard(projectName.toLowerCase(), 'New Dashboard', 'Dashboard created via API test');
            const dashboardId = dashboardResponse.id;
            newDashIds.push(dashboardId!);

            expect(dashboardResponse.id).toBeDefined();
        });

        test('Create dashboard with existing name should fail', async () => {
            const dashName = 'Existing Dashboard';
            const dashboardId = (await createNewDashboard(projectName.toLowerCase(), dashName)).id;
            newDashIds.push(dashboardId!);
            const errorData = await createNewDashboard(projectName.toLowerCase(), dashName).catch(e => e);
            expect(errorData.message).toContain(ErrorMessages.existingDashboardName(dashName));
        });
    });

    test.describe('/dashboard/:id endpoint tests', () => {
        let dashboardId: string;
        let dashName: string;
        test.beforeAll(async () => {
            dashName = 'Dashboard for ID Tests';
            dashboardId = (await createNewDashboard(projectName.toLowerCase(), dashName)).id!;
            newDashIds.push(dashboardId);
        });
        test('Get dashboard by ID', async () => {
            const response = await getDashboardById(projectName.toLowerCase(), dashboardId);
            expect(response.id).toBe(dashboardId);
            expect(response.name).toBe(dashName);
        });

        test('Get dashboard with invalid number ID should fail', async () => {
            const invalidDashboardId = 'invalid-id';
            const errorData = await getDashboardById(projectName.toLowerCase(), invalidDashboardId).catch(e => e);
            expect(errorData.message).toContain(ErrorMessages.invalidTypeDashId(invalidDashboardId));
        });

        test('Get dashboard with non-existing ID should fail', async () => {
            const invalidDashboardId = '3';
            const errorData = await getDashboardById(projectName.toLowerCase(), invalidDashboardId).catch(e => e);
            expect(errorData.message).toContain(ErrorMessages.invalidDashboardId(invalidDashboardId));
        });
    });

    test.describe('Dashboard update tests', () => {
        let dashboardId: string;
        let dashName: string;
        test.beforeAll(async () => {
            dashName = 'Dashboard for Update Tests';
            dashboardId = (await createNewDashboard(projectName.toLowerCase(), dashName)).id!;
            newDashIds.push(dashboardId);
        });

        test('Update dashboard happy path', async () => {
            // Implement the update dashboard test here
        });

        test('Update dashboard with invalid data (existing name) should fail', async () => {
            // Implement the update dashboard with existing name test here
        });
    });
});



// delete dashboard happy path

// delete dashboard invalid id

// add widget to dashboard happy path

// remove widget from dashboard happy path
