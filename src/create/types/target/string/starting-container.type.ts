export type StartingContainer = `${'(' | '['}${string}`;


export function isStartingContainer(text: string): text is StartingContainer {
    return ['(', '['].includes(text?.[0]);
}
