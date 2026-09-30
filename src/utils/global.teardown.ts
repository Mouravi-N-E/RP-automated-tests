import { test as teardown } from '@playwright/test';
import {  deleteProject } from './projectAPI';
import path from 'path';
import fs from 'fs';

const variables = path.join(__dirname, '../playwright/.setup/testVariables.json');

teardown('cleanup auth state', async ({ request }) => {
    const projectId = (fs.existsSync(variables) ? JSON.parse(fs.readFileSync(variables, 'utf-8')).ProjectId : null);
    if (!projectId) {
        console.warn('No project ID found in environment variables. Skipping project deletion.');
        return;
    }else {
        console.log(`Deleting project with ID: ${projectId}`);
    }
    await deleteProject(request, projectId);
    console.log(`Project with ID: ${projectId} has been deleted.`);

    await fs.promises.rm(variables, { force: true });
});
