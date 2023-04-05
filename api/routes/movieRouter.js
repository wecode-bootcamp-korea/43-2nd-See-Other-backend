const express = require("express");

const movieController = require("../controllers/movieController");

const router = express.Router();

router.get("", movieController.getMovies);
router.get("/details/:movieId", movieController.getMoviedetails);

module.exports = router;
