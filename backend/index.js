const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");

dbConnect();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" })); // Set the maximum payload size limit to 10mb
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use("/api/user", UserRouter);
app.use("/api/photo", PhotoRouter);

app.get("/", (request, response) => {
  response.send({ message: "Hello from photo-sharing app API!" });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
