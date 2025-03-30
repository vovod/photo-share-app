import React, { useState } from "react";
import { Typography, TextField, Button, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Login({ onLogin }) {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login_name: loginName, password }),
      });
      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        onLogin(userData);
        navigate(`/users/${userData._id}`); // Redirect to '/users' after successful login
      } else {
        console.error("Login failed:", response.statusText);
        setOpenSnackbar(true); // Display Snackbar on login failure
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setOpenSnackbar(true); // Display Snackbar on login error
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <div className="form-title">
        <Typography variant="h4" fontWeight={800}>
          Login
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Login Name"
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Login failed. Please try again."
      />
    </div>
  );
}

export default Login;
