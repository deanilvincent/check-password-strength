export interface Option<V> {
  id: number;
  value: V;
  minDiversity: number;
  minLength: number;
}

export interface FirstOption<V> extends Option<V> {
  minDiversity: 0;
  minLength: 0;
}

export type Options<V> = [FirstOption<V>, ...Option<V>[]];

export const defaultOptions: Options<string>;

export type DiversityType = "lowercase" | "uppercase" | "symbol" | "number";

export interface Result<V> {
  id: number;
  value: V;
  contains: DiversityType[];
  length: number;
}

export function passwordStrength<V = string>(
  password: string,
  options?: Options<V>,
  allowedSymbols?: string,
): Result<V>;
