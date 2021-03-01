import { StringString } from '../types/tuples/string-string.type';
import { AnyAny } from '../types/tuples/any-any.type';
import { Tuple } from '../types/tuples/tuple.type';
import { isStartingContainer, StartingContainer } from '../types/tuples/starting-container.type';
import { Containerized, isContainerized } from '../types/tuples/container.type';
import { throwError, throwWarning } from './errors.util';
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
    const cleanedText: string = cleanExtremities(text);
    const elements = isContainerized(cleanedText) ? cleanedText.slice(1, -1) : cleanedText;
    console.log(chalk.magentaBright('GET ELTTTTS'), text, elements, isStartingContainer(elements));
    let firstElement: string = isStartingContainer(elements) ? getFirstContainerizedElement(elements) : getBasicElement(elements);
    console.log(chalk.cyanBright('GET NEXT POSSS'), firstElement, getNextElementPosition(elements, firstElement));
    const nextElements: string = getNextElements(elements, firstElement);
    return [firstElement].concat(getElements(nextElements));
}


function getNextElements(text: string, firstElement: string): string {
    const nextElementPosition: number = getNextElementPosition(text, firstElement);
    const otherElements: string = text.slice(nextElementPosition);
    console.log(chalk.greenBright('GET NXTTTTTT'), text, firstElement, nextElementPosition, otherElements);
    return otherElements;

}


function cleanExtremities(text: string): string {
    return text.replace(/^(,| )/g, '').replace(/(,| )$/g, '');
}


export function getFlattenElements(text: string): string[] {
    if (!text || text.length === 0) {
        return [];
    }
    const cleanedText: string = cleanExtremities(text);
    const elements = isContainerized(cleanedText) ? cleanedText.slice(1, -1) : cleanedText;
    console.log(chalk.magentaBright('GET ELTTTTS'), text, elements, isStartingContainer(elements));
    let firstElement: string = isStartingContainer(elements) ? getFirstContainerizedElement(elements) : getBasicElement(elements);
    console.log(chalk.cyanBright('GET NEXT POSSS'), firstElement, getNextElementPosition(elements, firstElement));
    const nextElements: string = getNextFlattenElements(elements, firstElement);
    return [firstElement].concat(getElements(nextElements));
}


function getNextFlattenElements(text: string, firstElement: string): string {
    const nextElementPosition: number = getNextElementPosition(text, firstElement);
    const otherElements: string = text.slice(nextElementPosition);
    console.log(chalk.blueBright('GET NXTTTTTT'), text, firstElement, nextElementPosition, otherElements);
    return otherElements;

}


function getBasicElement(text: string): string {
    return text.match(/[^(,| )]+/g)?.[0];
}


function getNextElementPosition(text: string, firstElement: string): number {
    const otherElements: string = cleanExtremities(text.slice(firstElement.length));
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
        throwError('Error: wrong number of brackets or parenthesis for ', text);
    } else {
        return element as Containerized;
    }
}


function isBasicTupleElement(element: string): boolean {
    return element.replace(/[()\]\[|& ,]/g, '') === element;
}
