const fs = require("fs");
const path = require("path");
// Create init users.
const im = {
  _id: "57231f1a30e4351f4e9f4bd7",
  login_name: "im",
  password: "password1",
  first_name: "Ian",
  last_name: "Malcolm",
  location: "Austin, TX",
  description: "Should've stayed in the car.",
  occupation: "Mathematician",
};
const er = {
  _id: "57231f1a30e4351f4e9f4bd8",
  login_name: "er",
  password: "password2",
  first_name: "Ellen",
  last_name: "Ripley",
  location: "Nostromo",
  description: "Lvl 6 rating. Pilot.",
  occupation: "Warrant Officer",
};
const pt = {
  _id: "57231f1a30e4351f4e9f4bd9",
  login_name: "pt",
  password: "password3",
  first_name: "Peregrin",
  last_name: "Took",
  location: "Gondor",
  description:
    "Home is behind, the world ahead... " +
    "And there are many paths to tread. Through shadow, to the edge of night, " +
    "until the stars are all alight... Mist and shadow, cloud and shade, " +
    "all shall fade... all... shall... fade... ",
  occupation: "Thain",
};
const rk = {
  _id: "57231f1a30e4351f4e9f4bda",
  login_name: "rk",
  password: "password4",
  first_name: "Rey",
  last_name: "Kenobi",
  location: "D'Qar",
  description: "Excited to be here!",
  occupation: "Rebel",
};
const al = {
  _id: "57231f1a30e4351f4e9f4bdb",
  login_name: "al",
  password: "password5",
  first_name: "April",
  last_name: "Ludgate",
  location: "Pawnee, IN",
  description: "Witch",
  occupation: "Animal Control",
};
const jo = {
  _id: "57231f1a30e4351f4e9f4bdc",
  login_name: "jo",
  password: "password6",
  first_name: "John",
  last_name: "Ousterhout",
  location: "Stanford, CA",
  description: "<i>CS142!</i>",
  occupation: "Professor",
};

const users = [im, er, pt, rk, al, jo];

// Create initial photos.
const photo1 = {
  _id: "57231f1a30e4351f4e9f4bdd",
  date_time: "2012-08-30 10:44:23",
  file_name: "ouster.jpg",
  user_id: jo._id,
};
const photo2 = {
  _id: "57231f1a30e4351f4e9f4bde",
  date_time: "2009-09-13 20:00:00",
  file_name: "malcolm2.jpg",
  user_id: im._id,
};
const photo3 = {
  _id: "57231f1a30e4351f4e9f4bdf",
  date_time: "2009-09-13 20:05:03",
  file_name: "malcolm1.jpg",
  user_id: im._id,
};
const photo4 = {
  _id: "57231f1a30e4351f4e9f4be0",
  date_time: "2013-11-18 18:02:00",
  file_name: "ripley1.jpg",
  user_id: er._id,
};
const photo5 = {
  _id: "57231f1a30e4351f4e9f4be1",
  date_time: "2013-09-20 17:30:00",
  file_name: "ripley2.jpg",
  user_id: er._id,
};
const photo6 = {
  _id: "57231f1a30e4351f4e9f4be2",
  date_time: "2009-07-10 16:02:49",
  file_name: "kenobi1.jpg",
  user_id: rk._id,
};
const photo7 = {
  _id: "57231f1a30e4351f4e9f4be3",
  date_time: "2010-03-18 23:48:00",
  file_name: "kenobi2.jpg",
  user_id: rk._id,
};
const photo8 = {
  _id: "57231f1a30e4351f4e9f4be4",
  date_time: "2010-08-30 14:26:00",
  file_name: "kenobi3.jpg",
  user_id: rk._id,
};
const photo9 = {
  _id: "57231f1a30e4351f4e9f4be5",
  date_time: "2013-12-03 09:02:00",
  file_name: "took1.jpg",
  user_id: pt._id,
};
const photo10 = {
  _id: "57231f1a30e4351f4e9f4be6",
  date_time: "2013-12-03 09:03:00",
  file_name: "took2.jpg",
  user_id: pt._id,
};
const photo11 = {
  _id: "57231f1a30e4351f4e9f4be7",
  date_time: "2013-09-04 09:16:32",
  file_name: "ludgate1.jpg",
  user_id: al._id,
};
const photo12 = {
  _id: "57231f1a30e4351f4e9f4be8",
  date_time: "2008-10-16 17:12:28",
  file_name: "kenobi4.jpg",
  user_id: rk._id,
};

