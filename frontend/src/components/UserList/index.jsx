import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Badge,
} from "@mui/material";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [photoCounts, setPhotoCounts] = useState({});
  const [commentCounts, setCommentCounts] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await fetchModel(
          "http://localhost:8081/api/user/list"
        );
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchUsers();
  }, []);

  const fetchPhotoCount = async (userId) => {
    try {
      const photoData = await fetchModel(
        `http://localhost:8081/api/photo/photosOfUser/${userId}`
      );
      const photoCount = photoData.length;
      setPhotoCounts((prevCounts) => ({
        ...prevCounts,
        [userId]: photoCount,
      }));
    } catch (error) {
      console.error("Error fetching photo count:", error.message);
    }
  };

  const fetchCommentCount = async (userId) => {
    try {
      const commentData = await fetchModel(
        `http://localhost:8081/api/photo/photosOfUser/${userId}`
      );
      let totalComments = 0;
      commentData.forEach((photo) => {
        totalComments += photo.comments.length;
      });
      setCommentCounts((prevCounts) => ({
        ...prevCounts,
        [userId]: totalComments,
      }));
    } catch (error) {
      console.error("Error fetching comment count:", error.message);
    }
  };

  useEffect(() => {
    users.forEach((user) => {
      fetchPhotoCount(user._id);
      fetchCommentCount(user._id);
    });
  }, [users]);

  return (
    <div className="user-list">
      <Typography
        variant="h4"
        fontWeight={800}
        sx={{ borderBottom: "5px solid black", paddingLeft: 0.5 }}
        color={"DarkSlateGray"}
      >
        Users
      </Typography>
      <List component="nav">
        {users.map((user) => (
          <div key={user._id}>
            <ListItemButton component={Link} to={`/users/${user._id}`}>
              <ListItemText
                primary={
                  <Typography variant="h6" fontWeight={600} color={"DimGray"}>
                    {`${user.first_name} ${user.last_name}`}
                  </Typography>
                }
                secondary={
                  <div>
                    <Badge
                      style={{
                        marginRight: 40,
                        fontWeight: 700,
                        color: "green",
                      }}
                    >
                      Photos : {photoCounts[user._id] || 0}
                    </Badge>
                    <Badge style={{ fontWeight: 700, color: "red" }}>
                      Comments : {commentCounts[user._id] || 0}
                    </Badge>
                  </div>
                }
              />
            </ListItemButton>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default UserList;
