import { z } from "zod";

// Shared auth field rules. Feedback only — the server has the final say.

/** Matches `User.name`, CharField(120). */
export const NAME_MAX = 120;
/** Django's MinimumLengthValidator default. */
export const PASSWORD_MIN = 8;
const PASSWORD_MAX = 128;

export const emailField = z
  .string()
  .trim()
  .min(1, "Enter your email address")
  .pipe(z.email("Enter an email address in the correct format, like name@example.com"));

/** For choosing a password: mirrors Django's length and numeric validators. */
export const newPasswordField = z
  .string()
  .min(1, { error: "Enter a password", abort: true })
  .min(PASSWORD_MIN, `Password must be at least ${String(PASSWORD_MIN)} characters`)
  .max(PASSWORD_MAX, `Password must be ${String(PASSWORD_MAX)} characters or fewer`)
  .refine((value) => !/^\d+$/.test(value), "Password cannot be only numbers");

/** For signing in: any non-empty value; the server says whether it is right. */
export const currentPasswordField = z.string().min(1, "Enter your password");
