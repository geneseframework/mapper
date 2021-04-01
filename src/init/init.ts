import { InitService } from './services/init.service';
import * as chalk from 'chalk';

/**
 * Launches the init() process (before the launch of the code of the user's project)
 * This process needs NodeJs environment to be able to use NodeJs methods as 'fs'
 * That's why it can't be used at runtime in some browser environment
 */
export async function init() {
    await InitService.start();
}

init();
