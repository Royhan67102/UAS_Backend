// import express dan routing
const express = require("express");
const router = require("./routes/api.js");

// import dotenv dan menjalankan method config
require("dotenv").config();

// destructing object process.env
const { APP_PORT } = process.env;

// Membuat object express
const app = express();

// Menggunakan middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Menggunakan routing (router)
app.use(router);

// Mendefinisikan port
const port = APP_PORT || 3000;

// Menjalankan server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});