import { expect, it } from 'vitest'
import {
  passwordStrength,
  defaultOptions,
  owaspSymbols,
} from "../dist/index";
import { execSync } from "child_process";

it("Should not modify the password parameter", () => {
  let pwd = "Hello!";
  passwordStrength(pwd);
  expect(pwd).toBe("Hello!");
});

it("Should return strength id 3 if password is Strong", () => {
  expect(passwordStrength("A@2asdF2020!!*!").id).toBe(3);
});

//#region INTRODUCE UPDATED DEFAULT SYMBOLS AND TEST EACH SYMBOL
it("Should return strength id 3 if password is Strong with these symbols: !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~", () => {
  expect(
    passwordStrength("A20abcdefg!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~").id
  ).toBe(3);
});

it.each([
  "!",
  "@",
  "#",
  "^",
  "&",
  "*",
  "!",
  '"',
  "'",
  "(",
  ")",
  "+",
  ",",
  "-",
  ".",
  "/",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "[",
  "]",
  "\\",
  "/",
  "^",
  "_",
  "`",
  "{",
  "}",
  "|",
  "~",
  "😛",
])(
  "Should return strength id 3 if password is Strong with symbol: %s",
  (symbol) => {
    expect(passwordStrength(`A20abcdefgh${symbol}`).id).toBe(3);
  }
);

//#endregion

it("Should return strength id 2 if password is Medium", () => {
  expect(passwordStrength("Asd123456!").id).toBe(2);
});

it("Should return strength id 1 if password is Weak", () => {
  expect(passwordStrength("asdf1234").id).toBe(1);
});

it("Should return strength id 1 if password has two combination of symbol + lowercase", () => {
  expect(passwordStrength("asdf!@#$").id).toBe(1);
});

it("Should return strength id 1 if password has two combination of symbol + uppercase", () => {
  expect(passwordStrength("ASDF!@#$").id).toBe(1);
});

it("Should return strength id 1 if password has two combination of symbol + numeric", () => {
  expect(passwordStrength("1234!@#$").id).toBe(1);
});

it("Should return strength id 0 if password is weak", () => {
  expect(passwordStrength("a").id).toBe(0);
});

it("Should return strength value 'Strong' if password is Medium", () => {
  expect(passwordStrength("A@2asdF2020!!*").value).toBe("Strong");
});

it("Should return strength value 'Medium' if password is Medium", () => {
  expect(passwordStrength("Asd123456!").value).toBe("Medium");
});

it("Should return strength value 'Weak' if password is Weak", () => {
  expect(passwordStrength("Asdf1234").value).toBe("Weak");
});

// pass combination
it("Should return strength value 'Weak' if password has two combination of symbol + lowercase", () => {
  expect(passwordStrength("asdf!@#$").value).toBe("Weak");
});

it("Should return strength value 'Weak' if password has two combination of symbol + uppercase", () => {
  expect(passwordStrength("ASDF!@#$").value).toBe("Weak");
});

it("Should return strength value 'Weak' if password has two combination of symbol + numeric", () => {
  expect(passwordStrength("1234!@#$").value).toBe("Weak");
});

it("Should return strength value 'Too weak' if password is weak", () => {
  expect(passwordStrength("a").value).toBe("Too weak");
});

it("Should return type of number if request for id", () => {
  expect(typeof passwordStrength("a").id).toBe("number");
});

it("Should return type of string if request for value", () => {
  expect(typeof passwordStrength("a").value).toBe("string");
});

it("Should return type of object if requesting directly from the function", () => {
  expect(typeof passwordStrength("a")).toBe("object");
});

// contains
it("Should return true if request for contains is an array", () => {
  const arrayData = Array.isArray(passwordStrength("a").contains);
  expect(arrayData).toEqual(true);
});

it("Should return contains of 'lowercase' if the password has lowercase", () => {
  const contains = passwordStrength("lower").contains;
  const contain = contains.find((x) => x === "lowercase");
  const condition = contain === "lowercase";
  expect(condition).toEqual(true);
});

