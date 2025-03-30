import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Login from "./components/Login";
import Register from "./components/Register";

import "./App.css";

const NotFound = () => {
  let location = useLocation();
  return <div>Không có đường dẫn phù hợp cho {location.pathname}</div>;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  
  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
  };

  return (
    <Router>
      <div className="app-view">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar
              isLoggedIn={isLoggedIn}
              user={user}
              handleLogout={handleLogout}
            />
          </Grid>
          {isLoggedIn && (
            <>
              <div className="main-topbar-buffer" />
              <Grid item sm={2}>
                <Paper className="main-grid-item">
                  <UserList />
                </Paper>
              </Grid>
              <Grid item sm={9.5}>
                <Paper className="main-grid-item">
                  <Routes>
                    <Route path="/users/:userId" element={<UserDetail />} />
                    <Route
                      path="/photos/:userId"
                      element={<UserPhotos loggedInUser={user} />}
                    />
                    <Route path="/" element={<UserList />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Paper>
              </Grid>
            </>
          )}
          {!isLoggedIn && (
            <Grid item xs>
              <Paper className="main-grid-item">
                <Routes>
                  <Route path="/" element={<Login onLogin={handleLogin} />} />
                  <Route path="/login" element={<Login onLogin={handleLogin} />} />
                  <Route path="/register" element={<Register onLogin={handleLogin} />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Paper>
            </Grid>
          )}
        </Grid>
      </div>
    </Router>
  );
};

export default App;
