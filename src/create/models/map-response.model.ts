export class MapResponse {
    errors: string[] = [];
    isValid: boolean = undefined;
    log: () => any = undefined;
    response: any = undefined;

    constructor(response: any = undefined, isValid = true) {
        this.isValid = isValid;
        this.response = response;
    }
}
