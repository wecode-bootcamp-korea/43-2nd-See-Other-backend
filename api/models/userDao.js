const dbDataSource = require("./dataSource");
const Type = require("../utils/enum");

const kakakoSignIn = async (
  kakaoId,
  profileNickname,
  accountEmail,
  ageRange
) => {
  const social_type_id = await Type.SocialType["KAKAO"];
  const result = await dbDataSource.query(
    `
    INSERT INTO users (account_email, nickname, age_range, social_id, social_type_id) VALUES (?, ?, ?, ?, ?)
    `,
    [accountEmail, profileNickname, ageRange, kakaoId, social_type_id]
  );
  return result;
};

const checkKakaoId = async (kakaoId) => {
  let [result] = await dbDataSource.query(
    `SELECT social_id FROM users WHERE users.social_id = ?`,
    [kakaoId]
  );
  return result;
};

const getUserId = async (kakaoId) => {
  const [result] = await dbDataSource.query(
    `SELECT users.id FROM users WHERE users.social_id = ?`,
    [kakaoId]
  );
  return result.id;
};

module.exports = {
  kakakoSignIn,
  checkKakaoId,
  getUserId,
};
