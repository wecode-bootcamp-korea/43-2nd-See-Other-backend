const express = require("express");

const movieRouter = require("./movieRouter");
const userRouter = require("./userRouter");

const router = express.Router();

router.use("/movies", movieRouter);
router.use("/users", userRouter);

module.exports = router;
