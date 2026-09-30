import { APIRequestContext } from '@playwright/test';
import { getJWTToken } from './apiAuth';
import path from 'path';

export async function createProject(request: APIRequestContext, entryType: string, projectName: string): Promise<string> {
    const adminToken = await getJWTToken(request, { isAdmin: true });

    const projectResponse = await request.post(`${process.env.BASE_URL}/api/v1/project`, {
        headers: {
            Authorization: `Bearer ${adminToken}`,
        },
        data: {
            projectName: projectName,
            entryType: entryType,
        }
    });

    if (projectResponse.status() !== 201) {
        throw new Error(`Failed to create project. Status code: ${projectResponse.status()}`);
    }

    const projectData = await projectResponse.json();
    return projectData.id;
}

export async function assignUserToProject(request: APIRequestContext, options: { userName: string; projectName?: string; role: string }): Promise<void> {
    const adminToken = await getJWTToken(request, { isAdmin: true });
    if (!options.projectName) {
        const testVariables = JSON.parse(require('fs').readFileSync(path.join(__dirname, '../playwright/.setup/testVariables.json'), 'utf-8'));
        options.projectName = testVariables.ProjectName;
    }

    const assignResponse = await request.put(`${process.env.BASE_URL}/api/v1/project/${options.projectName}/assign`, {
        headers: {
            Authorization: `Bearer ${adminToken}`,
        },
        data: {
            "userNames": {
                [options.userName]: options.role
            }
        }
    });

    if (assignResponse.status() !== 200) {
        throw new Error(`Failed to assign user to project. Status code: ${assignResponse.status()}`);
    }
    const assignData = await assignResponse.json();
    return assignData;
}

export async function deleteProject(request: APIRequestContext, projectId: string): Promise<void> {
    const adminToken = await getJWTToken(request, { isAdmin: true });

    const deleteResponse = await request.delete(`${process.env.BASE_URL}/api/v1/project/${projectId}`, {
        headers: {
            Authorization: `Bearer ${adminToken}`,
        }
    });
    if (deleteResponse.status() !== 200) {
        throw new Error(`Failed to delete project. Status code: ${deleteResponse.status()}`);
    }

    const deleteData = await deleteResponse.json();
    if (deleteData.errors) {
        throw new Error(`Failed to delete project. Errors: ${JSON.stringify(deleteData.errors[0].message)}`);
    }

    return deleteData;
}
