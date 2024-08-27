import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ForgotPasswordPopup.css";

interface ForgotPasswordPopupProps {
  onClose: () => void;
}

const ForgotPasswordPopup: React.FC<ForgotPasswordPopupProps> = ({
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Send a request to your API to handle password reset
      await axios.post("/api/forgot-password", { email });
      setMessage("Password reset link has been sent to your email.");
    } catch (error) {
      setMessage("Error sending password reset link.");
    }
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault(); // Prevent the form from being submitted
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className={`overlay ${isVisible ? "show-reset-form" : ""}`}>
      <div className="popup">
        <button className="close" onClick={handleClose}>
          ×
        </button>
        <h2>Forgot Password</h2>
        <p>
          Enter the email associated with your account to change your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="reset-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button type="submit" className="reset-button">
            Send Reset Link
          </button>
        </form>
        {message && (
          <p
            className={`message ${
              message.includes("Error") ? "error-message" : "success-message"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;
