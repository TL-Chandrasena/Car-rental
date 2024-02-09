import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "./Login";
import * as authService from "../../services/authService";
import { AuthContext } from "../../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

const renderLoginComponent = () => {
  const authLogin = jest.fn();
  render(
    <AuthContext.Provider
      value={{
        authLogin,
      }}
    >
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthContext.Provider>
  );
  return { authLogin };
};

afterEach(() => {
  jest.clearAllMocks();
});

test("correct email and password is sent to the auth service", async () => {
  // render the component on virtual dom
  renderLoginComponent();
  const email = "george@abv.bg";
  const password = "123456";

  const addMock = jest
    .spyOn(authService, "login")
    .mockImplementationOnce(() => {
      return Promise.resolve(true);
    });

  userEvent.type(screen.getByLabelText(/email/i), email);
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByRole("button", { name: "LOGIN" }));

  await waitFor(() => {
    expect(addMock).toHaveBeenCalledWith(email, password);
  });
});

test("error message is shown when we get an error from the API call", async () => {
  // render the component on virtual dom
  renderLoginComponent();

  const email = "george@abv.bg";
  const password = "123456";
  const message = "Error";

  jest.spyOn(authService, "login").mockImplementation(() => {
    return Promise.resolve({
      code: 404,
      message,
    });
  });

  userEvent.type(screen.getByLabelText(/email/i), email);
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByRole("button", { name: "LOGIN" }));

  await waitFor(() => {
    const errorMessage = screen.getByRole("alert");
    expect(errorMessage).toHaveTextContent(message);
  });
});

test("calls authLogin on successful API response", async () => {
  // render the component on virtual dom
  const { authLogin } = renderLoginComponent();

  const email = "george@abv.bg";
  const password = "123456";
  const exampleResponse = "Success";

  jest.spyOn(authService, "login").mockImplementation(() => {
    return Promise.resolve(exampleResponse);
  });

  userEvent.type(screen.getByLabelText(/email/i), email);
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByRole("button", { name: "LOGIN" }));

  await waitFor(() => {
    expect(authLogin).toHaveBeenCalledWith(exampleResponse);
  });
});
