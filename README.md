# genese-mapper
Generic mapper of javascript objects.

## Table of Contents
* [Why use genese-mapper ?](#why-use-genese)
* [Installation](#installation)
* [Models](#models)
* [Methods](#methods)
* [Other tools](#other-tools)


## Why use genese-mapper

genese-mapper is the core module of the ***Genese*** framework. With genese-mapper, you can transform untyped javascript objects into typed objects. The most common use of genese-mapper is to transform `json` http responses into typed objects (with your own models). 

genese-mapper can be used alone if you just need to type some javascript objects, but is much more powerful inside other genese modules, like [genese-angular](https://www.npmjs.com/package/genese-angular), which is combining generic http data-services and generic mapper service. For example, with genese-angular, you can just remove all your long and fastidious data-services and mappers : one line in your components is enough !

- Example 


Supposing that in your environment.ts, `genese.api = http://localhost:3000` .

``books.component.ts``
```ts
export class BooksComponent {

    public booksGenese: Genese<Book>;

    constructor(private geneseService: GeneseService) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }

    this.booksGenese.getOne('/books', '1').subscribe((book: Book) => {
         // book is the data returned by 
         // the request http://localhost:3000/books/1
         // and formatted with type Book
    });
}
```

In this simple example, the line `this.booksGenese.getOne('/books', '1')` sends a GET request with the Angular `HttpClient` method, and returns an object of type `Book` (which is a model that you defined beforehand).

But under the hood, genese-angular calls the genese-mapper module, which is the real generic mapper. 
The genese-angular module simply added genese-mapper as dependency.

That's why you can use genese-mapper alone, or use it as a dependency of another module, like genese-angular.

A complete demonstration of use of genese-mapper with genese-angular is available here : [genese-angular-demo](https://www.npmjs.com/package/genese-angular-demo).

[Top](#table-of-contents)
## Installation

Install the npm module:

```sh
npm install genese-mapper --save
```

[Top](#table-of-contents) 
## Models

Genese needs to be able to find all the properties of your models. That's why it is imperative to set default values to all the properties of your models, including inside nested objects.
Respecting this constraint, Genese will be able to return all the objects correctly formatted.

* Note

A Genese good practice is to set all the properties of your models as optional. It will be easier to create new objects and will not crash if one day you forget to set a property.

[Top](#table-of-contents) -> [Models](#models)
### Primitives
* Example with primitives

```ts
export class Book = {
    id ?= '';
    codeNumbers: number[] = [0];
    collectionNumber?: 0;
    isAvailable?: true;
    name ?= '';
}
```

[Top](#table-of-contents) -> [Models](#models)
### Nested objects
* Example with nested object

```ts
export class Book = {
    id ?= '';
    public editor?: {
        name?: string,
        place?: {
            city?: string,
            country?: string
        }
    } = {
        name: '',
        place: {
            city: '',
            country: ''
        }
    };
}
```

[Top](#table-of-contents) -> [Models](#models)
### Indexable types

Suppose that you wait http responses like this 
```ts
{
    en: 'The caves of steel',
    fr: 'Les cavernes d\'acier'
}
``` 
and suppose that you don't know in advance how many properties will have your response. In this example, you don't know in advance how many translations you will receive and in which languages.
In this case, you need to use indexable types like this :

```ts
export class Book = {
    [key: string]: string
}
```
This is the simplest example of indexable types.
Now, suppose that your http request returns something more complex like this :

```ts
{
    en: {
        country: 'England',
        name: 'The caves of steel'
    },
    fr: {
        country: 'France',
        name: 'Les cavernes d\'acier'
    }
}
```

In this case, you simply need to define your Genese model like this :
```ts
export class Book = {
    [key: string]: {
        country?: string,
        name?: string
    } = {
        gnIndexableType: {
            country: '',
            name: ''
        }
    }
}
```

The ``gnIndexableType`` key is a special key used by Genese to understand that you wait a response with indexableTypes.
You'll need to use it every time you'll have to use indexable types.

[Top](#table-of-contents)
## Usage

At first, define your model :

`book.model.ts` 
```ts
export class Book = {
    id ?= '';
    collectionNumber ?= 0;
    editor?: {
        country: string,
        name: string
    } = { country: '', name: ''};
    isAvailable?: true;
    name ?= '';
}
```

Then, simply create a new GeneseMapper defined with the Book class : 

```ts
    const geneseMapper = new GeneseMapper(Book); 
```

Now, you're ready to use genese-mapper methods ! 

[Top](#table-of-contents)
## Methods

 genese-mapper exports two main methods :
 
 ### map(data: any): T
 
 This method receives a javascript object without any type, and returns a Typescript object with T type. T is the name of the class used to create your GeneseMapper: (`Book` in our case).
 
 - Example
 
```ts
class Book = {
    id ?= '';
    collectionNumber ?= 0;
    editor?: {
        country: string,
        name: string
    } = { country: '', name: ''};
    isAvailable?: true;
    name ?= '';
    other ?= undefined;
}

const data = {
    id: 1,
    collectionNumber: 3,
    editor: {
        country: 'France',
        name: 'Gallimard',
        town: 'Paris'
    },
    name: 'The caves of steel',
    other: 'Author: Isaac Asimov',
    price: 10
}

const geneseMapper = new GeneseMapper(Book); 

const book: Book = geneseMapper.map(data);

// book will be equal to :

{
    id: '1',
    collectionNumber: 3,
    editor: {
        country: 'France',
        name: 'Gallimard',
    },
    isAvailable: true,
    name: 'The caves of steel',
    other: 'Author: Isaac Asimov',
}

```

As you can see, `book` is a Typescript object with type `Book`. genese-mapper looped on the properties of the `Book` class, and checked if data have the same property names with the expected type, including in nested objects.

***Note***

- If some properties of data object are not in your model, like `price` or `editor.town`, they are simply removed.
- If some properties of the class are not present in data object, the value by default is used, like for the `iSavailable` property.
- Numbers are automatically casted in strings if necessary (like for `id` property), and inversely (if the string can be cast in number). 
- When you set a default value to `undefined` in your model, genese accepts any kind of data for this property, like for `other` property.

### arrayMap(data: any[]): T[]

This method simply uses the `.map()` method for each element of the `data` array, and returns an array of Typescript object with type T.

- Example


 
```ts
class Book = {
    id ?= '';
    isAvailable?: true;
    name ?= '';
}

const data = [
    {
        id: 1,
        name: 'The caves of steel',
        price: 10
    },
    {
        id: 2,
        name: 'Robots and Empire',
        price: 20
    }
]

const geneseMapper = new GeneseMapper(Book); 

const books: Book[] = geneseMapper.arrayMap(data);

// books will be equal to :
[
    {
        id: '1',
        isAvailable: true,
        name: 'The caves of steel'
    },
    {
        id: '2',
        isAvailable: true,
        name: 'Robots and Empire'
    }
]

```

[Top](#table-of-contents)
## Other tools

`.map()` and `arrayMap()` are the main Genese methods, but genese-mapper provides you some other tools which can be very useful :


### clone(model: any): any

Makes a deep copy of an object and returns its clone. 

### isPrimitive(target: any): boolean

Returns `true` if the type of `target` is `string`, `boolean` or `number`, `false` if not.

### isSameObject(obj1: any, obj2: any): boolean

Returns `true` if `obj1` and `obj2` are "equivalent", ie if they have the same keys with the same values, even in deep nested objects. Returns `false` if not.
