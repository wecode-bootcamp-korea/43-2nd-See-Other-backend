const dbDataSource = require("../../api/models/dataSource");

const createUsers = (userList) => {
  let data = [];

  for (const user of userList) {
    data.push([
      user.account_email,
      user.nickname,
      user.age_range,
      user.social_id,
      user.social_type_id,
    ]);
  }

  return dbDataSource.query(
    `
    INSERT INTO users (account_email, nickname, age_range, social_id, social_type_id) VALUES ?
    `,
    [data]
  );
};

module.exports = {
  createUsers,
};
