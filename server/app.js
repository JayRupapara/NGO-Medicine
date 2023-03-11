const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");
var cookieParser = require("cookie-parser");
require("./config/DBconnection");

const DonerRouter = require("./routes/Doner.routes");
const AdminRouter = require("./routes/Admin.routes");

const options = {
  origin: "http://localhost:5173",
  credentials: true,
};

// app.use(cors(options));
app.use(cors())
app.use(cookieParser());
app.use(express.json());

app.use(DonerRouter);
app.use("/api/admin", AdminRouter);

app.get("/", (req, res) => {
  res.send("hello buddy 😶‍🌫️");
});

app.listen(PORT, (err, res) => {
  console.log("listening on port " + PORT);
});
