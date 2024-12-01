function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var src = {exports: {}};

const defaultOptions = [
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
];

const owaspSymbols = "!\"#$%&'()*+,-./:;<=>?@[\\\\\\]^_`{|}~";

const passwordStrength = (
  password,
  options = defaultOptions,
  restrictSymbolsTo
) => {
  options[0].minDiversity = 0;
  options[0].minLength = 0;

  // prevent [a-z] to match null and compute length
  const _password = password ?? "";

  const rules = [
    {
      key: "lowercase",
      regex: "[a-z]",
    },
    {
      key: "uppercase",
      regex: "[A-Z]",
    },
    {
      key: "number",
      regex: "[0-9]",
    },
    {
      key: "symbol",
      regex: restrictSymbolsTo ? `[${restrictSymbolsTo}]` : "[^a-zA-Z0-9]",
    },
  ];

  let strength = {};

  strength.contains = rules
    .filter((rule) => new RegExp(`${rule.regex}`).test(_password))
    .map((rule) => rule.key);

  strength.length = _password.length;

  let fulfilledOptions = options
    .filter((option) => strength.contains.length >= option.minDiversity)
    .filter((option) => strength.length >= option.minLength)
    .sort((o1, o2) => o2.id - o1.id)
    .map((option) => ({ id: option.id, value: option.value }));

  Object.assign(strength, fulfilledOptions[0]);

  return strength;
};

src.exports = { passwordStrength, defaultOptions, owaspSymbols };
var passwordStrength_1 = src.exports.passwordStrength = passwordStrength;
var defaultOptions_1 = src.exports.defaultOptions = defaultOptions;
var owaspSymbols_1 = src.exports.owaspSymbols = owaspSymbols;

var srcExports = src.exports;
var index = /*@__PURE__*/getDefaultExportFromCjs(srcExports);

export { index as default, defaultOptions_1 as defaultOptions, owaspSymbols_1 as owaspSymbols, passwordStrength_1 as passwordStrength };
