/**
 * Checks if a phone number is valid.
 */

import { ErrorResponse } from "../types/ErrorResponse";

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

/**
 * Checks Register form.
 */

export const isRegisterFormValid = (phone: string, password: string, firstName: string, lastName: string): ErrorResponse[] => {
  const errors: ErrorResponse[] = [];
  if (!isFirstNameValid(firstName)) {
    errors.push({
      field: "firstName",
      message: "First Name must be at least 2 characters long."
    });
  }

  if (!isLastNameValid(lastName)) {
    errors.push({
      field: "lastName",
      message: "Last Name must be at least 2 characters long."
    });

  }
  if (!isPhoneNumberValid(phone)) {
    errors.push({
      field: "phone",
      message: "Phone number is invalid."
    });
  }
  if (!isPasswordValid(password)) {
    errors.push({
      field: "password",
      message: "Minimum 8 characters, 1 upper case letter, 1 lower case letter, 1 number and 1 special character"
    });

  }

  return errors;
}

/**
 * Checks Login form.
 */

export const isLoginFormValid = (phone: string, password: string): ErrorResponse[] => {
  const errors: ErrorResponse[] = [];
  if (!isPhoneNumberValid(phone)) {
    errors.push({
      field: "phone",
      message: "Phone number is invalid."
    });
  }
  if (!isPasswordValid(password)) {
    errors.push({
      field: "password",
      message: "Minimum 8 characters, 1 upper case letter, 1 lower case letter, 1 number and 1 special character"
    });

  }

  return errors;
};