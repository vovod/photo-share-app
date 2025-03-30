// components/UserDetail/index.jsx

import React, { useEffect, useState } from "react";
import { Typography, Link } from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom"; // Import Link as RouterLink
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchModel(
          `http://localhost:8081/api/user/${userId}`
        );
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchUserData();
  }, [userId]);

  if (!user) return null;

  return (
    <div>
      <div className="detail-list">
        <Typography variant="h4">
          <b>Name:</b> {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="body1">
          <b>Location:</b> {user.location}
        </Typography>
        <Typography variant="body1">
          <b>Description:</b> {user.description}
        </Typography>
        <Typography variant="body1">
          <b>Occupation:</b> {user.occupation}
        </Typography>
        {/* Replace <Link> with <RouterLink> */}
        <Typography variant="body1">
          <RouterLink className="link" to={`/photos/${userId}`}>
            View Photos
          </RouterLink>
        </Typography>
      </div>
    </div>
  );
}

export default UserDetail;
