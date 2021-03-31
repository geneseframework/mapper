/**
 * Interface of the parameters used to construct a Date object
 */
export interface YearMonth {
    year: number,
    month: number
}

/**
 * The possible parameters which can be used to define a Date object
 */
export type DateConstructorParameters = string | number | YearMonth;
