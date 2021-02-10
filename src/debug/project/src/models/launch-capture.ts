import { MainAppProcess } from './main-app-process';

export async function launchCapture() {
    try {
       await new MainAppProcess().start();
    } catch (err) {
        console.error('Error in process : ' + err.stack);
    }
}
