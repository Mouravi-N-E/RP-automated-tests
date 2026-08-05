import { test, expect } from '../fixtures/dashboardsPageFixture';
import { LoginPage } from '../pages/loginPage';
import { NavBar } from '../components/navBar';
import { cleanupDashboard } from '../../api/helpers/dashboardsHelpers';

test.describe('Dashboards page tests', () => {
    let navBar: NavBar;
    const newDashIds: string[] = [];
    const projectName = 'MENTORING-PROJECT';
    test.beforeEach(async ({ page }) => {
        navBar = new NavBar(page);
        const loginPage = new LoginPage(page);
        await loginPage.goto();

        await loginPage.loginWithCredentials({isAdmin: true});
        await navBar.openProject(projectName);
    });

    test.afterAll(async () => {
        for (const dashboardId of newDashIds) {
            await cleanupDashboard(dashboardId, projectName.toLowerCase());
        }
    });

    test('Open Demo Dashboard page', {
        tag: '@Smoke'
    }, async ({ page }) => {
        expect(page.url()).toContain('/dashboard');
    });

    test('Demo dashboard can be found in the table', async ({ dashboardsPage }) => {
        await dashboardsPage.searchDashboard('Demo Dashboard');

        const dashboardsInView = await dashboardsPage.getDashboardsInTable();
        expect(dashboardsInView).toContain('DEMO DASHBOARD');
    });

    test('Add new dashboard', async ({ dashboardsPage }) => {
        const dashboardName = 'Test Dashboard';
        const { dashboardId } = await dashboardsPage.addNewDashboard(dashboardName, 'This is a test dashboard');
        if (dashboardId) {
            newDashIds.push(dashboardId)
        }
        await navBar.openDashboards();
        await dashboardsPage.searchDashboard(dashboardName);

        const dashboardsInView = await dashboardsPage.getDashboardsInTable();
        expect(dashboardsInView).toContain(dashboardName);
    });

    test('Add new dashboard then delete', async ({ dashboardsPage }) => {
        const dashboardName = 'Test Dashboard';
        const { dashboardId } = await dashboardsPage.addNewDashboard(dashboardName, 'This is a test dashboard');
        if (dashboardId) {
            newDashIds.push(dashboardId)
        }
        await navBar.openDashboards();
        await dashboardsPage.searchDashboard(dashboardName);

        await dashboardsPage.deleteDashboard(dashboardName);

        const dashboardsInView = await dashboardsPage.getDashboardsInTable();
        expect(dashboardsInView).not.toContain(dashboardName);
        newDashIds.pop();
    });

    test('Edit Dashboard Name and description', async ({ dashboardsPage }) => {
        const dashboardName = 'Editable Dash';
        const newDashName = 'New Name';
        const dashDescription = 'New description for dash'
        const { dashboardId } = await dashboardsPage.addNewDashboard(dashboardName, 'This is a test dashboard');
        if (dashboardId) {
            newDashIds.push(dashboardId)
        }
        await navBar.openDashboards();

        await dashboardsPage.editDashBoard(dashboardName, newDashName, dashDescription )

        // implement validation here 

    });
})
