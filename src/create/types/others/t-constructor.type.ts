/**
 * Constructors of classes with T type
 */
export type TConstructor<T> = new (...args: any[]) => T;
