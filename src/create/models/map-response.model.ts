export class MapResponse {
    errors: string[] = [];
    isValid: boolean = undefined;
    log: () => any = undefined;
    response: any = undefined;

    constructor(isValid: boolean, response: any) {
        this.isValid = isValid;
        this.response = response;
    }
}
