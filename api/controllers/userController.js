const { userService } = require("../services");
const { catchAsync } = require("../utils/error");

const kakaoSignIn = catchAsync(async (req, res) => {
  const kakaoToken = req.headers.authorization;

  if (!kakaoToken) {
    const error = new Error("INVALID_KAKAO_ACCESS_TOKEN");
    error.statusCode = 400;
    throw error;
  }
  const { statusCode, accessToken, userAgeRange, userNickname } =
    await userService.kakaoSignIn(kakaoToken);
  return res
    .status(statusCode)
    .json({ accessToken, userAgeRange, userNickname });
});

module.exports = {
  kakaoSignIn,
};
