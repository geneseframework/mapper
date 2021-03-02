// TODO
export class InitCheckTargetsService {


    static async start(): Promise<void> {
        const targets: any[] = await this.getTargets();
    }


    private static async getTargets(): Promise<any[]> {
        return [];
    }


    private static checkFormats(targets: any[]): void {
        for (const target of targets) {
            this.checkFormat(target);
        }
    }


    private static checkFormat(target: any): void {

    }
}
