export class Address {

    public street: string = undefined;
    public streetNumber: number = undefined;
    public town: string = undefined;

    constructor(street?: string, streetNumber?: number, town?: string) {
        this.street = street;
        this.streetNumber = streetNumber;
        this.town = town;
    }

}
