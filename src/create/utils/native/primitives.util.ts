export function castStringAndNumbers(typeName: string, data: string | number): string | number | typeof NaN {
    if (typeName === 'string') {
        return data?.toString();
    } else if (typeName === 'number') {
        return Number(data);
    } else {
        return data;
    }
}
