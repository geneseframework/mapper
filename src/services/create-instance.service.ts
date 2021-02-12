import { ClassConstructor } from '../models/t-constructor.model';

export class CreateInstanceService {

    static getInstance<T>(classConstructor: ClassConstructor<T>): T {
        switch (classConstructor) {
            default:
                return undefined;
        }
    }

}
