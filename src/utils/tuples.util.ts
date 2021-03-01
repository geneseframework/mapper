import { StringString } from '../types/tuples/string-string.type';
import { AnyAny } from '../types/tuples/any-any.type';
import { Tuple } from '../types/tuples/tuple.type';
import { isStartingContainer, StartingContainer } from '../types/tuples/starting-container.type';
import { Containerized } from '../types/tuples/container.type';
import { throwWarning } from './errors.util';
import * as chalk from 'chalk';


export function isTuple(typeName: string): typeName is Tuple {
    return /^\[.*, .*\]$/g.test(typeName);
}

export function isTupleStringString(targetData: [string, any]): targetData is StringString {
    return targetData[0] === 'string' && typeof targetData[1] === 'string';
}

export function target(tuple: StringString): 'string'
export function target(tuple: AnyAny): any {
    return tuple[0];
}

export function data(tuple: StringString): string
export function data(tuple: AnyAny): any {
    return tuple[1];
}


export function tupleLength(tuple: Tuple): number {
    return getElements(tuple).length;
    // return getContainerizedElements(tuple as unknown as Bracketed).length;
}


function getContainerizedElements(text: Containerized): string[] {
    const insideContainer = text.slice(1, -1).trim();
    return insideContainer.length === 0 ? [] : getElements(insideContainer);
}


export function getElements(text: string): string[] {
    if (!text || text.length === 0) {
        return [];
    }
    const cleanedText: string = removeLeftCommasAndSpaces(text);
    console.log(chalk.magentaBright('GET ELTTTTS'), cleanedText, isStartingContainer(cleanedText));
    let firstElement: string = isStartingContainer(cleanedText) ? getFirstContainerizedElement(cleanedText) : getBasicElement(cleanedText);
    console.log(chalk.cyanBright('GET NEXT POSSS'), firstElement, getNextElementPosition(cleanedText, firstElement));
    const nextElementPosition: number = getNextElementPosition(cleanedText, firstElement);
    const otherElements: string = cleanedText.slice(nextElementPosition);
    return [firstElement].concat(getElements(otherElements));
}


function removeLeftCommasAndSpaces(text: string): string {
    return text.replace(/^(,| )/g, '').replace(/(,| )$/g, '');
}


function getBasicElement(text: string): string {
    return text.match(/[^(,| )]+/g)?.[0];
}


function getNextElementPosition(text: string, firstElement: string): number {
    const otherElements: string = removeLeftCommasAndSpaces(text.slice(firstElement.length));
    return text.length - otherElements.length;
}


function getFirstContainerizedElement(text: StartingContainer): Containerized {
    const openingChar: string = text[0];
    const closingChar: string = openingChar === '(' ? ')' : ']';
    let nbParenthesis = 0;
    let element = '';
    for (let i = 0; i < text.length; i++) {
        if (text[i] === openingChar) {
            nbParenthesis++;
        }
        if (text[i] === closingChar) {
            nbParenthesis--;
        }
        element = `${element}${text[i]}`;
        if (nbParenthesis === 0) {
            console.log(chalk.blueBright('ELTTTT'), element);
            return element.slice(1, -1) as Containerized;
        }
    }
    if (nbParenthesis > 0) {
        throwWarning('Warning: wrong number of brackets or parenthesis for ', text);
        return undefined;
    } else {
        return element as Containerized;
    }
}


function isBasicTupleElement(element: string): boolean {
    return element.replace(/[()\]\[|& ,]/g, '') === element;
}
