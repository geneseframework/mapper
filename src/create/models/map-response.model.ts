export class MapResponse {

    errors: string[] = [];
    isValid: boolean = undefined;
    log: () => any = undefined;
    response: any = undefined;

    constructor(response: any = undefined, isValid = true, errors: string[] = []) {
        this.isValid = isValid;
        this.response = response;
        this.errors = errors;
    }


    static invalid(message?: string): MapResponse {
        return new MapResponse(undefined, false, [message]);
    }
}
