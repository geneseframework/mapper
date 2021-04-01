import { Property } from './target/property.type';
import { IndexableType } from './indexable-type.type';

/**
 * Type composed by an IndexableType and an array of Property
 */
export type ClassOrInterfaceInfo = {
    indexableType: IndexableType;
    properties: Property[];
}
