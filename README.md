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

- Example 1

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

- Example 2

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

In reality, even if this kind of usage can simplify the creation of known objects, the real power of `@genese/mapper` is to give you the possibility to create safe typed objects even when you don't know the data value or even the shape of data. We will see some examples in the next chapters.

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
console.log('PERSON :', person); // => logs Person {
person.hello();

```
