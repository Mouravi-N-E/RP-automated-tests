import { test as setup } from '@playwright/test';
import { getJWTToken } from './apiAuth';
import { assignUserToProject, createProject } from './projectAPI';
import path from 'path';
import { createNewDashboard } from '../api/helpers/dashboardsHelpers';

const testVariables = path.join(__dirname, '../playwright/.setup/testVariables.json');

setup('getApiToken', async ({ request }) => {
  const jwtToken = await getJWTToken(request);
  const adminToken = await getJWTToken(request, { isAdmin: true });
  process.env.JWT_TOKEN = jwtToken;

  // process.env.ProjectName = 'Test-Project-' + Date.now();
  const projectName = 'Test-Project-' + Date.now();
  console.log(`Generated project name: ${projectName}`);
  const newProject = await createProject(request, 'INTERNAL', projectName);
  console.log(`Created new project with ID: ${newProject}`);

  //process.env.ProjectId = newProject;
  testVariables && require('fs').writeFileSync(testVariables, JSON.stringify({ User_TOKEN: jwtToken, Admin_TOKEN: adminToken, ProjectName: projectName, ProjectId: newProject }, null, 2));

  const assignUserResponse = await assignUserToProject(request, {
    userName: process.env.LOGIN_DEFAULT || 'defaultUser',
    role: 'MEMBER'
  });

  console.log(`Assigned user to project: ${JSON.stringify(assignUserResponse)}`);

  await createNewDashboard(projectName, 'Demo Dashboard', 'This is the initial dashboard created during setup');
}); 
