module.exports = (password) => {
  if (!password) {
    console.error("check-password-strength package - requires a password value.")
    return undefined
  }

  let strength = {} // Default

  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  const mediumRegex = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  );

  if (strongRegex.test(password)) {
    strength = {
      id: 2,
      value: 'Strong'
    }
  } else if (mediumRegex.test(password)) {
    strength = {
      id: 1,
      value: 'Medium'
    }
  } else {
    strength = {
      id: 0,
      value: 'Weak'
    }
  }

  return strength
}