defaultOptions = [
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
    minDiversity: 4,
    minLength: 8
  },
  {
    id: 3,
    value: "Very strong",
    minDiversity: 4,
    minLength: 10
  }
]

module.exports = (password, options = defaultOptions, allowedSymbols="!@#$%^&*") => {
  if (!password) {
    throw new Error("Password is empty.");
  }

  const rules = [
    {
      regex: "[a-z]",
      message: 'lowercase'
    },
    {
      regex: '[A-Z]',
      message: 'uppercase'
    },
    {
      regex: '[0-9]',
      message: 'number'
    },
  ]

  if (allowedSymbols) {
    rules.push({
      regex: `[${allowedSymbols}]`,
      message: 'symbol'
    })
  }

  let strength = {}

  strength.contains = rules
    .filter(rule => new RegExp(`${rule.regex}`).test(password))
    .map(rule => ({message: rule.message}))

  strength.length = password.length;

  let fulfilledOptions = options
    .filter(option => strength.contains.length >= option.minDiversity)
    .filter(option => strength.length >= option.minLength)
    .sort((o1, o2) => o2.id - o1.id)
    .map(option => ({id: option.id, value: option.value}))

  Object.assign(strength, fulfilledOptions[0])

  return strength;
};
