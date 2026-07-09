import { test, expect } from '../fixtures/dashboardsPageFixture';
import { LoginPage } from '../pages/loginPage';
import { NavBar } from '../pages/navBar';
import { cleanupDashboard } from '../../api/helpers/dashboardsHelpers';

test.describe('Dashboards page tests', () => {
    let navBar: NavBar;
    const newDashIds: string[] = [];
    const projectName = 'MENTORING-PROJECT';

    test.beforeEach(async ({ page }) => {
        // Do you know better way to initialise the page objects?
        navBar = new NavBar(page);
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.loginWithCredentials(process.env.LOGIN_DEFAULT!, process.env.PASSWORD_DEFAULT!);
        await navBar.openProject(projectName);
    });

    test.afterAll(async ({ request }) => {
        for (const dashboardId of newDashIds) {
            await cleanupDashboard(dashboardId, projectName.toLowerCase(), request);
        }
    });

    test('Open Demo Dashboard page',{
    tag: '@Smoke'
    }, async ({ page }) => {
        // REVIEW: URL check is weak and may pass before the dashboard page is fully loaded.
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
        if ( dashboardId ) {
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
        if ( dashboardId ) {
            newDashIds.push(dashboardId) 
        }
        await navBar.openDashboards();
        await dashboardsPage.searchDashboard(dashboardName);

        await dashboardsPage.deleteDashboard(dashboardName);

        const dashboardsInView = await dashboardsPage.getDashboardsInTable();
        expect(dashboardsInView).not.toContain(dashboardName);
        newDashIds.pop();
    });
})
