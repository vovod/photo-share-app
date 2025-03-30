const fs = require("fs");
const path = require("path");

// Đường dẫn đến thư mục chứa các hình ảnh
const imageDir = "src/images";

// Hàm mã hóa một file ảnh thành chuỗi base64 và lưu vào file text
function encodeAndSaveImage(imagePath) {
  try {
    // Đọc dữ liệu từ file ảnh
    const imageData = fs.readFileSync(imagePath);

    // Chuyển dữ liệu thành dạng base64
    const encodedImage = imageData.toString("base64");

    // Tạo tên file text dựa trên tên file ảnh
    const baseName = path.basename(imagePath);
    const txtFileName = baseName + ".txt";

    // Đường dẫn đến file text
    const txtFilePath = path.join("base64_images", txtFileName);

    // Lưu chuỗi base64 vào file text
    fs.writeFileSync(txtFilePath, encodedImage, "utf8");

    console.log(`Successfully encoded and saved ${baseName}`);
  } catch (err) {
    console.error("Error reading or saving image file:", err);
  }
}

// Hàm duyệt qua tất cả các file trong thư mục và mã hóa chúng thành base64
function encodeAllImagesInDirectory(directory) {
  // Đọc danh sách tất cả các file trong thư mục
  const files = fs.readdirSync(directory);

  // Tạo thư mục để lưu trữ các file text chứa base64
  const base64Dir = "base64_images";
  if (!fs.existsSync(base64Dir)) {
    fs.mkdirSync(base64Dir);
  }

  // Duyệt qua từng file trong thư mục
  files.forEach((file) => {
    // Đường dẫn đầy đủ đến file
    const filePath = path.join(directory, file);

    // Kiểm tra xem file có phải là file ảnh không (ví dụ: jpg, png, gif, ...)
    if (
      fs.statSync(filePath).isFile() &&
      /\.(jpg|png|gif|jpeg)$/i.test(filePath)
    ) {
      // Mã hóa file ảnh thành base64 và lưu vào file text
      encodeAndSaveImage(filePath);
    }
  });
}

// Mã hóa tất cả các hình ảnh trong thư mục `src/images`
encodeAllImagesInDirectory(imageDir);
