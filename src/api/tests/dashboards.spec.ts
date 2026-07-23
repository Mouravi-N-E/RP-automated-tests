import { test, expect } from '@playwright/test';
import { cleanupDashboard, createNewDashboard, getAllDashboards } from '../helpers/dashboardsHelpers';

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
    });

});


// create dashboard happy path

// create dashboard invalid data (existing name?)

// get dashboard by id

// get dashboard id invalid

// update dashboard happy path

// update dashboard invalid data (existing name?)

// delete dashboard happy path

// delete dashboard invalid id

// add widget to dashboard happy path

// remove widget from dashboard happy path