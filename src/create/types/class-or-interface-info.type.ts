import { Property } from './target/property.type';
import { IndexableType } from './indexable-type.type';

export type ClassOrInterfaceInfo = {
    indexableType: IndexableType;
    properties: Property[];
}
