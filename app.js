const express = require("express");
const path = require('path')
const bodyParser = require("body-parser");
const  fs = require('fs')
const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});



app.use((error, req, res, next) => {
  if(req.file){
    fs.unlink(req.file.path, (err)=>{
    console.log(err);
    
    })
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500).json({
    message: error.message || "An unknown error occured! Please try again",
  });
});

mongoose
  .connect(
    "mongodb+srv://lelouch:LCv1lQ8Y9B8lBfuJ@cluster0.hhzr3e3.mongodb.net/places?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });
