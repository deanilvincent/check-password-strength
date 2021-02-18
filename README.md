
# Overview

A simple way to check that password strength of a certain passphrase. A password strength checker based from [Javascript RegEx](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).

[![Build Status](https://travis-ci.org/deanilvincent/check-password-strength.svg?branch=master)](https://travis-ci.org/deanilvincent/check-password-strength)
[![npm](https://img.shields.io/npm/dm/check-password-strength.svg)](https://img.shields.io/npm/dm/check-password-strength.svg)

[![Downloads](https://img.shields.io/npm/dt/check-password-strength.svg)](https://img.shields.io/npm/dt/check-password-strength.svg)

[DEMO here](https://check-password-strength.netlify.app/) 

## Installation

`npm i check-password-strength --save`

## Setup & Basic Usage
```
const passwordStrength = require('check-password-strength')

console.log(passwordStrength('asdfasdf').value)
// Weak (It will return weak if the value doesn't match the RegEx conditions)

console.log(passwordStrength('asdf1234').value)
// Medium

console.log(passwordStrength('Asd1234!').value)
// Strong

console.log(passwordStrength('A@2asdF2020!!*').value)
// Very strong
```

## Additional Info

### Object Result
| Property| Desc. |
| -- | -- |
| id | **0** = Weak, **1** = Medium & **2** = Strong, **3** = Very strong |
| value | Weak, Medium, Strong & Very strong |
| contains | lowercase, uppercase, symbol and/or number |
| length | length of the password |

### Password Length Default Options
| Name | Mininum Diversity | Mininum Length |
| -- | -- | -- |
| Weak | 0 | 0 |
| Medium | 2 | 6 |
| Strong | 4 | 8 |
| Very strong | 4 | 10 |

```
console.log(passwordStrength('@Sdfasd2020!@#$'))
// output 
{ 
    "id": 1, 
    "value": "Very Strong",
    "contains": [{'message': 'lowercase'},{'message': 'uppercase'},{'message': 'symbol'},{'message': 'number'}],
    "length": 15
}
```

## Default Options (Can be overridden)
```
[
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
```

To override the default options, just simply pass your custom array in the next argument. 
```
passwordStrength('myPassword', yourCustomOptions)
```

### RegEx 

**Very Strong**

 `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})`

**Strong Password RegEx used:** 

 `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})`

**Medium Password RegEx used:**  

`^((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[!@#\$%\^&\*])|((?=.*[a-z])(?=.*[!@#\$%\^&\*])|((?=.*[0-9])(?=.*[!@#\$%\^&\*]))(?=.{6,})"`

|RegEx| Desc. |
|--|--|
| ^ | The password string will start this way |
| (?=.*[a-z]) | The string must contain at least 1 lowercase alphabetical character | 
|(?=.*[A-Z]) | The string must contain at least 1 uppercase alphabetical character |
|(?=.*[0-9]) | The string must contain at least 1 numeric character |
|(?=._[!@#\$%\^&_]) | The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict |
| (?=.{10,}) | The string must be eight characters or longer for very strong strength |
| (?=.{8,}) | The string must be eight characters or longer for strong strength |
| (?=.{6,}) | Mininum of 6 characters for medium strength |

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

### License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/deanilvincent/check-password-strength/blob/master/LICENSE.md/) file for details.
