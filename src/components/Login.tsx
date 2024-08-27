import React, { useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import axios from "axios";
import useLocalState from "./useLocalStorage";
import SuccessMessage from "./SuccessMessage";
import { getEmailFromJWT } from "../jwtUtils";
import ForgotPasswordPopup from "./ForgotPasswordPopup";

import "../App.css";
import "./Login-Register.css";

interface User {
  name: string;
  email: string;
}

interface LoginProps {
  onLogin: (user: User) => void;
}
interface LoginResponse {
  email: string;
  name: string;
  token: string;
  message: string;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  // State hooks
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [user, setUser] = useState<User>({ name: "", email: "" });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigate = useNavigate();

  // Event handlers
  const redirectToRegister = () => {
    navigate("/Register");
  };
  // // Event handlers
  // const redirectToTest = () => {
  //   navigate("/Test");
  // };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { email: email, password: password };
    axios
      .post<LoginResponse>("/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const { name, email } = res.data;
        console.log(res.data);
        const user: User = { name, email };

        const jwt = res.data.token;

        localStorage.setItem("jwt", jwt); // Store JWT in localStorage

        setUser(user);
        onLogin(user);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate("/Home");
        }, 2000);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage("Error logging in.");
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        } else {
          setErrorMessage("Error logging in.");
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        }
      });
  };

  return (
    <div className="login_box" id="login">
      {showSuccessMessage && (
        <SuccessMessage message={`Logged in as ${user.name}!`} />
      )}
      <div className="login_header">
        <span className="blue_text">Team</span>Forge
      </div>
      <form className="login_form" onSubmit={handleLogin}>
        <div className="subtitle">Login</div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <footer>
          <div className="login_bottom_left" onClick={handleOpenPopup}>
            Forgot password?
          </div>
          {isPopupOpen && <ForgotPasswordPopup onClose={handleClosePopup} />}
          <div className="login_bottom_right">
            <button className="login_button" type="submit">
              Login
            </button>
            <button
              className="redirect_button"
              type="submit"
              onClick={redirectToRegister}
            >
              Create account
            </button>
            {/* <button
              className="login_redirect_button"
              type="button"
              onClick={redirectToTest}
            >
              Test
            </button> */}
            {errorMessage && (
              <div className="error_message">{errorMessage}</div>
            )}
          </div>
        </footer>
      </form>
    </div>
  );
};

export default Login;
