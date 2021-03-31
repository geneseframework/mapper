/**
 * Texts which are composed by only one word (this type is just an alias of 'string' used to clarify the kind of the returned values of some functions
 */
export type Word = string;

/**
 * Returns the first word of a given text
 * @param text      // The text to analyze
 */
export function firstWord(text: string): Word {
    return text.match(/\w+/g)[0];
}
