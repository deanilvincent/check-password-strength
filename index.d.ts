export interface Option {
  id: number;
  value?: string;
  minDiversity: number;
  minLength: number;
}

export interface FirstOption extends Option {
  minDiversity: 0;
  minLength: 0;
}

export type Options = [FirstOption, ...Option[]];

export const defaultOptions: Options;

export type DiversityType = "lowercase" | "uppercase" | "symbol" | "number";

export interface Result {
  id: number;
  value?: string;
  contains: DiversityType[];
  length: number;
}

export function passwordStrength(
  password: string,
  options?: Options,
  allowedSymbols?: string
): Result;
