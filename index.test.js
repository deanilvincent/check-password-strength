const {passwordStrength: app, defaultOptions} = require("./index");

it("Should not modify the password parameter", () => {
  let pwd = "Hello!"
  app(pwd)
  expect(pwd).toBe("Hello!")
})

it("Should return strength id 3 if password is Strong", () => {
  expect(app("A@2asdF2020!!*!").id).toBe(3);
});

//#region INTRODUCE UPDATED DEFAULT SYMBOLS AND TEST EACH SYMBOL
it("Should return strength id 3 if password is Strong with these symbols: !\"#\$%&'\(\)\*\+,-\./:;<=>\?@\[\\]\^_`\{|\}~", () => {
  expect(app("A20abcdefg!\"#\$%&'\(\)\*\+,-\./:;<=>\?@\[\\]\^_`\{|\}~").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: !", () => {
  expect(app("A20abcdefg!").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: @", () => {
  expect(app("A20abcdefg@").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: #", () => {
  expect(app("A20abcdefg#").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: ^", () => {
  expect(app("A20abcdefg^").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: &", () => {
  expect(app("A20abcdefg&").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: *", () => {
  expect(app("A20abcdefg*").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: !", () => {
  expect(app("A20abcdefg!").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: \"", () => {
  expect(app("A20abcdefg\"").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: '", () => {
  expect(app("A20abcdefg'").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: (", () => {
  expect(app("A20abcdefg(").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: )", () => {
  expect(app("A20abcdefg)").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: +", () => {
  expect(app("A20abcdefg+").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: ,", () => {
  expect(app("A20abcdefg,").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: -", () => {
  expect(app("A20abcdefg-").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: .", () => {
  expect(app("A20abcdefg.").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: /", () => {
  expect(app("A20abcdefg/").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: :", () => {
  expect(app("A20abcdefg:").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: ;", () => {
  expect(app("A20abcdefg;").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: <", () => {
  expect(app("A20abcdefg>").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: =", () => {
  expect(app("A20abcdefg=").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: >", () => {
  expect(app("A20abcdefg>").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: ?", () => {
  expect(app("A20abcdefg?").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: [", () => {
  expect(app("A20abcdefg[").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: ]", () => {
  expect(app("A20abcdefg]").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: \\", () => {
  expect(app("A20abcdefg\\").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: \\", () => {
  expect(app("A20abcdefg\\").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: ^", () => {
  expect(app("A20abcdefg^").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: _", () => {
  expect(app("A20abcdefg_").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: `", () => {
  expect(app("A20abcdefg`").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: {", () => {
  expect(app("A20abcdefg{").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: }", () => {
  expect(app("A20abcdefg}").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: |", () => {
  expect(app("A20abcdefg|").id).toBe(3);
});

it("Should return strength id 3 if password is Strong with symbol: ~", () => {
  expect(app("A20abcdefg~").id).toBe(3);
});

//#endregion

it("Should return strength id 2 if password is Medium", () => {
  expect(app("Asd1234!").id).toBe(2);
});

it("Should return strength id 1 if password is Weak", () => {
  expect(app("asdf1234").id).toBe(1);
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

it("Should return strength value 'Strong' if password is Medium", () => {
  expect(app("A@2asdF2020!!*").value).toBe("Strong");
});

it("Should return strength value 'Medium' if password is Medium", () => {
  expect(app("Asd1234!").value).toBe("Medium");
});

it("Should return strength value 'Weak' if password is Weak", () => {
  expect(app("Asdf1234").value).toBe("Weak");
});

// pass combination
it("Should return strength value 'Weak' if password has two combination of symbol + lowercase", () => {
  expect(app("asdf!@#$").value).toBe("Weak");
});

it("Should return strength value 'Weak' if password has two combination of symbol + uppercase", () => {
  expect(app("ASDF!@#$").value).toBe("Weak");
});

it("Should return strength value 'Weak' if password has two combination of symbol + numeric", () => {
  expect(app("1234!@#$").value).toBe("Weak");
});

it("Should return strength value 'Too weak' if password is weak", () => {
  expect(app("a").value).toBe("Too weak");
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
  const contain = contains.find((x) => x === "lowercase");
  const condition = contain === "lowercase";
  expect(condition).toEqual(true);
});

it("Should return contains of 'uppercase' if the password has uppercase", () => {
  const contains = app("Uppercase").contains;
  const contain = contains.find((x) => x === "uppercase");
  const condition = contain === "uppercase";
  expect(condition).toEqual(true);
});

it("Should return contains of 'symbol' if the password has symbol", () => {
  const contains = app("!test").contains;
  const contain = contains.find((x) => x === "symbol");
  const condition = contain === "symbol";
  expect(condition).toEqual(true);
});

it("Should return contains of 'number' if the password has number", () => {
  const contains = app("1234").contains;
  const contain = contains.find((x) => x === "number");
  const condition = contain === "number";
  expect(condition).toEqual(true);
});

it("Should return contains of all criteria (lowercase, uppercase, symbol & number)", () => {
  expect(app("asdfASDF!@#$1234").contains).toStrictEqual([
    "lowercase",
    "uppercase",
    "number",
    "symbol",
  ]);
});

it("Should return contains of two or more message if the password has 2 or more message password criteria", () => {
  expect(app("asdfASDF").contains).toStrictEqual([
    "lowercase",
    "uppercase",
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

it("Should return an empty password result if password parameter is null", () => {
  expect(app(null).id).toBe(0);
  expect(app(null).length).toBe(0);
  expect(app(null).contains).toStrictEqual([]);
});

overridenOptions = [
  {
    id: 0,
    value: "Too weak",
    minDiversity: 0,
    minLength: 0
  },
  {
    id: 1,
    value: "Weak",
    minDiversity: 2,
    minLength: 6
  },
  {
    id: 2,
    value: "Medium",
    minDiversity: 3,
    minLength: 8
  },
  {
    id: 3,
    value: "Strong",
    minDiversity: 4,
    minLength: 10
  }
]

it("[overridden options] Should return strength id 0 if password is weak", () => {
  expect(app("aB1$", overridenOptions).id).toBe(0);
  expect(app("aB1$", overridenOptions).value).toBe("Too weak");
});

it("[overridden options] Should return strength id 1 if password is Weak", () => {
  expect(app("abcde123456", overridenOptions).id).toBe(1);
  expect(app("abcde123456", overridenOptions).value).toBe("Weak");
});

it("[overridden options] Should return strength id 2 if password is Medium", () => {
  expect(app("abcde123456$", overridenOptions).id).toBe(2);
  expect(app("abcde123456$", overridenOptions).value).toBe("Medium");
});

it("[overridden options] Should return strength id 3 if password is Strong", () => {
  expect(app("abcde123456$B", overridenOptions).id).toBe(3);
  expect(app("abcde123456$B", overridenOptions).value).toBe("Strong");
});

it("[overridden options] Should return true if request for contains is an array", () => {
  const arrayData = Array.isArray(app("a", overridenOptions).contains);
  expect(arrayData).toEqual(true);
});

it("[overridden options] Should return contains of 'lowercase' if the password has lowercase", () => {
  const contains = app("lower", overridenOptions).contains;
  const contain = contains.find((x) => x === "lowercase");
  const condition = contain === "lowercase";
  expect(condition).toEqual(true);
});

it("[overridden options] Should return contains of 'uppercase' if the password has uppercase", () => {
  const contains = app("Uppercase", overridenOptions).contains;
  const contain = contains.find((x) => x === "uppercase");
  const condition = contain === "uppercase";
  expect(condition).toEqual(true);
});

it("[overridden options] Should return contains of 'symbol' if the password has symbol", () => {
  const contains = app("!test", overridenOptions).contains;
  const contain = contains.find((x) => x === "symbol");
  const condition = contain === "symbol";
  expect(condition).toEqual(true);
});

it("[overridden options] Should return contains of 'number' if the password has number", () => {
  const contains = app("1234", overridenOptions).contains;
  const contain = contains.find((x) => x === "number");
  const condition = contain === "number";
  expect(condition).toEqual(true);
});

it("[overridden options] Should return the same object with the default option", () => {
  expect(app("abcd@")).toStrictEqual(app('abdc@', defaultOptions))
  expect(app("abcd@E")).toStrictEqual(app('abdc@E', defaultOptions))
  expect(app("abcd@3")).toStrictEqual(app('abdc@3', defaultOptions))
  expect(app(null)).toStrictEqual(app(null, defaultOptions))
});

it("[overridden allowedSymbols] Should not contains symbols if the password does not have one", () => {
  const contains = app("abcd@", undefined, '$').contains;
  expect(contains).toEqual(expect.arrayContaining(['lowercase']));
  expect(contains).toEqual(expect.not.arrayContaining(['uppercase']));
  expect(contains).toEqual(expect.not.arrayContaining(['number']));
  expect(contains).toEqual(expect.not.arrayContaining(['symbol']));
});

it("[overridden allowedSymbols] Should contains symbols if the password have one", () => {
  const contains = app("abcd@Ê", undefined, 'Ê').contains;
  expect(contains).toEqual(expect.arrayContaining(['lowercase']));
  expect(contains).toEqual(expect.not.arrayContaining(['uppercase']));
  expect(contains).toEqual(expect.not.arrayContaining(['number']));
  expect(contains).toEqual(expect.arrayContaining(['symbol']));
});
