export type Extends = `${string} extends ${string}`;

export function hasExtends(text: string): text is Extends {
    return /\w+ extends \w+/g.test(text);
}
