const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// creates instance of express
const app = express();

// create port
const PORT = process.env.PORT || 3001;

// Middleware code
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serves up static client/build files
app.use(express.static("client/build"));

//mongoose connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/google-books-search",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

const connection = mongoose.connection;

// successful connection event listener
connection.on("connected", () => {
  console.log("Mongoose successfully connected!");
});

// error connection event listener
connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

//create config route
app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

// serves up static html file if no routes match
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// listen on port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
