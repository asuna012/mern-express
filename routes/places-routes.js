const express = require("express");
const router = express.Router();
const placesControllers = require("../controllers/places-controllers");

router.get("/:pid", placesControllers.getPlaceByID);

router.get("/user/:uid", placesControllers.getPlaceByUserID);

module.exports = router;
