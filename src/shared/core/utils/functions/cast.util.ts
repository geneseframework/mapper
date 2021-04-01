/**
 * Cast strings in numbers and inversely
 * @param typeName      // The type to cast in ('string' | 'number')
 * @param data          // The data to cast
 */
export function castStringAndNumbers(typeName: 'string' | 'number', data: string | number): string | number | typeof NaN {
    if (typeName === 'string') {
        return data?.toString();
    } else if (typeName === 'number') {
        return Number(data);
    } else {
        return data;
    }
}
