const express = require("express");
const { reviewController } = require("../controllers");
const { loginRequired } = require("../utils/auth");

const router = express.Router();

router.post("", reviewController.createReview);
router.get("/:movieId", reviewController.getReview);
router.patch("", reviewController.updateReview);
router.delete("", reviewController.deleteReview);

module.exports = router;
