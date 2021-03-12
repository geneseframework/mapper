import { IndexableTypeInit } from './indexable-type-init.type';
import { PropertyInit } from './property.type';

export type ClassOrInterfaceInfoInit = {
    indexableType: IndexableTypeInit;
    properties: PropertyInit[];
}
