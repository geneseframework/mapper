# @genese/mapper
Map javascript objects of unknown type into the required TypeScript type.

## Table of Contents
* [Basic usage](#basic-usage)
* [Installation](#installation)
* [Models](#models)
* [Methods](#methods)
* [Other tools](#other-tools)


## Basic usage

With @genese/mapper, you can transform untyped javascript objects into safe typed objects.

@genese/mapper exposes only one method, the `create()` method.

- Example 1 : creation of a simple object

```ts
export class Person {
	
	name: string;
	
	hello(): void {
		console.log(`Hello ${this.name} !`);
    }
}

const data = {name: 'John'};
const person: Person = create(Person, data); // => person is a real Person object
person.hello(); // => logs 'Hello John !'
```

The example 1 is trivial, and is equivalent to :
```ts
const person: Person = new Person();
person.name = data.name;
```

Now, assume that `Person` is a little more complex class :

- Example 2 : creation of a more complex object

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
In this case, it would be much longer to create manually the `Person` object :
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
const person: Person = create(Person, data); // => person is a real Person object and contains a real Cat object
person.hello(); // => logs 'Hello John !'
person.cat.meaow(); // => logs 'Meaow !'
```
The `data` object may be as complex as you want, you will still have only one line to write to create a real object, including nested objects if necessary.

- Example 3 : validation of the data shape

In reality, even if this kind of usage can simplify the creation of known objects, the real power of `@genese/mapper` is to give you the possibility to create safe typed objects even when you don't know the data value or even the shape of data.
Assume that you receive some data with unknown value or shape, like for http requests. You want to check the data shape and verify if the data value respects your DTO contract :

```ts
export interface PersonDto {
	name: string;
	skills: string[];
}
```

Without @genese/mapper, your NestJs controller in the backend should be like this :

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
    if (create('PersonDto', data)) { // The create() method checks if data value respects the contract of the interface PersonDto. If data is incorrect, create() returns undefined.
        addNewPersonToDataBase(data);
    }
}
```

The `create()` method can be used with primitives, arrays, tuples, classes, interfaces, enums and types.


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

The instruction `npm run mapper` **must** be called **before** executing your own code.

Example with Angular application :

```json
{
    "scripts": {
        "mapper": "node node_modules/@genese/mapper/dist/init/init.js",
        "start": "npm run mapper && ng serve"
    }
}
```

Example if you run your code in NodeJs environment, like in backend :

```json
{
    "scripts": {
        "mapper": "node node_modules/@genese/mapper/dist/init/init.js",
        "start": "npm run mapper && ts-node main.ts"
    }
}
```
This constraint is due to the fact that in a first phase of its process, `@genese/mapper` will read the code of your project and create some temporary files which will be used later, when you will call the `create()` method.

###geneseconfig.ts

Add a file called `geneseconfig.ts` at the root of your project :

```ts
export const geneseConfig: GeneseConfig = {
    mapper: {}
}
```
For now, let's keep the property `mapper` empty. We will see configuration options later.



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
console.log('PERSON :', person); // => log : PERSON Person { name: 'Léa' }
person.hello(); // => log : Hello John !
```
Of course, the `create()` method could be called from another file.

## Unknown data value and shape

In many cases, you don't know the value of `data`, like results of http requests. You must check if data exists, if it respects the contract (has a correct shape), remove the eventual unnecessary properties and eventually add default values.
You can do all of this in one line with the `create()` method. In case of irrelevant data properties, wrong values format or missing properties, the `create()` method has specific behavior which we will now explain. In some cases, this behavior can be modified thanks to `geneseconfig.ts` file.
We will now explain this behavior for the different cases :

### Primitives

You want to check if the received data is a primitive (string, number or boolean) :

```ts
const foo: string = create('string', data);     // => foo equals data if data is a string, and undefined if not.
```
Please note the quotes around the word `string`. The only cases where you can omit the quotes are for classes or primitive constructors, like `create(Person, data)` or `create(String, data)`;

In the previous code, if data is equal to `1`, `foo` will be equal to `undefined`. Sometimes, you could prefer to identify strings and numbers and receive `'1'` instead of undefined. For that, you can change the behavior of the `create()` method by adding a specific option :

```ts
const foo: string = create('string', data, {castStringsAndNumbers: true}); // => foo equals '1' if data equals 1.
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

const foo: string = create('string', data);     // => Now foo equals '1' if data equals 1, without adding option inside the `create()` method.
```

At the opposite, you can cast strings and numbers for all your project with the config above, and not cast them for a specific call to the `create()` method by adding to it the option `castStringsAndNumbers: false`.

### Arrays

Arrays are mapped trivially like this :

```ts
const foo: string[] = create('string[]', ['blue', 'white']);                                // foo === ['blue', 'white'];
const bar: string[] = create('string[]', ['blue', 2]);                                      // foo === ['blue', undefined];
const baz: string[] = create('string[]', ['blue', 2], {castStringsAndNumbers: true});       // foo === ['blue', '2'];
```

### Classes

You want to cast `data` in a safe typed instance of a given class. 

```ts
export class Person {
	
	age: number;
	name: string;
	
	hello(): void {
		console.log(`Hello ${this.name} ! You are ${this.age} years old.`);
    }
}

const data = {name: 'John'};
const person: Person = create(Person, data);    // => person is a real Person object
person.hello(); // => logs 'Hello John ! You are 20 years old.'
```

- If `data` is undefined or is not an object, `create()` will return `undefined`.
- If `data` is an object, `create()` will return an instance of `Person`. In this case, let us examine in details the behavior of the `create()` method :
- If the property `name` is equal to `undefined` in data, the value of `name` will be equal to `undefined` in `person`
- If the property `name` not exists in `data`, the property `name` will not exist in `person`.

Examples :
```ts
create(Person, undefined);                      // undefined;
create(Person, {});                             // Person {};
create(Person, {name: undefined, age: 20});     // Person {name: undefined; age: 20};
create(Person, {age: 20});                      // Person {age: 20};
```

#### Irrelevant properties

If a property exists in `data` object but not in `Person`, this property is removed :

```ts
const data = {name: 'John', age: 20};
const person: Person = create(Person, data);    // person === Person {name: 'John'}
```

#### Properties with wrong type

If a `data` property has a wrong type, the value of this property in the mapped object will be equal to `undefined` or to the default value.

```ts
const data = {name: 20};
const person: Person = create(Person, data);    // person === Person {name: undefined}
```

With wrong type but identifying strings and numbers :

```ts
const data = {age: '20'};
const person: Person = create(Person, data, {castStringsAndNumbers: true});    // person === Person {age: 20}
```

With default property :

```ts
export class Person {
	name: string = 'John';
}

const data = {name: 3};
const person: Person = create(Person, data);    // person === Person {name: 'John'}
```

#### Constructor parameters

If your class has constructor parameters, the instance will be created by replacing each parameter by the corresponding `data` value or by undefined if this value not exists in data.

Without default value :
```ts
export class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

const data = {name: 'John'};
const person: Person = create(Person, data);    // person === Person {name: 'John'}
```

With default value :
```ts
export class Person {
    name: string;

    constructor(name: string = 'John') {
    	this.name = name;
    }
}

const data = {name: undefined};
const person: Person = create(Person, data);    // person === Person {name: 'John'}
```

#### Indexable keys

Indexable types are usable with `@genese/mapper` :

```ts
export class Person {
    name: string;
    [key: string]: string;

    constructor(name: string) {
        this.name = name;
    }
}

const data = {name: 'John', role: 'user'};
const person: Person = create(Person, data);    // person === Person {name: 'John', role: 'user'}
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
const person: Person = create(Person, data);    // person === Person {name: 'John', cat: Cat {name: 'Molly'}}
const molly: Cat = person.cat;                  // molly === Cat {name: 'Molly'}
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

Abstract classes can't be instantiated :

```ts
export abstract class AbstractPerson {
    name: string;
}
const data = {name: 'John'};
const person = create(AbstractPerson, data);    // person === undefined
```

#### Literal objects

If a property is typed with a literal object and if the corresponding data property don't have the same keys than the literal object, the result will be equal to undefined.
If `data` has the same keys but with a wrong format, these keys will be mapped as usual.

```ts
export class Person {
    address: {
    	country: string,
        city: string,
    };
}

const foo = {address: {country: 'Spain', city: 'Barcelona'}};
const fooPerson: Person = create(Person, data);     // person === Person {address: {country: 'Spain', city: 'Barcelona'}}

const bar = {address: {country: 'Spain', street: 'Ramblas'}};
const barPerson: Person = create(Person, data);     // person === Person {address: undefined}

const data = {address: {country: 'Spain', city: 23}};
const person: Person = create(Person, data);        // person === Person {address: {country: 'Spain', city: undefined}}
```

### Interfaces

The interfaces are treated as classes, with the specificities due to interfaces: the respect of the contract.

Please note that contrary to classes, the name of the interface must be surrounded by quotes. 
```ts
export interface Person {
	name: string;
	age: number;
	city?: string
}

create('Person', {name: 'John', age: 20, city: 'Milano'});      // person === Person {name: 'John', age: 20, city: 'Milano'}
create('Person', {name: 'John', age: 20});                      // person === Person {name: 'John', age: 20}
create('Person', {name: 'John'});                               // person === undefined
```

### Enums

If `data` value is one of the enum values, `@genese/mapper` will return this value. If not, it will return `undefined`.

As for interfaces or types, the name of the enum must be surrounded by quotes.

```ts
export enum Color {
	WHITE = 'White',
    BLACK = 'Black',
}

create('Color', 'White');                                       // 'White'
create('Color', 'Blue');                                        // undefined
```

### Tuples