it("Should return contains of 'uppercase' if the password has uppercase", () => {
  const contains = passwordStrength("Uppercase").contains;
  const contain = contains.find((x) => x === "uppercase");
  const condition = contain === "uppercase";
  expect(condition).toEqual(true);
});

it("Should return contains of 'symbol' if the password has symbol", () => {
  const contains = passwordStrength("!test").contains;
  const contain = contains.find((x) => x === "symbol");
  const condition = contain === "symbol";
  expect(condition).toEqual(true);
});

it("Should return contains of 'number' if the password has number", () => {
  const contains = passwordStrength("1234").contains;
  const contain = contains.find((x) => x === "number");
  const condition = contain === "number";
  expect(condition).toEqual(true);
});

it("Should return contains of all criteria (lowercase, uppercase, symbol & number)", () => {
  expect(passwordStrength("asdfASDF!@#$1234").contains).toStrictEqual([
    "lowercase",
    "uppercase",
    "number",
    "symbol",
  ]);
});

it("Should return contains of two or more message if the password has 2 or more message password criteria", () => {
  expect(passwordStrength("asdfASDF").contains).toStrictEqual([
    "lowercase",
    "uppercase",
  ]);
});

it("Should return contains length if contains has value", () => {
  expect(passwordStrength("asdfASDF").contains.length).toBe(2);
});

// length
it("Should return numeric length value if request for length", () => {
  expect(passwordStrength("1234").length).toBe(4);
});

it("Should return type of number if request is for length value", () => {
  expect(typeof passwordStrength("1234").length).toBe("number");
});

it("Should return an empty password result if password parameter is null", () => {
  expect(passwordStrength(null).id).toBe(0);
  expect(passwordStrength(null).length).toBe(0);
  expect(passwordStrength(null).contains).toStrictEqual([]);
});

const overridenOptions = [
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
    minLength: 8,
  },
  {
    id: 2,
    value: "Medium",
    minDiversity: 3,
    minLength: 10,
  },
  {
    id: 3,
    value: "Strong",
    minDiversity: 4,
    minLength: 12,
  },
];

it("[overridden options] Should return strength id 0 if password is weak", () => {
  expect(passwordStrength("aB1$", overridenOptions).id).toBe(0);
  expect(passwordStrength("aB1$", overridenOptions).value).toBe("Too weak");
});

it("[overridden options] Should return strength id 1 if password is Weak", () => {
  expect(passwordStrength("abcde123456", overridenOptions).id).toBe(1);
  expect(passwordStrength("abcde123456", overridenOptions).value).toBe("Weak");
});

it("[overridden options] Should return strength id 2 if password is Medium", () => {
  expect(passwordStrength("abcde123456$", overridenOptions).id).toBe(2);
  expect(passwordStrength("abcde123456$", overridenOptions).value).toBe(
    "Medium"
  );
});

it("[overridden options] Should return strength id 3 if password is Strong", () => {
  expect(passwordStrength("abcde123456$B", overridenOptions).id).toBe(3);
  expect(passwordStrength("abcde123456$B", overridenOptions).value).toBe(
    "Strong"
  );
});

it("[overridden options] Should return true if request for contains is an array", () => {
  const arrayData = Array.isArray(
    passwordStrength("a", overridenOptions).contains
  );
  expect(arrayData).toEqual(true);
});

it("[overridden options] Should return contains of 'lowercase' if the password has lowercase", () => {
  const contains = passwordStrength("lower", overridenOptions).contains;
  const contain = contains.find((x) => x === "lowercase");
  const condition = contain === "lowercase";
  expect(condition).toEqual(true);
});

it("[overridden options] Should return contains of 'uppercase' if the password has uppercase", () => {
  const contains = passwordStrength("Uppercase", overridenOptions).contains;
  const contain = contains.find((x) => x === "uppercase");
  const condition = contain === "uppercase";
  expect(condition).toEqual(true);
});

