import * as chalk from 'chalk';

export type CurveBracketed = `{${string}}`;

export function isCurveBracketed(text: string): text is CurveBracketed {
    return /^{.*}$/g.test(text);
}


export function getCurveBracketedBlocs(text: string): CurveBracketed[] {
    console.log(chalk.cyanBright('GET CBBBB'), text);
    let openingBrackets = 0;
    let curveBracketed = '';
    const blocs: CurveBracketed[] = [];
    for (let i = 0; i < text.length; i++) {
        const char: string = text.charAt(i);
        if (isStartOfNewCurveBracketedBloc(char, openingBrackets)) {
            curveBracketed = '{';
            openingBrackets = 1;
        } else if (isEndOfNewCurveBracketedBloc(char, openingBrackets)) {
            curveBracketed = `${curveBracketed}}`;
            blocs.push(curveBracketed as CurveBracketed);
            curveBracketed = '';
            openingBrackets = 0;
        } else if (openingBrackets > 0) {
            curveBracketed = `${curveBracketed}${char}`;
            if (char === '{') {
                openingBrackets++;
            } else if (char === '}') {
                openingBrackets--;
            }
        }
    }
    console.log(chalk.magentaBright('GET CBBBB BLOCSSSSS'), blocs);
    return blocs;
}


function isStartOfNewCurveBracketedBloc(char: string, openingBrackets: number): boolean {
    return char === '{' && openingBrackets === 0;
}


function isEndOfNewCurveBracketedBloc(char: string, openingBrackets: number): boolean {
    return char === '}' && openingBrackets === 1;
}
