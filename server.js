const express = require("express");
const app = express();
const mongoose = require("mongoose");

// create port
const PORT = process.env.PORT || 3001;

// Middleware code
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// listen on port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
