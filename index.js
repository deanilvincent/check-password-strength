export function passwordStrength(password) {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const mediumRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );
  
    if (strongRegex(password)) {
      return "Strong";
    } else if (mediumRegex(password)) {
      return "Medium";
    } else {
      return "Weak";
    }
  }