const photos = [
  photo1,
  photo2,
  photo3,
  photo4,
  photo5,
  photo6,
  photo7,
  photo8,
  photo9,
  photo10,
  photo11,
  photo12,
];
// Hàm đọc dữ liệu base64 từ file ảnh
function readBase64Image(filePath) {
  // Đọc file ảnh
  const imageData = fs.readFileSync(filePath);
  // Chuyển đổi thành dạng base64
  const base64Data = Buffer.from(imageData).toString("base64");
  return imageData;
}

// Dữ liệu người dùng
const usersData = `
const im = {
  _id: "57231f1a30e4351f4e9f4bd7",
  login_name: "im",
  password: "password1",
  first_name: "Ian",
  last_name: "Malcolm",
  location: "Austin, TX",
  description: "Should've stayed in the car.",
  occupation: "Mathematician",
};
const er = {
  _id: "57231f1a30e4351f4e9f4bd8",
  login_name: "er",
  password: "password2",
  first_name: "Ellen",
  last_name: "Ripley",
  location: "Nostromo",
  description: "Lvl 6 rating. Pilot.",
  occupation: "Warrant Officer",
};
const pt = {
  _id: "57231f1a30e4351f4e9f4bd9",
  login_name: "pt",
  password: "password3",
  first_name: "Peregrin",
  last_name: "Took",
  location: "Gondor",
  description:
    "Home is behind, the world ahead... " +
    "And there are many paths to tread. Through shadow, to the edge of night, " +
    "until the stars are all alight... Mist and shadow, cloud and shade, " +
    "all shall fade... all... shall... fade... ",
  occupation: "Thain",
};
const rk = {
  _id: "57231f1a30e4351f4e9f4bda",
  login_name: "rk",
  password: "password4",
  first_name: "Rey",
  last_name: "Kenobi",
  location: "D'Qar",
  description: "Excited to be here!",
  occupation: "Rebel",
};
const al = {
  _id: "57231f1a30e4351f4e9f4bdb",
  login_name: "al",
  password: "password5",
  first_name: "April",
  last_name: "Ludgate",
  location: "Pawnee, IN",
  description: "Witch",
  occupation: "Animal Control",
};
const jo = {
  _id: "57231f1a30e4351f4e9f4bdc",
  login_name: "jo",
  password: "password6",
  first_name: "John",
  last_name: "Ousterhout",
  location: "Stanford, CA",
  description: "<i>CS142!</i>",
  occupation: "Professor",
};

const users = [im, er, pt, rk, al, jo];
`;

// Dữ liệu ảnh
let i = 1;
const photosData = photos.map((photo) => {
  // Đọc dữ liệu base64 từ file ảnh
  const base64Data = readBase64Image(
    path.join("base64_images", photo.file_name + ".txt"),
  );

  // Tạo đối tượng ảnh với dữ liệu base64
  return `
const photo${i++} = {
  _id: "${photo._id}",
  date_time: "${photo.date_time}",
  file_name: "${photo.file_name}",
  user_id: "${photo.user_id}",
  image: "${base64Data}",
};
`;
});

// Chuỗi dữ liệu tổng cộng
const outputData = usersData + photosData.join("\n");

// Tên file để lưu dữ liệu
const outputFile = "data.txt";

// Ghi dữ liệu vào file
fs.writeFile(outputFile, outputData, "utf8", (err) => {
  if (err) {
    console.error("Lỗi khi ghi file:", err);
    return;
  }
  console.log(`Dữ liệu đã được ghi vào file ${outputFile} thành công.`);
});
