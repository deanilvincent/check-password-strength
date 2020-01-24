export function passwordStrength(password) {
  let strength = { // Default
    id: 0,
    value: 'Weak'
  }

  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  const mediumRegex = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  );

  if (strongRegex.test(password)) {
    strength.id = 2
    return strength;
  } else if (mediumRegex.test(password)) {
    strength.id = 1
    strength.value = 'Medium'
  } else {
    strength.id = 0
    strength.value = 'Weak'
  }
  return strength;
}