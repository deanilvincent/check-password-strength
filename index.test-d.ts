import { expectType } from "tsd";
import { DiversityType, passwordStrength } from "./index";

// Test result types
expectType<string>(passwordStrength("asdfasdf").value);
expectType<number>(passwordStrength("asdfasdf").id);
expectType<number>(passwordStrength("asdfasdf").length);
expectType<DiversityType[]>(passwordStrength("asdfasdf").contains);

// Test options with custom value (string)
expectType<string>(
  passwordStrength("asdfasdf", [
    {
      id: 0,
      value: "Too weak",
      minDiversity: 0,
      minLength: 0,
    },
    {
      id: 1,
      value: "Weak",
      minDiversity: 2,
      minLength: 6,
    },
    {
      id: 2,
      value: "Medium",
      minDiversity: 4,
      minLength: 8,
    },
    {
      id: 3,
      value: "Strong",
      minDiversity: 4,
      minLength: 10,
    },
  ]).value
);

// Test options with custom value (object)
expectType<{ message: string, color: string }>(
  passwordStrength("asdfasdf", [
    {
      id: 0,
      value: {message: "Too weak", color: "red"},
      minDiversity: 0,
      minLength: 0,
    },
    {
      id: 1,
      value: {message: "Weak", color: "orange"},
      minDiversity: 2,
      minLength: 6,
    },
    {
      id: 2,
      value: {message: "Medium", color: "yellow"},
      minDiversity: 4,
      minLength: 8,
    },
    {
      id: 3,
      value: {message: "Strong", color: "green"},
      minDiversity: 4,
      minLength: 10,
    },
  ]).value
);
