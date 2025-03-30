// routes/UserRouter.js
const express = require("express");
const User = require("../db/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");

// Đăng nhập
router.post("/login", async (request, response) => {
  const { login_name, password } = request.body;
  try {
    const user = await User.findOne({ login_name });
    if (user && bcrypt.compareSync(password, user.password)) {
      // Lưu thông tin người dùng trong session
      request.session.user = user;
      response.json({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        // Thêm các thuộc tính khác nếu cần thiết
      });
    } else {
      response.status(400).json({ message: "Invalid login credentials" });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// Đăng xuất
router.post("/logout", (request, response) => {
  request.session.destroy((err) => {
    if (err) {
      response.status(500).json({ error: "Error logging out" });
    } else {
      response.status(200).json({ message: "Logout successful" });
    }
  });
});

// API GET để lấy danh sách các người dùng
router.get("/list", async (request, response) => {
  try {
    const userList = await User.find({}, "_id first_name last_name");
    response.json(userList);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// API GET để lấy thông tin chi tiết của một người dùng cụ thể bằng ID
router.get("/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    const user = await User.findById(userId, "-__v");
    if (user) {
      response.json(user);
    } else {
      response.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.post("/register", async (request, response) => {
  const { login_name, password, first_name, last_name, location, description, occupation } = request.body;

  try {
    // Kiểm tra xem login_name đã tồn tại chưa
    const existingUser = await User.findOne({ login_name });
    if (existingUser) {
      return response.status(400).json({ message: "Login name already exists" });
    }

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo đối tượng người dùng mới
    const newUser = new User({
      login_name,
      password: hashedPassword,
      first_name,
      last_name,
      location,
      description,
      occupation,
    });

    // Lưu người dùng mới vào cơ sở dữ liệu
    await newUser.save();

    response.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = router;
