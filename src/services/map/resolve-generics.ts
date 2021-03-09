import {
    OptionalKind,
    Project,
    SourceFile,
    TypeAliasDeclaration,
    TypeAliasDeclarationStructure,
    TypeParameterDeclarationStructure
} from 'ts-morph';
import * as chalk from 'chalk';


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

const resolvedType: string = getType('fooVar');
console.log(chalk.greenBright('RESOLVEDDDDD'), resolvedType);
