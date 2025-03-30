import React, { useEffect, useState } from "react";
import {
  Typography,
  ListItem,
  ListItemText,
  List,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserPhotos({ loggedInUser }) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchModel(
          `http://localhost:8081/api/user/${userId}`
        );
        setUser(userData);

        const photosData = await fetchModel(
          `http://localhost:8081/api/photo/photosOfUser/${userId}`
        );
        const updatedPhotosData = await Promise.all(
          photosData.map(async (photo) => {
            const updatedComments = await Promise.all(
              photo.comments.map(async (comment) => {
                const commentUserData = await fetchModel(
                  `http://localhost:8081/api/user/${comment.user_id}`
                );
                return {
                  ...comment,
                  user: commentUserData,
                };
              })
            );
            return {
              ...photo,
              comments: updatedComments,
            };
          })
        );

        setPhotos(updatedPhotosData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleAddComment = async (photoId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/photo/comment/${photoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: loggedInUser._id,
            comment: newComment,
          }),
        }
      );
      if (response.ok) {
        const updatedPhotos = photos.map((photo) => {
          if (photo._id === photoId) {
            return {
              ...photo,
              comments: [
                ...photo.comments,
                {
                  _id: new Date().getTime(),
                  user_id: loggedInUser._id,
                  comment: newComment,
                  date_time: new Date().toISOString(),
                },
              ],
            };
          }
          return photo;
        });
        setPhotos(updatedPhotos);
        setNewComment("");
      } else {
        console.error("Failed to add comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  const handleOpenUploadDialog = () => {
    setOpenUploadDialog(true);
  };

  const handleCloseUploadDialog = () => {
    setOpenUploadDialog(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUploadImage = async () => {
    if (!selectedImage) {
      console.error("No image selected");
      return;
    }

    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onload = () => {
        const base64Image = reader.result.split(",")[1];
        fetch("http://localhost:8081/api/photo/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file_name: selectedImage.name,
            date_time: new Date().toISOString(),
            image: base64Image,
            user_id: loggedInUser._id,
          }),
        })
          .then((response) => {
            if (response.ok) {
              console.log("Image uploaded successfully");
              setOpenSuccessSnackbar(true);
              handleCloseUploadDialog();
              fetchData();
            } else {
              console.error("Failed to upload image:", response.statusText);
              setOpenErrorSnackbar(true);
            }
          })
          .catch((error) => {
            console.error("Error uploading image:", error.message);
            setOpenErrorSnackbar(true);
          });
      };
    } catch (error) {
      console.error("Error uploading image:", error.message);
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
    <div className="user-photos-container">
      {user && (
        <Typography
          variant="h4"
          fontWeight={600}
          paddingBottom={2}
          color={"Black"}
        >
          {user.first_name} {user.last_name}
        </Typography>
      )}
      {loggedInUser._id === userId && (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenUploadDialog}
            // set button to the right corner
            style={{ float: "right" }}
          >
            Upload
          </Button>
          <Dialog open={openUploadDialog} onClose={handleCloseUploadDialog}>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogContent>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseUploadDialog}>Cancel</Button>
              <Button onClick={handleUploadImage} color="primary">
                Upload
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={openSuccessSnackbar}
            autoHideDuration={6000}
            onClose={handleSuccessSnackbarClose}
            message="Image uploaded successfully"
          />
          <Snackbar
            open={openErrorSnackbar}
            autoHideDuration={6000}
            onClose={handleErrorSnackbarClose}
            message="Failed to upload image"
          />
        </div>
      )}
      {photos.map((photo) => (
        <div key={photo._id} className="photo-container">
          <Typography variant="h6">Upload date: {photo.date_time}</Typography>
          <img
            src={`data:image/jpeg;base64,${photo.image}`}
            alt={photo.file_name}
            className="photo"
          />
          <List className="comment-list">
            <Typography variant="h5">Comments:</Typography>
            {photo.comments.map((comment) => (
              <ListItem key={comment._id} className="comment-item">
                <ListItemText
                  secondary={
                    <>
                      <Typography variant="body1">
                        <b>{comment.date_time}</b>
                      </Typography>
                      <Typography variant="body1" className="comment-content">
                        {comment.comment}
                      </Typography>
                    </>
                  }
                  primary={
                    <>
                      <Typography variant="body1" fontSize={22}>
                        {comment.user &&
                          comment.user.first_name &&
                          comment.user.last_name && (
                            <RouterLink
                              className="comment-primary-link"
                              to={`/users/${comment.user._id}`}
                            >
                              {`${comment.user.first_name} ${comment.user.last_name}`}
                            </RouterLink>
                          )}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
          <div className="add-comment">
            <TextField
              label="Add Comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddComment(photo._id)}
            >
              Add Comment
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;
