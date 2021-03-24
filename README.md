
<p align="center">
    <img src="https://raw.githubusercontent.com/geneseframework/mapper/develop/docs/logo-genese-150x150.png" alt="genese logo">
</p>

# @genese/mapper
Maps objects of unknown type into the required type.

## Basic usage

With @genese/mapper, you can transform untyped javascript objects into safe typed objects.

@genese/mapper exposes only one method, the `create()` method.

- Example 1 : creation of a typed object

```ts
export class Person {
    
    name: string;
    
    hello(): void {
        console.log(`Hello ${this.name} !`);
    }
}

const data = {name: 'John'};
const person: Person = create(Person, data);    // person is a Person object
person.hello();                                 // log : 'Hello John !'
```

This is equivalent to :
```ts
const person: Person = new Person();
person.name = data.name;
```


- Example 2 : creation of a more complex object

Now, assume that `Person` is a little more complex :

```ts
export class Person {
    
    age: number;
    cat: Cat;
    firstname: string;
    lastname: string;
    
    hello(): void {
        console.log(`Hello ${this.name} !`);
    }
}

export class Cat {
    name: string;
    
    meaow(): void {
        console.log(`Meaow !`);
    }
}

const data = {
    age: 20, 
    cat: {
        name: 'Molly'
    },
    firstname: 'John', 
    lastname: 'Doe',
};
```

In this case, it would be sufficiently long to create manually the `Person` object :
```ts
const cat: Cat = new Cat();
cat.name = data.cat.name;

const person: Person = new Person();
person.age = data.age;
person.firstname = data.firstname;
person.lastname = data.lastname;

person.hello(); // => logs 'Hello John !'
person.cat.meaow(); // => logs 'Meaow !'
```

With `@genese/mapper`, you can do it in one line :

```ts
const person: Person = create(Person, data);    // Person object which contains a Cat object

person.hello();                                 // log: 'Hello John !'
person.cat.meaow();                             // log: 'Meaow !'
```
The `data` object may be as complex as you want, you will still need only one line to create a real object, including nested objects if necessary.

- Example 3 : validation of the data shape

The above usage simplifies the creation of known objects, the real power of `@genese/mapper` is to create safe typed objects even when you don't know the `data` value or even its shape.

Assume that you receive some `data` with unknown value or shape, like on http requests. You need to check the `data` shape and verify if its value respects your DTO contract :

```ts
interface PersonDto {
    name: string;
    skills: string[];
}
```

Without `@genese/mapper`, your controller in the backend could be written like this (example with NestJs) :

```ts
@Post()
addPerson(@Body() data: PersonDto) {
    if (isValid(data)) {
        addNewPersonToDataBase(data); // do some stuff
    }
}

isValid(data: any): data is PersonDto {
    return data 
        && typeof data.name === 'string'
        && Array.isArray(data.skills)
        && data.skills.every(d => typeof d === 'string');
}
```

With @genese/mapper, you could simply do that :

```ts
@Post()
addPerson(@Body() data: PersonDto) {
    if (create('PersonDto', data)) { // create('PersonDto', data) is a PersonDto object if data is correct, undefined if not
        addNewPersonToDataBase(data);
    }
}
```
The `create()` method checks everything for you. If data value respects the contract of the interface `PersonDto` the `create()` method will return the `data` value. If data is incorrect, it will return `undefined`.

This method can be used with primitives, arrays, tuples, classes, interfaces, enums and types.


