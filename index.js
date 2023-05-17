// Node JS is Event Driven and Runtime Environment
// Step 01: Require Express JS
const express = require("express");

const cors = require("cors");

const userRoutes = require("./routes/user.routes");

// Step 02: Acquire express in app variable
const app = express();

require("dotenv").config();
// Step 03: PORT
// const PORT = 4000

app.use(
  cors({
    cors: "*",
  })
);

require("./models/db")();

// Step 06: Middlewares
app.use(express.json());

app.use((req, res, next) => {
  console.log("method: %s url: %s", req.method, req.url);
  next();
});

// Step 05: Create Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.post("/api/product/add/", (req, res) => {
//     res.send(req.body)
// })

app.use("/api/user", userRoutes);

// Step 04: Listen the express app
app.listen(process.env.PORT || 8000, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 8000}`
  );
});
