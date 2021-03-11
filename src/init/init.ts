import { InitService } from './init.service';
import { INIT } from './init.const';

export async function init() {
    INIT.start = Date.now();
    await InitService.start();
}

init();
