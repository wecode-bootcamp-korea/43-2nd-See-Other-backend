const express = require("express");
const reservationController = require("../controllers/reservationController");

const router = express.Router();

router.get("", reservationController.getOptions);
router.get("/times", reservationController.getTimes);

module.exports = router;
