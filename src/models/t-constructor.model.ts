export interface TConstructor<T> {
    new(): T;
}

export type ClassConstructor<T> = new (...args: any[]) => T;
