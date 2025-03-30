const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();

// API GET để lấy danh sách các ảnh của một người dùng cụ thể bằng ID người dùng
router.get("/photosOfUser/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    const photosOfUser = await Photo.find({ user_id: userId }, "-__v");
    response.json(photosOfUser);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// API GET để lấy thông tin chi tiết của một bức ảnh cụ thể bằng ID
router.get("/:id", async (request, response) => {
  try {
    const photoId = request.params.id;
    const photo = await Photo.findById(photoId, "-__v");
    if (photo) {
      response.json(photo);
    } else {
      response.status(404).json({ message: "Photo not found" });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// API POST để thêm comment vào một bức ảnh
router.post("/comment/:id", async (request, response) => {
  try {
    const photoId = request.params.id;
    const { user_id, comment } = request.body;

    const photo = await Photo.findById(photoId);
    if (!photo) {
      return response.status(404).json({ message: "Photo not found" });
    }

    // Thêm comment vào mảng comments của bức ảnh
    photo.comments.push({
      user_id: user_id,
      comment: comment,
      date_time: new Date().toISOString(),
    });

    // Lưu lại bức ảnh đã được cập nhật
    await photo.save();
    console.log(comment);
    response.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.post("/upload", async (req, res) => {
  try {
    const { file_name, date_time, image, user_id } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!file_name || !date_time || !image || !user_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Tạo mới đối tượng Photo và lưu vào cơ sở dữ liệu
    const newPhoto = new Photo({
      file_name,
      date_time,
      image,
      user_id
    });
    await newPhoto.save();

    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
