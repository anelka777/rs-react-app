export interface PasswordStrength {
  hasNumber: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasSpecialChar: boolean;
  score: number;
}

export const getPasswordStrength = (password: string): PasswordStrength => {
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const score = [hasNumber, hasUppercase, hasLowercase, hasSpecialChar].filter(
    Boolean
  ).length;

  return { hasNumber, hasUppercase, hasLowercase, hasSpecialChar, score };
};
