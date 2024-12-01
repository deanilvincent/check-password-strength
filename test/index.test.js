const {
  passwordStrength,
  defaultOptions,
  owaspSymbols,
} = require("../dist/index");
const cp = require("child_process");

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
  "Should return strength id 3 if password is Strong with symbol: s",
  (symbol) => {
    expect(passwordStrength(`A20abcdefg${symbol}`).id).toBe(3);
  }
);

//#endregion

it("Should return strength id 2 if password is Medium", () => {
  expect(passwordStrength("Asd1234!").id).toBe(2);
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
  expect(passwordStrength("Asd1234!").value).toBe("Medium");
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

overridenOptions = [
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
    minDiversity: 3,
    minLength: 8,
  },
  {
    id: 3,
    value: "Strong",
    minDiversity: 4,
    minLength: 10,
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
  expect(passwordStrength("abcd@")).toStrictEqual(
    passwordStrength("abdc@", defaultOptions)
  );
  expect(passwordStrength("abcd@E")).toStrictEqual(
    passwordStrength("abdc@E", defaultOptions)
  );
  expect(passwordStrength("abcd@3")).toStrictEqual(
    passwordStrength("abdc@3", defaultOptions)
  );
  expect(passwordStrength("abcd😛3")).toStrictEqual(
    passwordStrength("abcd😛3", defaultOptions)
  );
  expect(passwordStrength(null)).toStrictEqual(
    passwordStrength(null, defaultOptions)
  );
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

it("[cjs execution] Should require commonJs script", async (done) => {
  const command = "node test/cjs.cjs --pwd aze456";

  await cp.exec(command, (_stderr, stdout) => {
    expect(stdout.trim()).toStrictEqual("Weak");
    done();
  });
});

it("[cjs execution] Should require umd script", async (done) => {
  const command = "node test/umd.cjs --pwd aze456";

  await cp.exec(command, (_stderr, stdout) => {
    if (_stderr) console.error("error:", JSON.stringify(_stderr, null, 2));
    expect(stdout.trim()).toStrictEqual("Weak");
    done();
  });
});

it("[es execution] Should import esModule script", async (done) => {
  const command = "node test/es.mjs --pwd aze456";

  await cp.exec(command, (_stderr, stdout) => {
    if (_stderr) console.error("error:", JSON.stringify(_stderr, null, 2));
    expect(stdout.trim()).toStrictEqual("Weak");
    done();
  });
});
