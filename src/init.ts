import { InitService } from './services/init/init.service';

export async function init() {
    await InitService.start();
}

init();
