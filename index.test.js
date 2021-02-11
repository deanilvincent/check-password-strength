const app = require("./index");

it("Should return strength id 2 if password is strong", () => {
  expect(app("Asdf12343!").id).toBe(2);
});

it("Should return strength id 1 if password is medium", () => {
  expect(app("Asdfasdf2020").id).toBe(1);
});

it("Should return strength id 1 if password has two combination of symbol + lowercase", () => {
  expect(app("asdf!@#$").id).toBe(1);
});

it("Should return strength id 1 if password has two combination of symbol + uppercase", () => {
  expect(app("ASDF!@#$").id).toBe(1);
});

it("Should return strength id 1 if password has two combination of symbol + numeric", () => {
  expect(app("1234!@#$").id).toBe(1);
});

it("Should return strength id 0 if password is weak", () => {
  expect(app("a").id).toBe(0);
});

it("Should return strength value 'Strong' if password is strong", () => {
  expect(app("Asdf12343!").value).toBe("Strong");
});

it("Should return strength value 'Medium' if password is medium", () => {
  expect(app("Asdf1234").value).toBe("Medium");
});

// pass combination
it("Should return strength value 'Medium' if password has two combination of symbol + lowercase", () => {
  expect(app("asdf!@#$").value).toBe("Medium");
});

it("Should return strength value 'Medium' if password has two combination of symbol + uppercase", () => {
  expect(app("ASDF!@#$").value).toBe("Medium");
});

it("Should return strength value 'Medium' if password has two combination of symbol + numeric", () => {
  expect(app("1234!@#$").value).toBe("Medium");
});

it("Should return strength value 'Weak' if password is weak", () => {
  expect(app("a").value).toBe("Weak");
});

it("Should return type of number if request for id", () => {
  expect(typeof app("a").id).toBe("number");
});

it("Should return type of string if request for value", () => {
  expect(typeof app("a").value).toBe("string");
});

it("Should return type of object if requesting directly from the function", () => {
  expect(typeof app("a")).toBe("object");
});

// contains
it("Should return true if request for contains is an array", () => {
  const arrayData = Array.isArray(app("a").contains);
  expect(arrayData).toEqual(true);
});

it("Should return contains of 'lowercase' if the password has lowercase", () => {
  const contains = app("lower").contains;
  const contain = contains.find((x) => x.message === "lowercase");
  const condition = contain.message === "lowercase";
  expect(condition).toEqual(true);
});

it("Should return contains of 'uppercase' if the password has uppercase", () => {
  const contains = app("Uppercase").contains;
  const contain = contains.find((x) => x.message === "uppercase");
  const condition = contain.message === "uppercase";
  expect(condition).toEqual(true);
});

it("Should return contains of 'symbol' if the password has symbol", () => {
  const contains = app("!test").contains;
  const contain = contains.find((x) => x.message === "symbol");
  const condition = contain.message === "symbol";
  expect(condition).toEqual(true);
});

it("Should return contains of 'number' if the password has number", () => {
  const contains = app("1234").contains;
  const contain = contains.find((x) => x.message === "number");
  const condition = contain.message === "number";
  expect(condition).toEqual(true);
});

it("Should return contains of all criteria (lowercase, uppercase, symbol & number)", () => {
  expect(app("asdfASDF!@#$1234").contains).toStrictEqual([
    { message: "lowercase" },
    { message: "uppercase" },
    { message: "number" },
    { message: "symbol" },
  ]);
});

it("Should return contains of two or more message if the password has 2 or more message password criteria", () => {
  expect(app("asdfASDF").contains).toStrictEqual([
    { message: "lowercase" },
    { message: "uppercase" },
  ]);
});

it("Should return contains length if contains has value", () => {
  expect(app("asdfASDF").contains.length).toBe(2);
});

// length
it("Should return numeric length value if request for length", () => {
  expect(app("1234").length).toBe(4);
});

