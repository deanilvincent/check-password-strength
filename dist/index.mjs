import escapeStringRegexp from 'escape-string-regexp';

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
    minLength: 8,
  },
  {
    id: 2,
    value: "Medium",
    minDiversity: 4,
    minLength: 10,
  },
  {
    id: 3,
    value: "Strong",
    minDiversity: 4,
    minLength: 12,
  },
];

const owaspSymbols = "!\"#$%&'()*+,-./\\:;<=>?@[]^_`{|}~";

// Entropy calculation functions
const calculateBaseEntropy = (password) => {
  if (!password || password.length === 0) return 0;
  
  // Character set size calculation
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);
  
  let charsetSize = 0;
  if (hasLowercase) charsetSize += 26;
  if (hasUppercase) charsetSize += 26;
  if (hasNumbers) charsetSize += 10;
  if (hasSymbols) charsetSize += 32; // Approximate symbol count
  
  // Basic entropy: log2(charset^length)
  return charsetSize > 0 ? Math.log2(Math.pow(charsetSize, password.length)) : 0;
};

const detectPatterns = (password) => {
  const patterns = [];
  const lowerPassword = password.toLowerCase();
  
  // Sequential patterns (abc, 123, etc.)
  const hasSequence = (str) => {
    for (let i = 0; i < str.length - 2; i++) {
      const char1 = str.charCodeAt(i);
      const char2 = str.charCodeAt(i + 1);
      const char3 = str.charCodeAt(i + 2);
      if (char2 === char1 + 1 && char3 === char2 + 1) return true;
    }
    return false;
  };
  
  // Repetition patterns (aaa, 111, etc.)
  const hasRepetition = (str) => {
    return /(.)\1{2,}/.test(str);
  };
  
  // Keyboard patterns (qwerty, asdf, etc.)
  const keyboardRows = [
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm',
    '1234567890'
  ];
  
  const hasKeyboardPattern = (str) => {
    return keyboardRows.some(row => {
      for (let i = 0; i <= row.length - 3; i++) {
        if (str.includes(row.substring(i, i + 3))) return true;
      }
      return false;
    });
  };
  
  // Dictionary-like patterns (common words)
  const commonWords = [
    'password', 'admin', 'user', 'login', 'welcome', 'qwerty', 'abc', 'test',
    'hello', 'world', 'letmein', 'monkey', 'dragon', 'master', 'trustno1'
  ];
  
  const hasDictionaryWord = (str) => {
    return commonWords.some(word => str.includes(word));
  };
  
  if (hasSequence(lowerPassword)) patterns.push('sequence');
  if (hasRepetition(password)) patterns.push('repetition');
  if (hasKeyboardPattern(lowerPassword)) patterns.push('keyboard');
  if (hasDictionaryWord(lowerPassword)) patterns.push('dictionary');
  
  return patterns;
};

const calculateAdjustedEntropy = (baseEntropy, patterns, passwordLength) => {
  let adjusted = baseEntropy;
  
  // Apply penalties for detected patterns
  patterns.forEach(pattern => {
    switch (pattern) {
      case 'sequence':
        adjusted *= 0.5; // 50% penalty
        break;
      case 'repetition':
        adjusted *= 0.3; // 70% penalty
        break;
      case 'keyboard':
        adjusted *= 0.4; // 60% penalty
        break;
      case 'dictionary':
        adjusted *= 0.2; // 80% penalty
        break;
    }
  });
  
  // Additional penalty for short passwords
  if (passwordLength < 8) {
    adjusted *= 0.7;
  }
  
  return Math.max(0, adjusted);
};

const getEntropyGrade = (entropy) => {
  if (entropy >= 60) return 'Strong';
  if (entropy >= 40) return 'Medium';
  if (entropy >= 25) return 'Weak';
  return 'Too weak';
};

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
      regex: restrictSymbolsTo ? `[${escapeStringRegexp(restrictSymbolsTo)}]` : "[^a-zA-Z0-9]",
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

  // Calculate entropy and add to result
  const baseEntropy = calculateBaseEntropy(_password);
  const patterns = detectPatterns(_password);
  const adjustedEntropy = calculateAdjustedEntropy(baseEntropy, patterns, _password.length);
  const entropyGrade = getEntropyGrade(adjustedEntropy);
  
  // Add entropy information to result
  strength.entropy = Math.round(adjustedEntropy * 10) / 10; // Round to 1 decimal
  strength.entropyGrade = entropyGrade;
  strength.patterns = patterns;
  
  // Provide recommendations based on patterns
  const recommendations = [];
  if (patterns.includes('sequence')) {
    recommendations.push('Avoid sequential characters (abc, 123)');
  }
  if (patterns.includes('repetition')) {
    recommendations.push('Avoid repeated characters (aaa, 111)');
  }
  if (patterns.includes('keyboard')) {
    recommendations.push('Avoid keyboard patterns (qwerty, asdf)');
  }
  if (patterns.includes('dictionary')) {
    recommendations.push('Avoid common words');
  }
  if (_password.length < 12) {
    recommendations.push('Consider using a longer password');
  }
  
  strength.recommendations = recommendations;

  return strength;
};

var index = { passwordStrength, defaultOptions, owaspSymbols };

export { index as default, defaultOptions, owaspSymbols, passwordStrength };
