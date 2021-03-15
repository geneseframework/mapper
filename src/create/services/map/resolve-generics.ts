import { Project, SourceFile, TypeAliasDeclarationStructure } from 'ts-morph';
import * as chalk from 'chalk';


// Tries to solve Generic Types.
// TODO : implement Generic Types and then remove this file

type FooType<T> = T extends string ? string : number;
let fooVar: FooType<string>;


function getFirstOrderType(varName: string): string {
    return sourceFile.getVariableDeclaration(varName).getStructure().type as string;
}


const project = new Project();
const sourceFile: SourceFile = project.addSourceFileAtPath(__filename);
const firstOrderType: string = getFirstOrderType('fooVar');
console.log(firstOrderType); // ----> FooType<string>


type Ternary = [predicate: string, trueCase: string, falseCase: string];

function resolveGenericType(genericType: string): string {
    const typeName: string = genericType.split('<')[0];
    const typeParameter: string = genericType.match(/<.+>/g)[0].slice(1, -1);
    const fooTypeStructure: TypeAliasDeclarationStructure = sourceFile.getTypeAlias(typeName).getStructure();
    const [predicate, trueCase, falseCase]: Ternary = (fooTypeStructure.type as string).split(/[?:]/g) as Ternary;
    return predicateResult(typeParameter, predicate) ? trueCase : falseCase;
}


function predicateResult(typeParameter: string, predicate: string): boolean {
    const typeToExtend: string = predicate.split(' extends ')[1].trim();
    if (typeParameter === typeToExtend) {
        return true;
    } else {
        // TODO
    }
}

function getType(varName: string): string {
    return resolveGenericType(getFirstOrderType(varName))
}

const resolvedType: string = getType('fooVar'); // ---> = 'string'
console.log(chalk.greenBright('RESOLVEDDDDD'), resolvedType);



type BarTypeParent = string;
type BarType<T> = T extends BarTypeParent ? string : number;
let barVar: BarType<string>;


const resolvedBarType: string = getType('barVar'); // ---> TODO
console.log(chalk.greenBright('RESOLVEDDDDD'), resolvedBarType);