it("Should return type of number if request is for length value", () => {
  expect(typeof app("1234").length).toBe("number");
});

// exception
it("Should throw an exception if password parameter is empty", () => {
  expect(() => app(null)).toThrow("Password is empty.");
});

overridenOptions = [
  {
    id: 0,
    value: "Weak",
    minDiversity: 0,
    minLength: 0
  },
  {
    id: 1,
    value: "Medium",
    minDiversity: 2,
    minLength: 6
  },
  {
    id: 2,
    value: "Strong",
    minDiversity: 3,
    minLength: 8
  },
  {
    id: 3,
    value: "Very strong",
    minDiversity: 4,
    minLength: 10
  }
]

it("[overridden options] Should return strength id 0 if password is weak", () => {
  expect(app("aB1$", overridenOptions).id).toBe(0);
  expect(app("aB1$", overridenOptions).value).toBe("Weak");
});

it("[overridden options] Should return strength id 1 if password is medium", () => {
  expect(app("abcde123456", overridenOptions).id).toBe(1);
  expect(app("abcde123456", overridenOptions).value).toBe("Medium");
});

it("[overridden options] Should return strength id 2 if password is strong", () => {
  expect(app("abcde123456$", overridenOptions).id).toBe(2);
  expect(app("abcde123456$", overridenOptions).value).toBe("Strong");
});

it("[overridden options] Should return strength id 3 if password is very strong", () => {
  expect(app("abcde123456$B", overridenOptions).id).toBe(3);
  expect(app("abcde123456$B", overridenOptions).value).toBe("Very strong");
});

it("[overridden options] Should return true if request for contains is an array", () => {
  const arrayData = Array.isArray(app("a", overridenOptions).contains);
  expect(arrayData).toEqual(true);
});

it("[overridden options] Should return contains of 'lowercase' if the password has lowercase", () => {
  const contains = app("lower", overridenOptions).contains;
  const contain = contains.find((x) => x.message === "lowercase");
  const condition = contain.message === "lowercase";
  expect(condition).toEqual(true);
});

it("[overridden options] Should return contains of 'uppercase' if the password has uppercase", () => {
  const contains = app("Uppercase", overridenOptions).contains;
  const contain = contains.find((x) => x.message === "uppercase");
  const condition = contain.message === "uppercase";
  expect(condition).toEqual(true);
});

it("[overridden options] Should return contains of 'symbol' if the password has symbol", () => {
  const contains = app("!test", overridenOptions).contains;
  const contain = contains.find((x) => x.message === "symbol");
  const condition = contain.message === "symbol";
  expect(condition).toEqual(true);
});

it("[overridden options] Should return contains of 'number' if the password has number", () => {
  const contains = app("1234", overridenOptions).contains;
  const contain = contains.find((x) => x.message === "number");
  const condition = contain.message === "number";
  expect(condition).toEqual(true);
});

it("[overridden allowedSymbols] Should not contains symbols if the password does not have one", () => {
  const contains = app("abcd@", undefined, '$').contains;
  expect(contains.map(c => c.message)).toEqual(expect.arrayContaining(['lowercase']));
  expect(contains.map(c => c.message)).toEqual(expect.not.arrayContaining(['uppercase']));
  expect(contains.map(c => c.message)).toEqual(expect.not.arrayContaining(['number']));
  expect(contains.map(c => c.message)).toEqual(expect.not.arrayContaining(['symbol']));
});

it("[overridden allowedSymbols] Should contains symbols if the password have one", () => {
  const contains = app("abcd@Ê", undefined, 'Ê').contains;
  expect(contains.map(c => c.message)).toEqual(expect.arrayContaining(['lowercase']));
  expect(contains.map(c => c.message)).toEqual(expect.not.arrayContaining(['uppercase']));
  expect(contains.map(c => c.message)).toEqual(expect.not.arrayContaining(['number']));
  expect(contains.map(c => c.message)).toEqual(expect.arrayContaining(['symbol']));
});