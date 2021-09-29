/**
 * Checks if a phone number is valid.
 */

export const isPhoneNumberValid = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

/**
 * Checks password strength.
 */

export const isPasswordValid = (password: string): boolean => {
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Checks Last Name.
 */

export const isLastNameValid = (lastName: string): boolean => {
  const lastNameRegex = /^[a-zA-Z]{2,}$/;
  return lastNameRegex.test(lastName);
};

/**
 * Checks First Name.
 */

export const isFirstNameValid = (firstName: string): boolean => {
  const firstNameRegex = /^[a-zA-Z]{2,}$/;
  return firstNameRegex.test(firstName);
};
