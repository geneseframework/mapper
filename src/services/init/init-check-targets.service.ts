// TODO
import { throwError } from '../../utils/errors.util';

export class InitCheckTargetsService {


    static async start(): Promise<void> {
        const targets: any[] = await this.getTargets();
        this.checkFormats(targets);
    }


    private static async getTargets(): Promise<any[]> {
        return [];
    }


    private static checkFormats(targets: any[]): void {
        for (const target of targets) {
            if (!this.hasCorrectFormat(target)) {
                throwError('Error: target has wrong format : ', target);
            }
        }
    }


    static hasCorrectFormat(target: any): boolean {
        return true;
    }
}
