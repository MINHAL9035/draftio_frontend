import * as Yup from "yup";

export const SignupValidationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

export const LoginValidationSchema = Yup.object({
  nameOrEmail: Yup.string()
    .required("Username or Email is required")
    .test(
      "is-name-or-email",
      "Please enter a valid name or email",
      (value) => {
        const isEmail = Yup.string().email().isValidSync(value);
        const isname = Yup.string()
          .matches(/^[a-zA-Z0-9_ ]+$/, "Invalid username")
          .isValidSync(value);
        return isEmail || isname;
      }
    ),
  password: Yup.string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
});
