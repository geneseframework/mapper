import { Organism } from './organism.model';
import { Order } from '../types/order.type';

export class Animal extends Organism {

    age: number = undefined;
    kind: string = undefined;
    live = true;
    order: Order;

    constructor(kind: string) {
        super();
        this.kind = kind;
    }


}
