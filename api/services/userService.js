const jwt = require("jsonwebtoken");
const axios = require("axios");

const { userDao } = require("../models");

const kakaoSignIn = async (kakaoToken) => {
  const getKakaoUserData = await axios.get(
    "https://kapi.kakao.com/v2/user/me",
    {
      headers: {
        Authorization: `Bearer ${kakaoToken}`,
      },
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    }
  );

  const {
    id: kakaoId,
    properties: { nickname: profileNickname },
    kakao_account: { email: accountEmail, age_range: ageRange },
  } = getKakaoUserData.data;

  const ifCheckKakaoId = await userDao.checkKakaoId(kakaoId);
  let statusCode = 200;
  if (!ifCheckKakaoId) {
    await userDao.kakakoSignIn(
      kakaoId,
      profileNickname,
      accountEmail,
      ageRange
    );
    statusCode = 201;
  }
  const getUserId = await userDao.getUserId(kakaoId);
  const getUserInfo = await userDao.getUserInfo(kakaoId);
  const userNickname = getUserInfo[0].nickname;
  const userAgeRange = getUserInfo[0].age_range;
  const accessToken = await jwt.sign({ id: getUserId }, process.env.JWT_SECRET);
  return { accessToken, statusCode, userAgeRange, userNickname };
};
module.exports = {
  kakaoSignIn,
};
