import { InitService } from './services/init.service';

/**
 * Launches the init() process
 */
export async function init() {
    await InitService.start();
}

init();
