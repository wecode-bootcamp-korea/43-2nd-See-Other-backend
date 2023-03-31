const express = require("express");

const movieRouter = require("./movieRouter");
const userRouter = require("./userRouter");
const reservationRouter = require("./reservationRouter");

const router = express.Router();

router.use("/movies", movieRouter);
router.use("/users", userRouter);
router.use("/reservation", reservationRouter);

module.exports = router;
