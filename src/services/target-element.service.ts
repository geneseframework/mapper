import { Target } from '../types/target.type';
import { TargetElement } from '../types/target-element.type';

export class TargetElementService {


    static hasCorrectElements(target: Target<any>): boolean {
        return this.getTargetElements(target).every(t => this.isCorrect(t));
    }


    private static getTargetElements(target: Target<any>): TargetElement<any>[] {
        return [];
    }


    private static isCorrect(targetElement: TargetElement<any>): boolean {
        return undefined;
    }
}