## Table of Contents
* [Installation](#installation)
* [Configuration](#configuration)
    * [package.json](#packagejson)
    * [geneseconfig.ts](#geneseconfigts)
* [Start](#start)
* [The ***create()*** method](#the-create-method)
    * [Primitives](#primitives)
        * [Basic behavior with primitives](#basic-behavior-with-primitives)
        * [The ***castStringsAndNumbers*** option](#the-caststringsandnumbers-option)
        * [Literal primitives](#literal-primitives)
    * [Arrays](#arrays)
    * [Classes](#classes)
        * [Basic behavior with classes](#basic-behavior-with-classes)
        * [Irrelevant properties](#irrelevant-properties)
        * [Properties with wrong type](#properties-with-wrong-type)
        * [Constructor parameters](#constructor-parameters)
        * [Indexable keys](#indexable-types)
        * [Nested classes](#nested-classes)
        * [Heritage](#heritage)
        * [Abstract classes](#abstract-classes)
        * [Literal objects](#literal-objects)
    * [Interfaces](#interfaces)
    * [Enums](#enums)
    * [Tuples](#tuples)
    * [Types](#types)
        * [Literal types](#literal-types)
        * [Union types](#union-types)
        * [Types defined by classes](#types-defined-by-classes)
    * [Dates](#dates)
* [Configuration details](#configuration-details)
    * [Basics](#basics)
    * [Options 'include' and 'tsconfigs'](#options-include-and-tsconfigs)
* [Limitations](#limitations)
* [Warnings](#warnings)


[Top](#table-of-contents)
## Installation

Install the npm module:

```sh
npm install @genese/mapper
```

[Top](#table-of-contents)
## Configuration

### package.json

Add this line to your `package.json` :
```json
{
    "scripts": {
        "mapper": "node node_modules/@genese/mapper/dist/init/init.js"
    }
}
```

The instruction `npm run mapper` must be called **before** executing your own code.

- Example with Angular application :

```json
{
    "scripts": {
        "mapper": "node node_modules/@genese/mapper/dist/init/init.js",
        "start": "npm run mapper && ng serve"
    }
}
```

- Example if you run your code in NodeJs environment, like in backend :

```json
{
    "scripts": {
        "mapper": "node node_modules/@genese/mapper/dist/init/init.js",
        "start": "npm run mapper && ts-node main.ts"
    }
}
```
This constraint is due to the fact that in the first phase of its process, `@genese/mapper` analyzes the code of your project and creates some temporary files. These files will be used later, when the `create()` method will be called.

### geneseconfig.ts

A file called `geneseconfig.ts` may be added at the root of your project. If there is no `geneseconfig.ts` file at the root of your project, `@genese/mapper` will use configuration by default.

```ts
export const geneseConfig: GeneseConfig = {
    mapper: {}
}
```
For now, let's keep the property `mapper` empty. We will see configuration details [later](#configuration-details).


[Top](#table-of-contents) 
## Start

Let's try `@genese/mapper` in a simple example, assuming that you want to run your code in NodeJs environment.

For that, install the `ts-node` module :

```sh
npm install ts-node
```

Create a file called `mapper-example.ts` at the root of your project with this code :

```ts
import { create } from '@genese/mapper/dist/create/main';

export class Person {
    name: string;

    hello() {
        console.log(`Hello ${this.name} !`)
    }
}

const person = create(Person, {name: 'Léa'});
console.log('PERSON :', person);    // log: PERSON Person {name: 'Léa'}
person.hello();                     // log: Hello John !
```
Of course, the `create()` method could be called from another file.

[Top](#table-of-contents)
## The ***create()*** method

In many cases, you don't know the value of `data`, like on http requests results. You must check if data exists, if it respects the contract (ie: has a correct shape), remove the eventual unnecessary properties and eventually add default values.
You can do all of this in one line with the `create()` method. In case of irrelevant data properties, wrong values format or missing properties, the `create()` method has specific behavior which we will now explain. In some cases, this behavior can be modified thanks to `geneseconfig.ts` file.
We will now explain this behavior for different cases :

[Top](#table-of-contents)
### Primitives

#### Basic behavior with primitives

You want to check if the received data is a primitive (string, number or boolean) :

```ts
const foo: string = create('string', data); // foo equals data if data is a string, undefined if not.
```
Please note the quotes around the word `string`. The only cases where you can omit the quotes are for classes, primitive constructors and tuples, like `create(Person, data)`, `create(String, data)` or `create(['string', 'number'], data)`.

- Examples :
```ts
create('string', 'a');                      // 'a'
create('number', 1);                        // 1
create('string', 1);                        // undefined
```

#### The ***castStringsAndNumbers*** option

In the last example, the result is equal to `undefined` because `1` is not a `string`. However, you could prefer to identify strings and numbers and receive `'1'` instead of `undefined`. For that, you can change the behavior of the `create()` method by adding a specific option :

```ts
create('string', 1, {castStringsAndNumbers: true}); // '1'.
```

If you want to use this behavior for all your project, you can do it with the `geneseconfig.ts` file :

```ts
export const geneseConfig: GeneseConfig = {
    mapper: {
        behavior: {
            castStringsAndNumbers: true,
        },
    }
}

create('string', 1);     // '1'
```
Now `foo` equals `'1'` if `data` equals `1`, without adding option inside the `create()` method.

Conversely, you can cast `strings` and `numbers` for all your project with the config above, and not cast them for a specific call to the `create()` method by adding to it the option `castStringsAndNumbers: false`.

#### Literal primitives

In the below examples, `'a'` and `1` are interpreted as a literal elements : `@genese/mapper` will return `data` value if `data` is equal to this literal element, and `undefined` if not.

```ts
create('a', 'a');                               // 'a'
create('a', 'b');                               // undefined
create(1, 1);                                   // 1
create(1, '1');                                 // undefined
create(1, '1', {castStringsAndNumbers: true});  // 1    
create(1, '1');                                 // undefined        
```

[Top](#table-of-contents)
### Arrays

Arrays are mapped trivially like this :

```ts
create('string[]', ['blue', 'white']);                                // ['blue', 'white'];
create('string[]', ['blue', 2]);                                      // ['blue', undefined];
create('string[]', ['blue', 2], {castStringsAndNumbers: true});       // ['blue', '2'];
```

[Top](#table-of-contents)
### Classes

Assume that you want to cast `data` in a safe typed instance :

#### Basic behavior with classes
```ts
export class Person {
    
    age: number;
    name: string;
    
    hello(): void {
        console.log(`Hello ${this.name} ! You are ${this.age} years old.`);
    }
}

const data = {name: 'John', age: 20};
const person: Person = create(Person, data);    // person is a Person object
person.hello();                                 // log: 'Hello John ! You are 20 years old.'
```

- If `data` is undefined or is not an object, `create()` will return `undefined`.
- If `data` is an object, `create()` will return an instance of `Person`.
- If the property `name` is equal to `undefined` in `data`, the value of `name` will be equal to `undefined` in `person`.
- If the property `name` does not exist in `data`, the property `name` will not exist in `person` if there is no default value.


- Examples :
```ts
create(Person, undefined);                      // undefined;
create(Person, {});                             // Person {};
create(Person, {name: undefined, age: 20});     // Person {name: undefined; age: 20};
create(Person, {age: 20});                      // Person {age: 20};
```

**Caution**

Contrary to interfaces, types or enums, a class **must** be exported to be able to be used by `@genese/mapper`.

#### Irrelevant properties

If a property exists in `data` but not in `Person`, this property will be removed :

```ts
const data = {name: 'John', age: 20};
create(Person, data);                                   // Person {name: 'John'}
```

#### Properties with wrong type

If a `data` property has a wrong type, the value of this property in the mapped object will be equal to `undefined`, or to the default value if exists.

```ts
const data = {name: 20};
create(Person, data);                                   // Person {name: undefined}
```

With wrong type but identifying strings and numbers :

```ts
const data = {age: '20'};
create(Person, data, {castStringsAndNumbers: true});    // Person {age: 20}
```

With default property :

```ts
export class Person {
    name: string = 'John';
}

const data = {name: 3};
create(Person, data);                                   // Person {name: 'John'}
```

#### Constructor parameters

If your class has constructor parameters, the instance will be created by replacing each parameter by the corresponding `data` value or by `undefined` if this value does not exist in `data`.

Without default value :

```ts
export class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

create(Person, {name: 'John'});                 // Person {name: 'John'}
create(Person, {});                             // Person {}
```

With default value :
```ts
export class Person {
    name: string;

    constructor(name: string = 'John') {
        this.name = name;
    }
}

create(Person, {name: 'Jane'});                 // Person {name: 'Jane'}
create(Person, {name: undefined});              // Person {name: 'John'}
create(Person, {});                             // Person {name: 'John'}
```

#### Indexable types

Indexable types are usable with `@genese/mapper` :

```ts
export class Person {
    name: string;
    [key: string]: string;

    constructor(name: string) {
        this.name = name;
    }
}

create(Person, {name: 'John', role: 'user'});   // Person {name: 'John', role: 'user'}
```

#### Nested classes

Properties with `class` types are mapped as instances of their corresponding type :

```ts
export class Person {
    name: string;
    cat: Cat;
}

export class Cat {
    name: string;
    
    meaow(): void {
        console.log(`Meaow !`);
    }
}

const data = {
    name: 'John', 
    cat: {
        name: 'Molly'
    }
};
const person: Person = create(Person, data);    // Person {name: 'John', cat: Cat {name: 'Molly'}}
const molly: Cat = person.cat;                  // Cat {name: 'Molly'}
molly.meaow();                                  // log: Meaow !
```

#### Heritage

`@genese/mapper` takes into account the notion of heritage :

```ts
export class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    hello(): void {
        console.log(`Hello ${this.name} !`);
    }
}

export class User extends Person {
    role: string;
    
    constructor(role: string, name: string) {
        super(name);
        this.role = role;
    }
}

const data = {
    name: 'John', 
    role: 'user',
};
const user: User = create(User, data);          // user === User {name: 'John', role: 'user'}
user.hello();                                   // log: Hello John !
```

#### Abstract classes

Abstract classes can't be instantiated. If you try it, `@genese/mapper` will return `undefined`.

```ts
export abstract class AbstractPerson {
    name: string;
}
const data = {name: 'John'};
create(AbstractPerson, data);                   // undefined
```

#### Literal objects

If a property is typed with a literal object and if the corresponding data property don't have the same keys than the literal object, the result will be equal to `undefined`.

If `data` has the same keys, these keys will be mapped as usual.

```ts
export class Person {
    address: {
        country: string,
        city: string,
    };
}

const foo = {address: {country: 'Spain', city: 'Barcelona'}};
create(Person, foo);          // Person {address: {country: 'Spain', city: 'Barcelona'}}

const bar = {address: {country: 'Spain', street: 'Ramblas'}};
create(Person, bar);          // Person {address: undefined}

const baz = {address: {country: 'Spain', city: 23}};
create(Person, baz);          // Person {address: {country: 'Spain', city: undefined}}
```

[Top](#table-of-contents)
### Interfaces

The interfaces are treated as classes, with the specificities due to interfaces: the respect of the contract.

Please note that contrary to classes, the name of the interface must be surrounded by quotes.

```ts
export interface Person {
    name: string;
    age: number;
    city?: string
}

create('Person', {name: 'John', age: 20, city: 'Milano'}); // Person {name: 'John', age: 20, city: 'Milano'}
create('Person', {name: 'John', age: 20});                 // Person {name: 'John', age: 20}
create('Person', {name: 'John'});                          // undefined
```

[Top](#table-of-contents)
### Enums

If `data` value is one of the enum values, `@genese/mapper` will return this value. If not, it will return `undefined`.

As for interfaces or types, the name of the enum must be surrounded by quotes.

```ts
export enum Color {
    WHITE = 'White',
    BLACK = 'Black',
}

create('Color', 'White');                                  // 'White'
create('Color', 'Blue');                                   // undefined
```

[Top](#table-of-contents)
### Tuples

`@genese/mapper` checks if the number of elements of `data` is the same as in the expected tuple, and if the type of each element is correct. If the number of elements is wrong, it returns `undefined`. If the number of elements is correct, `@genese/mapper` returns a tuple where each element is mapped as usual.

```ts
create(['string', 'string'], ['blue', 'white']);            // ['blue', 'white']
create(['string', 'string'], ['blue']);                     // undefined
create(['string', 'string'], ['blue', 3]);                  // ['blue', undefined]
```

**Caution :**

You can surround tuples by quotes or not, but if you choose to surround them by quotes, the words surrounded by quotes inside the tuples will be understood as literal strings :

```ts
create(`[string, string]`, ['blue', 'white']);              // ['blue', 'white']
create(`['string', 'string']`, ['blue', 'white']);          // [undefined, undefined]
```

In the same way, classes, interfaces or types inside a quoted tuple can't be surrounded by quotes (if they are, they will be understood as literal strings) :

```ts
export class Person {
    name: string;
}
create(`[Person, Person]`, [{name: 'John'}, {name: 'Jane'}]);    // [Person {name: 'John'}, Person {name: 'Jane'}]
create(`['Person', 'Person']`, [{name: 'John'}, {name: 'Jane'}]);// [undefined, undefined]
```

[Top](#table-of-contents)
### Types

Generally speaking, the `@genese/mapper` behavior for types is close to its behavior for interfaces : if `data` respects the contract defined by the expected type, `@genese/mapper` will return the `data` value. If not, it will return `undefined`.

As for interfaces or enums, the name of the type must be surrounded by quotes.

#### Literal types

In case of literal types, `@genese/mapper` only checks if `data` value is equal to the literal value of the type :

```ts
export type LiteralString = 'blue';

create('LiteralString', 'blue');                                // 'blue'
create('LiteralString', 'white');                               // undefined
```

#### Union types

For union types, `@genese/mapper` checks if `data` shape respects one of the types of the union :

```ts
export type StringOrNumber = string | number;

create('StringOrNumber', '2');                                  // '2'
create('StringOrNumber', 2);                                    // 2
create('StringOrNumber', {name: 'John'});                       // undefined
```

#### Types defined by classes

If a type is corresponding to a class, `@genese/mapper` will interpret this type as its relative class. That means that you will be able to use the eventual method of this class :

```ts
export class Person {
    name: string;
    
    hello(): void {
        console.log(`Hello ${this.name} !`);
    }
}

export type TPerson = Person;
const person: Person = create('TPerson', {name: 'John'});       // Person {name: 'John'}
person.hello();                                                 // log : 'Hello John !'
```

[Top](#table-of-contents)
### Dates

`@genese/mapper` is able to interpret dates. The date type may be written with quotes or without, as `Date` constructor :

```ts
create('Date', '2021-02-19T17:36:53.999Z');       // new Date('2021-02-19T17:36:53.999Z')                    
create(Date, '2021-02-19T17:36:53.999Z');         // new Date('2021-02-19T17:36:53.999Z')                    
```

The usage of `Date` constructor may be interesting because `@genese/mapper` will check at compile time if the type of the variable is correct :

```ts
const foo: number = create('Date', '2021-02-19T17:36:53.999Z'); // no error detected                    
const bar: number = create(Date, '2021-02-19T17:36:53.999Z');   // error detected                    
```


[Top](#table-of-contents)
## Configuration details

[Top](#table-of-contents)
### Basics
We saw on the [basic configuration](#configuration) section that a file called `geneseconfig.ts` can be added at the root of your project :

```ts
export const geneseConfig: GeneseConfig = {
    mapper: {}
}
```

We also saw the possibility to add specific behavior for strings and numbers in a [previous section](#the-caststringsandnumbers-option) :

```ts
export const geneseConfig: GeneseConfig = {
    mapper: {
        castStringsAndNumbers: true               // strings will be cast in numbers and inversely
    }
}
```

Now, let's look at other configuration options.

[Top](#table-of-contents)
### Options 'include' and 'tsconfigs'

By default, `@genese/mapper` analyzes all the files corresponding to the `tsconfig.json` located at the root of your project. You can change this behavior by two ways :

- Include some specific files

```ts
export const geneseConfig: GeneseConfig = {
    mapper: {
        include: ['path/to/one/file.ts', 'path/to/other-file.ts']
    }
}
```

- Use different `tsconfig.json` files

```ts
export const geneseConfig: GeneseConfig = {
    mapper: {
        tsconfigs: ['path/to/tsconfig.json', 'path/to/tsconfig.app.json']
    }
}
```

**Caution**

If the `tsconfigs` option exists and is not empty, `@genese/mapper` will not use the default `tsconfig.json` file. If you want to use the default `tsconfig.json` and another one, you must include both in the `tsconfigs` property.


```ts
export const geneseConfig: GeneseConfig = {
    mapper: {
        tsconfigs: ['tsconfig.json', 'path/to/other/tsconfig.json']
    }
}
```

[Top](#table-of-contents)
## Limitations

Some features are still in progress and will be added in the future :

- Literal objects

For now, literal objects are mapped when they type some property of a given class, but you can't use them directly, outside any class :

```ts
export class Person {
    address: {
        country: string,
        city: string,
    }
}
create(Person, {address: {country: 'Italy', city: 'Roma'}});                  // runs
create(`{country: string, city: string}`, {country: 'Italy', city: 'Roma'});  // fails
```

- Generic types

Generic types are actually not supported :

```ts
export class Person<T> {
    property: T
}
create('Person<string>', {property: 'a'});              // fails
```

- Intersection types

`@genese/mapper` supports union types but not intersection types :

```ts
export type Person = User & Role
create('Person', {name: 'a'});                          // fails
```

- New instances as default values

For now, `@genese/mapper` will fail when the default value of a property is given by something like `new SomeClass()` :


```ts
export class Cat {
    name: string;
}
export class Person {
    cat: Cat = new Cat();
}
create('Person', {cat: {name: 'Molly'}});              // fails
```

[Top](#table-of-contents)
## Warnings

`@genese/mapper` throws different warnings :

- ***unknown target "...". @genese/mapper interpreted it as "any" and data will be set "as is" in the mapped response.***

`@genese/mapper` was not able to find the definition of a given type. In this case, `@genese/mapper` will not check the `data` shape or value and will simply copy-paste it in the result of the `create()` method.

Possibilities :
- there is a typing error in your call to the `create()` method 
```ts
create('strring', '2')                                  // Warning
```
- your call is correct but `@genese/mapper` was not able to find the targeted type.
```ts
create('SomeUnknownClass', {name: 'John'});             // Warning
```
In this case, please verify if the file corresponding to `SomeUnknownClass` exists in your project (ie: is included in your `typescript.json`). If not, add it in the `geneseconfig.ts` configuration.

- ***different elements "..." are declared in your project.***

You should not have two declarations with the same name in your project (two classes with the same name, one class with the same name as a type, etc.)

- ***Impossible to map this instance. Did you export it ?***

To be able to create a new instance, `@genese/mapper` must be able to import it in a temporary file. That's why you **must** export classes used by `@genese/mapper`, even if your call to the `create()` method is in the same file as the definition of your class.

At the opposite, the keyword `export` is not mandatory for interfaces, types or enums.

- ***Warning: ... depends on '@genese/mapper/dist/create/main'. CommonJS or AMD dependencies can cause optimization bailouts.***

You can remove this Angular warning by configuring [CommonJs dependencies](https://angular.io/guide/build#configuring-commonjs-dependencies).
