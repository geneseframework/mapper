/**
 *  WrongDataType is returned in Mapper.create() method when its parameter "data" type is incompatible with the type of the parameter "mapTarget"
 */
export class WrongDataType {
    error : 'Mapper.create() method called with parameter "data" type is incompatible with the type of the parameter "mapTarget"';

    toString(): string {
        return this.error;
    }
}
