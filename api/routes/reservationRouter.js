const express = require("express");
const reservationController = require("../controllers/reservationController");

const router = express.Router();

router.get("", reservationController.getOptions);
router.get("/times", reservationController.getTimes);
router.get("/seats", reservationController.getSeats);
router.post("", reservationController.postReservation);
router.get("/user", reservationController.getReservation);

module.exports = router;
