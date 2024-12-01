
# Overview

A simple way to check that password strength of a certain passphrase. The library is fully typed.

[![Build status](https://dev.azure.com/dv-github-repos/check-password-strength/_apis/build/status/check-password-strength-CI)](https://dev.azure.com/dv-github-repos/check-password-strength/_build/latest?definitionId=12) 

[![npm](https://img.shields.io/npm/dm/check-password-strength.svg)](https://img.shields.io/npm/dm/check-password-strength.svg) [![Downloads](https://img.shields.io/npm/dt/check-password-strength.svg)](https://img.shields.io/npm/dt/check-password-strength.svg)

[DEMO 1](https://svelte.dev/repl/b5bf5871c99742e584da244b4bfeac92?version=3.44.3) by [@Ennoriel](https://github.com/Ennoriel)

[DEMO 2](https://check-password-strength.netlify.app/)

## Installation

### Install via Package Manager

`npm i check-password-strength --save`

### Install via Browser Script Tag using [UNPKG](https://unpkg.com/)

```html
<script src="https://unpkg.com/check-password-strength/dist/umd.js"></script>
<script type="text/javascript">
    const passwordStrength = checkPasswordStrength.passwordStrength('pwd123').value; // 'Weak'
</script>
```

## Setup & Basic Usage

```javascript
const { passwordStrength } = require('check-password-strength')
// OR
import { passwordStrength } from 'check-password-strength'

console.log(passwordStrength('asdfasdf').value)
// Too weak (It will return Too weak if the value doesn't match the Weak conditions)

console.log(passwordStrength('asdf1234').value)
// Weak

console.log(passwordStrength('Asd1234!').value)
// Medium

console.log(passwordStrength('A@2asdF2020!!*').value)
// Strong
```

## API

### arguments

The `passwordStrength` takes 3 arguments:

- `password` (string): the user password
- `options` (array — optional): an option to override the default complexity required to match your password policy
- `restrictSymbolsTo` (string — optional): by default, `passwordStrength` will check against all character except the 26 latin lowercase, uppercase letters and 10 digits (includes the OWASP characters, accentuated letters, other alphabets, emojis). If you want to restrict it, you may pass a different string. You may import and use `owaspSymbols` that will restrict the symbols to the ones recommended by the OWASP.

**Password Default Options**

The default options can be required:

```javascript
const { defaultOptions } = require("./index");
// OR
import { defaultOptions } from 'check-password-strength'
```

default options:
```javascript
[
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
    minLength: 8
  },
  {
    id: 2,
    value: "Medium",
    minDiversity: 4,
    minLength: 10
  },
  {
    id: 3,
    value: "Strong",
    minDiversity: 4,
    minLength: 12
  }
]
```

To override the default options, simply pass your custom array as the second argument:

  - id: correspond to the return id attribute.
  - value: correspond to the return value attribute.
  - minDiversity: between 0 and 4, correspond to the minimum of different criterias ('lowercase', 'uppercase', 'symbol', 'number') that should be met to pass the password strength
  - minLength: minimum length of the password that should be met to pass the password strength

The `minDiversity` and `minLength` parameters of the first element cannot be overriden (set to 0 at the beginning of the method). Therefore, the first element should always correspond to a "too weak" option.

### Result

The result is an object containing the following values (unless you override the `options`):

| Property | Desc.                                                           |
| -------- | --------------------------------------------------------------- |
| id       | **0** = Too weak, **1** = Weak & **2** = Medium, **3** = Strong |
| value    | Too weak, Weak, Medium & Strong                                 |
| contains | lowercase, uppercase, number and / or symbol                    |
| length   | length of the password                                          |

If you want to translate the value (Too weak → Trop faible), you can translate it based on the return value, or override the `defaultOptions` option, which will be passed back as the function's return value.

## Contribute

Feel free to clone or fork this project:  `https://github.com/deanilvincent/check-password-strength.git`

Contributions & pull requests are welcome!

I'll be glad if you give this project a ★ on [Github](https://github.com/deanilvincent/check-password-strength) :)

## changelog

- v3: allow all symbols by default (any character except the 26 latin lowercase, uppercase letters and 10 digits) & set the default min length to 12 instead of 10
- v2: allow configuration through `options` object
- v1: first version

***

Kudos to [@Ennoriel](https://github.com/Ennoriel) and his efforts for making v2 and v3 possible!
