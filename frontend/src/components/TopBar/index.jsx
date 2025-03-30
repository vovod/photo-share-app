import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";

const TopBar = ({ isLoggedIn, user, handleLogout }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Photo Sharing App
          </Typography>
          {isLoggedIn ? (
            <>
              <Typography
                variant="h4"
                marginRight={4}
                padding={1}
                component={Link}
                to={`/users/${user._id}`}
                sx={{ textDecoration: "none", color: "MediumSpringGreen" }}
              >
                {user.first_name} {user.last_name}
              </Typography>
              <Button
                color="inherit"
                onClick={handleLogout}
                component={Link}
                to="/login"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
