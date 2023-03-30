const express = require("express");
const { userController } = require("../controllers");

const router = express.Router();

router.post("/kakao/sign-in", userController.kakaoSignIn);

module.exports = router;
