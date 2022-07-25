
# Overview

A simple way to check that password strength of a certain passphrase. A password strength checker based from [Javascript RegEx](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).

[![Build Status](https://travis-ci.org/deanilvincent/check-password-strength.svg?branch=master)](https://travis-ci.org/deanilvincent/check-password-strength)
[![npm](https://img.shields.io/npm/dm/check-password-strength.svg)](https://img.shields.io/npm/dm/check-password-strength.svg)

[![Downloads](https://img.shields.io/npm/dt/check-password-strength.svg)](https://img.shields.io/npm/dt/check-password-strength.svg)

[DEMO 1](https://svelte.dev/repl/b5bf5871c99742e584da244b4bfeac92?version=3.44.3) by [@Ennoriel](https://github.com/Ennoriel)

[DEMO 2](https://check-password-strength.netlify.app/)

## Installation

### Install via Package Manager

`npm i check-password-strength --save`

### Install via Browser Script Tag using [UNPKG](https://unpkg.com/)

`<script src="https://unpkg.com/check-password-strength/dist/umd.js"></script>`

## Setup & Basic Usage
```javascript
const { passwordStrength } = require('check-password-strength')
// OR
import { passwordStrength } from 'check-password-strength'

console.log(passwordStrength('asdfasdf').value)
// Too weak (It will return Too weak if the value doesn't match the RegEx conditions)

console.log(passwordStrength('asdf1234').value)
// Weak

console.log(passwordStrength('Asd1234!').value)
// Medium

console.log(passwordStrength('A@2asdF2020!!*').value)
// Strong
```
## Migration from 1.x.x to 2.0.0

```javascript
// 1.x.x
const whateEverYourFunctionNameWasBefore = require("./index");

// 'contains' attribute of the response object format was
response.contains = [{'message': 'lowercase'}, ...]
```

```javascript
// 2.0.0
const { passwordStrength : whateEverYourFunctionNameWasBefore } = require("./index");

// 'contains' attribute of the response object format is now
response.contains = ['lowercase', ...]
```
## Additional Info

### Object Result
| Property | Desc.                                                           |
| -------- | --------------------------------------------------------------- |
| id       | **0** = Too weak, **1** = Weak & **2** = Medium, **3** = Strong |
| value    | Too weak, Weak, Medium & Strong                                 |
| contains | lowercase, uppercase, symbol and/or number                      |
| length   | length of the password                                          |

### Password Length Default Options
| Name     | Mininum Diversity | Mininum Length |
| -------- | ----------------- | -------------- |
| Too weak | 0                 | 0              |
| Weak     | 2                 | 6              |
| Medium   | 4                 | 8              |
| Strong   | 4                 | 10             |

```javascript
console.log(passwordStrength('@Sdfasd2020!@#$'))
// output 
{ 
    "id": 1, 
    "value": "Strong",
    "contains": ['lowercase', 'uppercase', 'symbol', 'number'],
    "length": 15
}
```

### Default Options

The default symbols are based from **Password Special Characters [OWASP](https://owasp.org/www-community/password-special-characters)** list (except for the space)
```
!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
```
Thanks for [jlherren](https://github.com/jlherren) & [Ennoriel](https://github.com/Ennoriel) for this suggestion! 👨🏻‍💻👨🏻‍💻

The default options can be required:
```javascript
const { defaultOptions } = require("./index");
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
    minLength: 6
  },
  {
    id: 2,
    value: "Medium",
    minDiversity: 4,
    minLength: 8
  },
  {
    id: 3,
    value: "Strong",
    minDiversity: 4,
    minLength: 10
  }
]
```

To override the default options, simply pass your custom array as the second argument:

  - id: correspond to the return id attribute.
  - value: correspond to the return value attribute.
  - minDiversity: between 0 and 4, correspond to the minimum of different criterias ('lowercase', 'uppercase', 'symbol', 'number') that should be met to pass the password strength
  - minLength: minimum length of the password that should be met to pass the password strength

The `minDiversity` and `minLength` parameters of the first element cannot be overriden (set to 0 at the beginning of the method). Therefore, the first element should always correspond to a "too weak" option.

```javascript
passwordStrength('myPassword', yourCustomOptions)
```
### RegEx
**Strong**
```
 ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~])(?=.{10,})
 ```

**Medium Password RegEx used:** 
```
 ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~])(?=.{8,})
 ```

| RegEx                                     | Desc.                                                               |
| ----------------------------------------- | ------------------------------------------------------------------- |
| ^                                         | The password string will start this way                             |
| (?=.*[a-z])                               | The string must contain at least 1 lowercase alphabetical character |
| (?=.*[A-Z])                               | The string must contain at least 1 uppercase alphabetical character |
| (?=.*[0-9])                               | The string must contain at least 1 numeric character                |
| (?=.[!"#$%&'()*+,-./:;<=>?@[\\]^_`{\|}~])) | The string must contain at least one special character              |
| (?=.{10,})                                | The string must be eight characters or longer for Strong strength   |
| (?=.{8,})                                 | The string must be eight characters or longer for Medium strength   |
| (?=.{6,})                                 | Mininum of 6 characters for Weak strength                           |

## TypeScript type declarations &#9745; 
Available starting version `v2.0.3` and above. (Thanks to [@Mesoptier!](https://github.com/Mesoptier))

## Other resources

##### For .NET Project
If you're working with .net core project, I've created a simple nuget package with same RegEx strings to validate a password strength.

You can easily install via Nuget Package Manager or .NET CLI ([Check.Password.Strength](https://github.com/deanilvincent/Check.Password.Strength)). This package uses Regular Expression `new Regex()` derives from `System.Text.RegularExpressions`. You can use this especially if you want to validate the passcode strength on backend services or web apis of your project.

##### Other NPM RegEx validator
I also made another NPM package ([hey-regex](https://www.npmjs.com/package/hey-regex)) that checks common inputs like numbers (whole number and decimal), alpha numeric, email and url. This package only returns `true` or `false` based from the selected function (with RegEx `.test()` inside).

Reference [blog](https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/).

### Contribute

Feel free to clone or fork this project:  `https://github.com/deanilvincent/check-password-strength.git`

Contributions & pull requests are welcome!

I'll be glad if you give this project a ★ on [Github](https://github.com/deanilvincent/check-password-strength) :)

***
Kudos to [@Ennoriel](https://github.com/Ennoriel) and his efforts for making v2.x.x possible!
### License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/deanilvincent/check-password-strength/blob/master/LICENSE.md/) file for details.