it("[overridden options] Should return contains of 'symbol' if the password has symbol", () => {
  const contains = passwordStrength("!test", overridenOptions).contains;
  const contain = contains.find((x) => x === "symbol");
  const condition = contain === "symbol";
  expect(condition).toEqual(true);
});

it("[overridden options] Should return contains of 'number' if the password has number", () => {
  const contains = passwordStrength("1234", overridenOptions).contains;
  const contain = contains.find((x) => x === "number");
  const condition = contain === "number";
  expect(condition).toEqual(true);
});

it("[overridden options] Should return the same object with the default option", () => {
  // Test core properties that should be identical
  const result1 = passwordStrength("abcd@");
  const result2 = passwordStrength("abdc@", defaultOptions);
  
  expect(result1.id).toBe(result2.id);
  expect(result1.value).toBe(result2.value);
  expect(result1.length).toBe(result2.length);
  expect(result1.contains.sort()).toEqual(result2.contains.sort());
  
  // Test that entropy fields exist (but may differ due to pattern detection)
  expect(typeof result1.entropy).toBe('number');
  expect(typeof result2.entropy).toBe('number');
  expect(Array.isArray(result1.patterns)).toBe(true);
  expect(Array.isArray(result2.patterns)).toBe(true);
});

it("[overridden restrictSymbolsTo] Should not contains symbols if the password does not have one", () => {
  const contains = passwordStrength("abcd@", undefined, "$").contains;
  expect(contains).toEqual(expect.arrayContaining(["lowercase"]));
  expect(contains).toEqual(expect.not.arrayContaining(["uppercase"]));
  expect(contains).toEqual(expect.not.arrayContaining(["number"]));
  expect(contains).toEqual(expect.not.arrayContaining(["symbol"]));
});

it("[overridden restrictSymbolsTo] Should contains symbols if the password have one", () => {
  const contains = passwordStrength("abcd@Ê", undefined, "Ê").contains;
  expect(contains).toEqual(expect.arrayContaining(["lowercase"]));
  expect(contains).toEqual(expect.not.arrayContaining(["uppercase"]));
  expect(contains).toEqual(expect.not.arrayContaining(["number"]));
  expect(contains).toEqual(expect.arrayContaining(["symbol"]));
});

it("[overridden restrictSymbolsTo] Should not contains symbols if the password have an accentuated character", () => {
  const contains = passwordStrength("abcdÊ", undefined, owaspSymbols).contains;
  expect(contains).toEqual(expect.arrayContaining(["lowercase"]));
  expect(contains).toEqual(expect.not.arrayContaining(["uppercase"]));
  expect(contains).toEqual(expect.not.arrayContaining(["number"]));
  expect(contains).toEqual(expect.not.arrayContaining(["symbol"]));
});

// see https://github.com/deanilvincent/check-password-strength/pull/81
it.each(["x$x", "x&x", "x&$x", "x$&x"])("[overridden restrictSymbolsTo] Should match symbols with etch cases: %s", (str) => {
  const contains = passwordStrength(str, undefined, "$][&").contains;
  expect(contains).toEqual(expect.arrayContaining(["symbol"]));
});

it("[cjs execution] Should require commonJs script", () => {
  const command = "node test/cjs.cjs --pwd aze45678";

  const result = execSync(command);
  expect(result.toString().trim()).toStrictEqual("Weak")
});

it("[cjs execution] Should require umd script", () => {
  const command = "node test/umd.cjs --pwd aze45678";

  const result = execSync(command);
  expect(result.toString().trim()).toStrictEqual("Weak")
});

it("[es execution] Should import esModule script", () => {
  const command = "node test/es.mjs --pwd aze45678";

  const result = execSync(command);
  expect(result.toString().trim()).toStrictEqual("Weak")
});

