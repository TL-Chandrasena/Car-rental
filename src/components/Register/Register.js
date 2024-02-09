import "./Register.css";

import * as authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  checkEmail,
  checkMaxLength,
  checkMinLength,
  checkEqualValues,
} from "../../services/validationService";

const formFields = {
  username: "username",
  email: "email",
  password: "password",
  confirmPassword: "confirmPassword",
};

export const Register = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const { authLogin } = useContext(AuthContext);
  const formRef = useRef();
  const navigate = useNavigate();

  const isValidationErrorsEmpty = !Object.values(validationErrors).length;
  const areAllFormFieldsFilled = Object.values(formFields).every(
    (inputName) => formRef.current?.[inputName].value
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    const username = formData.get(formFields.username);
    const email = formData.get(formFields.email);
    const password = formData.get(formFields.password);

    authService
      .register(username, email, password)
      .then((authResponse) => {
        if (
          authResponse.code >= 400 &&
          authResponse.code <= 500 &&
          authResponse?.message
        ) {
          setErrorMessage(authResponse.message);
        } else {
          authLogin(authResponse);
          navigate("/");
        }
      })
      .catch((err) => {
        setErrorMessage(err);
      });
  };

  const addToValidationErrors = (key, value) => {
    setValidationErrors((currentErrors) => ({
      ...currentErrors,
      [key]: value,
    }));
  };

  const removeValidationErrors = (key) => {
    setValidationErrors((currentErrors) => {
      const { [key]: value, ...rest } = currentErrors;
      return rest;
    });
  };

  const blurHandler = (keyName) => {
    const username = formRef.current?.username.value;
    const isUsernameValid =
      checkMaxLength(username, 10) && checkMinLength(username, 3);

    const email = formRef.current?.email.value;
    const isEmailValid = checkEmail(email);

    const password = formRef.current?.password.value;
    const isPasswordValid =
      checkMaxLength(password, 12) && checkMinLength(password, 5);

    const confirmPassword = formRef.current?.confirmPassword.value;
    const isConfirmPasswordValid =
      checkMaxLength(confirmPassword, 12) &&
      checkMinLength(confirmPassword, 5) &&
      checkEqualValues(password, confirmPassword);

    if (keyName === formFields.username) {
      if (!isUsernameValid) {
        addToValidationErrors(
          formFields.username,
          "Username should be between 3 and 10 chars"
        );
      } else {
        removeValidationErrors(formFields.username);
      }
    }

    if (keyName === formFields.email) {
      if (!isEmailValid) {
        addToValidationErrors(formFields.email, "Invalid email");
      } else {
        removeValidationErrors(formFields.email);
      }
    }

    if (keyName === formFields.password) {
      if (!isPasswordValid) {
        addToValidationErrors(
          formFields.password,
          "Password should be between 5 and 12 chars"
        );
      } else {
        removeValidationErrors(formFields.password);
      }
    }

    if (keyName === formFields.confirmPassword) {
      if (!isConfirmPasswordValid) {
        addToValidationErrors(
          formFields.confirmPassword,
          "Confirm password should match password and be between 5 and 12 chars"
        );
      } else {
        removeValidationErrors(formFields.confirmPassword);
      }
    }
  };

  return (
    <div className="register-box">
      <h1>Register</h1>
      <h4>It's free and only take a minute</h4>
      {errorMessage && (
        <div className="alert alert-danger text-center" role="alert">
          {errorMessage}
        </div>
      )}
      <form method="POST" onSubmit={onSubmit} ref={formRef}>
        <label htmlFor="username">Username</label>
        <div className="form-group">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username.."
            onBlur={() => blurHandler(formFields.username)}
          />
          {validationErrors?.username && (
            <div
              id="validationServerUsernameFeedback"
              className="invalid-field"
            >
              {validationErrors.username}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email.."
            onBlur={() => blurHandler(formFields.email)}
          />
          {validationErrors?.email && (
            <div
              id="validationServerUsernameFeedback"
              className="invalid-field"
            >
              {validationErrors.email}
            </div>
          )}{" "}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password.."
            onBlur={() => blurHandler(formFields.password)}
          />
          {validationErrors?.password && (
            <div
              id="validationServerUsernameFeedback"
              className="invalid-field"
            >
              {validationErrors.password}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password.."
            onBlur={() => blurHandler(formFields.confirmPassword)}
          />
          {validationErrors?.confirmPassword && (
            <div
              id="validationServerUsernameFeedback"
              className="invalid-field"
            >
              {validationErrors.confirmPassword}
            </div>
          )}
        </div>
        <Button
          type="submit"
          className="btn-register"
          disabled={
            isValidationErrorsEmpty && areAllFormFieldsFilled ? false : true
          }
        >
          REGISTER
        </Button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};
