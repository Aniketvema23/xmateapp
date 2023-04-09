require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const multer = require("multer");
const mysql = require("mysql");
const path = require("path");

 
//  const express = require('express');
// import dotenv from 'dotenv' 
// dotenv.config()
// App Config
const app = express();
const port = process.env.PORT || 8000; // port app gonna listen
 

// Middlewares
// const urlreq= meta.url;
// const __Filename = fileURLToPath(urlreq);
// const __dirname = path.dirname(__Filename);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

 

// DB config
 

 // create constants for the application.
const constants = {
  matchRequestStatus: {
    pending: 0,
    accepted: 1,
    rejected: -1,
  },
};

// config multers.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.jpg`);
  },
});

const upload = multer({ storage: storage });
 
// API Endpoints
// ## go root url, callback func
app.get("/", (req, res) => {
  res.status(200).send("HELLO WORLD!!!");
});

const dbConn = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER_NAME || "root",
  password: process.env.DB_USER_PASSWORD || "aniket232@",
  database: process.env.DB_NAME || "tinder_clone",
  port: process.env.DB_PORT || "3306",
});

require("./routes")({ app, dbConn, upload, constants });

// const auth = require("./routes/auth");
// console.log(auth);
dbConn.connect(function (err) {
  if (err) {
    console.log("Errore login: " + err);
}
  console.log("Database was connected");
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});