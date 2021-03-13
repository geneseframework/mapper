import { INIT } from '../init/const/init.const';
import { GLOBAL } from '../create/const/global.const';
import { InitService } from '../init/services/init.service';

INIT.debug = true;
GLOBAL.debug = true;

async function init(): Promise<void> {
    await InitService.start();
}

init();
