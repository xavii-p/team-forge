import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login-Register.css";

// Defining the User interface
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Functional component for user registration
const Register: React.FC = () => {
  // State variables to manage form input values
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Hook to enable programmatic navigation
  const navigate = useNavigate();

  useEffect(() => {
    const handleBlur = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.value) {
        input.classList.add("filled");
      } else {
        input.classList.remove("filled");
      }
    };

    const inputs = document.querySelectorAll(".input-container input");

    inputs.forEach((input) => {
      input.addEventListener("blur", handleBlur);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("blur", handleBlur);
      });
    };
  }, []);

  // Function to redirect to the login page
  const redirectToLogin = () => {
    navigate("/");
  };

  // Event handler for first name input change
  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  // Event handler for last name input change
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  // Event handler for email input change
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // Event handler for password input change
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // Event handler for confirm password input change
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  // Event handler for form submission
  const handleRegistration = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Checking if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Constructing the user's full name
    const name = `${firstName} ${lastName}`;

    // Making a POST request to register the user
    axios
      .post("/api/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("User registered successfully:", response.data);
        redirectToLogin();
      })
      .catch((error) => {
        // Handling registration errors
        if (error.response && error.response.status === 400) {
          alert("Error registering: " + error.response.data);
        } else {
          console.error(`Error registering user: ${error}`);
        }
      });
  };

  return (
    <div className="register_page" id="register">
      <div className="login_box">
        <div className="login_header">
          <span className="blue_text">Team</span>Forge
        </div>
        <form className="login_form" onSubmit={handleRegistration}>
          <div className="subtitle">Register</div>
          <div className="form-group">
            <div className="name-group">
              <div className="input-container">
                {/* First name input */}
                <input
                  type="name"
                  id="first-name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                />
                <label htmlFor="first-name" className="form-placeholder">
                  First Name
                </label>
              </div>
              {/* Last name input */}
              <div className="input-container">
                <input
                  type="name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
                />
                <label className="form-placeholder">Last Name</label>
              </div>
              {/* Email input */}
              <div className="input-container">
                <input
                  type="name"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <label className="form-placeholder">Email</label>
              </div>
            </div>
          </div>
          <div className="cred-group">
            <div className="input-container">
              {/* Password input */}
              <input
                type="password"
                id="password-field"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <label className="form-placeholder">Password</label>
            </div>
          </div>
          <div className="cred-group">
            <div className="input-container">
              {/* Confirm password input */}
              <input
                type="password"
                id="confirm-password-field"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              <label className="form-placeholder">Confirm Password</label>
            </div>
          </div>
          <footer>
            {/* Link to login page */}
            <div className="login_bottom_left">
              <span className="link" onClick={redirectToLogin}>
                Already have an account? Login here.
              </span>
            </div>
            {/* Registration button */}
            <div className="login_bottom_right">
              <button className="register_button" type="submit">
                Register
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default Register;
