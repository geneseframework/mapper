import { InitService } from './services/init.service';

/**
 * Launches the init() process (before the launch of the code of the user's project)
 */
export async function init() {
    await InitService.start();
}

init();
