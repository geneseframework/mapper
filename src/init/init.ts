import { InitService } from './services/init.service';
import { INIT } from './const/init.const';

export async function init() {
    INIT.start = Date.now();
    await InitService.start();
}

init();