// Entropy calculation tests
it("Should calculate entropy for basic password", () => {
  const result = passwordStrength('test123');
  expect(result.entropy).toBeGreaterThan(0);
  expect(result.entropyGrade).toBeDefined();
  expect(Array.isArray(result.patterns)).toBe(true);
  expect(Array.isArray(result.recommendations)).toBe(true);
});

it("Should detect sequence patterns", () => {
  const result = passwordStrength('abc123');
  expect(result.patterns).toContain('sequence');
  expect(result.recommendations.some(r => r.includes('sequential'))).toBe(true);
});

it("Should detect repetition patterns", () => {
  const result = passwordStrength('aaa111');
  expect(result.patterns).toContain('repetition');
  expect(result.recommendations.some(r => r.includes('repeated'))).toBe(true);
});

it("Should detect keyboard patterns", () => {
  const result = passwordStrength('qwerty123');
  expect(result.patterns).toContain('keyboard');
  expect(result.recommendations.some(r => r.includes('keyboard'))).toBe(true);
});

it("Should detect dictionary words", () => {
  const result = passwordStrength('password123');
  expect(result.patterns).toContain('dictionary');
  expect(result.recommendations.some(r => r.includes('common words'))).toBe(true);
});

it("Should penalize weak patterns with lower entropy", () => {
  const weakPassword = passwordStrength('Password123!');
  const strongPassword = passwordStrength('Tr7$mK9#pL2x');
  
  expect(weakPassword.entropy).toBeLessThan(strongPassword.entropy);
});

it("Should grade entropy correctly", () => {
  // Test entropy grading thresholds
  const veryWeak = passwordStrength('123');
  const weak = passwordStrength('aaaaAAAA1111!!!!');
  const medium = passwordStrength('k9mPwX3nQ');
  const strong = passwordStrength('Tr7$mK9#pL2x');
  
  expect(veryWeak.entropyGrade).toBe('Too weak');
  expect(weak.entropyGrade).toBe('Weak');
  expect(medium.entropyGrade).toBe('Medium');
  expect(strong.entropyGrade).toBe('Strong');
});

it("Should provide length recommendations for short passwords", () => {
  const result = passwordStrength('Ab1!');
  expect(result.recommendations.some(r => r.includes('longer'))).toBe(true);
});

it("Should handle empty and null passwords gracefully with entropy", () => {
  const emptyResult = passwordStrength('');
  const nullResult = passwordStrength(null);
  
  expect(emptyResult.entropy).toBe(0);
  expect(nullResult.entropy).toBe(0);
});

it("Should maintain backward compatibility with entropy features", () => {
  const result = passwordStrength('Asd123456!');
  
  // Original properties should still exist
  expect(result.id).toBeDefined();
  expect(result.value).toBeDefined();
  expect(result.contains).toBeDefined();
  expect(result.length).toBeDefined();
  
  // New properties should be added
  expect(result.entropy).toBeDefined();
  expect(result.entropyGrade).toBeDefined();
  expect(result.patterns).toBeDefined();
  expect(result.recommendations).toBeDefined();
});

it("Should work with custom options and entropy", () => {
  const customOptions = [
    { id: 0, value: "Custom Weak", minDiversity: 0, minLength: 0 },
    { id: 1, value: "Custom Strong", minDiversity: 3, minLength: 10 }
  ];
  
  const result = passwordStrength('Tr7$mK9#pL2x', customOptions);
  
  expect(result.entropy).toBeDefined();
  expect(result.value).toContain('Custom');
});

it("Should detect multiple patterns simultaneously", () => {
  const result = passwordStrength('password123abc');
  
  expect(result.patterns.length).toBeGreaterThan(1);
  expect(result.patterns).toContain('sequence');
  expect(result.patterns).toContain('dictionary');
});

it("Should handle special characters in entropy calculation", () => {
  const result = passwordStrength('T3st!@#$%^&*()');
  
  expect(result.entropy).toBeGreaterThan(0);
  expect(result.contains).toContain('symbol');
});
