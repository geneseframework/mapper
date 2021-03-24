
export type SameBooleans = [true, true] | [false, false];

export function areBothTrueOrFalse(firstAndLast: [first: boolean, last: boolean]): firstAndLast is SameBooleans {
    return (firstAndLast[0] && firstAndLast[1]) || (!firstAndLast[0] && !firstAndLast[1]);
}
