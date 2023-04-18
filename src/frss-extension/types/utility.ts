/**
 * Utility type that has at least one property of its type required
 */
export type PartiallyRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;
