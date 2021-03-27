export type Word = string;


export function isWord(text: string): text is Word {
    return /\w+/g.test(text);
}


export function firstWord(text: string): Word {
    return text.match(/\w+/g)[0];
}
