module.exports = (password) => {
  if (!password) {
    throw new Error("Password is empty.");
  }

  const lowerCaseRegex = "(?=.*[a-z])";
  const upperCaseRegex = "(?=.*[A-Z])";
  const symbolsRegex = "(?=.*[!@#$%^&*])";
  const numericRegex = "(?=.*[0-9])";

  let strength = {
    id: null,
    value: null,
    length: null,
    contains: [],
  }; 
  
  // Default
  let passwordContains = [];

  if (new RegExp(`^${lowerCaseRegex}`).test(password)) {
    passwordContains = [
      ...passwordContains,
      {
        message: "lowercase",
      },
    ];
  }

  if (new RegExp(`^${upperCaseRegex}`).test(password)) {
    passwordContains = [
      ...passwordContains,
      {
        message: "uppercase",
      },
    ];
  }

  if (new RegExp(`^${symbolsRegex}`).test(password)) {
    passwordContains = [
      ...passwordContains,
      {
        message: "symbol",
      },
    ];
  }

  if (new RegExp(`^${numericRegex}`).test(password)) {
    passwordContains = [
      ...passwordContains,
      {
        message: "number",
      },
    ];
  }

  const strongRegex = new RegExp(
    `^${lowerCaseRegex}${upperCaseRegex}${numericRegex}${symbolsRegex}(?=.{8,})`
  );
  const mediumRegex = new RegExp(
    `^((${lowerCaseRegex}${upperCaseRegex})|(${lowerCaseRegex}${numericRegex})|(${upperCaseRegex}${numericRegex})|(${upperCaseRegex}${symbolsRegex})|(${lowerCaseRegex}${symbolsRegex})|(${numericRegex}${symbolsRegex}))(?=.{6,})`
  );

  if (strongRegex.test(password)) {
    strength = {
      id: 2,
      value: "Strong",
    };
  } else if (mediumRegex.test(password)) {
    strength = {
      id: 1,
      value: "Medium",
    };
  } else {
    strength = {
      id: 0,
      value: "Weak",
    };
  }
  strength.length = password.length;
  strength.contains = passwordContains;
  return strength;
};
