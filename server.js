const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

// const pokemonRoute = require("./routes/pokemon");
// const homeRouter = require("./routes/home");
const userRouter = require("./routes/user");
const reviewRouter = require("./routes/review");
const gameRouter = require("./routes/game");
const mongooseEndpoint =
  process.env.MONGODB_URI || "mongodb://127.0.0.1/gamiew_app";

mongoose.connect(mongooseEndpoint, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));

const cors = require("cors");
// const auth_middleware = require("./routes/middleware/auth_middleware");

app.use(express.static(path.join(__dirname, "build")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //parse cookie into useful data

app.use(
  cors({
    origin: "*",
  })
);

// app.use(auth_middleware);
// app.use("/api/home", homeRouter);
app.use("/user", userRouter);
app.use("/review", reviewRouter);
app.use("/game", gameRouter);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Starting server");
});
