const jwt = require("jsonwebtoken");

const { userDao } = require("../models");
const { catchAsync } = require("../utils/error");

const loginRequired = catchAsync(async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    const error = new Error("NEED_ACCESS_TOKEN");
    error.statusCode = 401;

    throw error;
  }

  const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET);

  const user = await userDao.checkKakaoId(decoded.id);

  if (!user) {
    const error = new Error("USER_DOES_NOT_EXIST");
    error.statusCode = 404;
    throw error;
  }

  req.user = user;
  next();
});

module.exports = {
  loginRequired,
};
