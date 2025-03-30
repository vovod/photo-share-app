import React, { useState } from "react";
import { Typography, TextField, Button, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Register() {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [occupation, setOccupation] = useState("");
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login_name: loginName,
          password,
          first_name: firstName,
          last_name: lastName,
          location,
          description,
          occupation,
        }),
      });
      if (response.ok) {
        // Đăng ký thành công
        setOpenSuccessSnackbar(true);
        // Chuyển hướng tới trang đăng nhập
        navigate(`/login`);
      } else {
        // Đăng ký không thành công, hiển thị thông báo lỗi
        const data = await response.json();
        setErrorMessage(data.message);
        setOpenErrorSnackbar(true);
      }
    } catch (error) {
      console.error("Register error:", error.message);
      setErrorMessage(
        "An error occurred while registering. Please try again later."
      );
      setOpenErrorSnackbar(true);
    }
  };

  const handleSuccessSnackbarClose = () => {
    setOpenSuccessSnackbar(false);
  };

  const handleErrorSnackbarClose = () => {
    setOpenErrorSnackbar(false);
  };

  return (
    <div>
      <div className="form-title">
        <Typography variant="h4" fontWeight={800}>
          Register
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
          error={password.length < 5 || password.length > 15}
          helperText={
            password.length < 5 || password.length > 15
              ? "Password must be between 5 and 15 characters."
              : ""
          }
        />
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Occupation"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleSuccessSnackbarClose}
        message="Registration successful!"
      />
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleErrorSnackbarClose}
        message={errorMessage}
      />
    </div>
  );
}

export default Register;
