const { passwordStrength } = require('../dist/umd.js')

const command = process.argv[2];
const password = process.argv[3];

if (command !== "--pwd" || !password?.length) {
    throw new Error("You must provide a password: node cjs.cjs --pwd <pwd>")
}

console.log(passwordStrength(password).value)
