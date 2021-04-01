/**
 * Throws a warning with a given message and an eventual value linked to this message
 * @param message   //  The message to display
 * @param value     // The eventual value linked to message
 */
export function throwWarning(message = '', value: any = ''): void {
    console.log(`Warning : ${message}\n`, value);
}
