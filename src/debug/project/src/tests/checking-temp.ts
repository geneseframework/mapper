class FooClass {

    static foo(data: string): string
    static foo(data: any): string | number
    static foo(data: any): string | number {
        return typeof data === 'string' ? 'a' : 1;
    }
}

let foo1: any;
const bar1: string | number = FooClass.foo(foo1);


console.log('FOOCLASS TESTS')
//
//     static foo(data: string): string
//     static foo(data: NotAString): Error
//     static foo(data: any): string | Error {
//         if (typeof data === 'string') {
//             return 'a';
//         } else {
//             return new Error();
//         }
//     }
// }
// let foo1: string;
// const bar1: string = FooClass.foo(foo1);  // No error
// let foo2: any;
// const bar2: string = FooClass.foo(foo2);  // No error
// let foo3: number;
// const bar3: string = FooClass.foo(foo3);  // Error (displayed on the IDE)
// let foo4: Bar;
// const bar4: string = FooClass.foo(foo4);  // Error (displayed on the IDE)
