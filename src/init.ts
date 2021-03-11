import { InitService } from './init/init.service';
import { INIT } from './init/init.const';

export async function init() {
    INIT.start = Date.now();
    await InitService.start();
}

// init();
