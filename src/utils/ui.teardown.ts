import { test as teardown } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

teardown('cleanup auth state', async () => {
    await fs.promises.rm(authFile, { force: true });
});
