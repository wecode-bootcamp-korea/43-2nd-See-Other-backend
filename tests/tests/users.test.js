const request = require("supertest");
const axios = require("axios");

const { createApp } = require("../../app");
const dbDataSource = require("../../api/models/dataSource");

describe("Sign Up", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dbDataSource.initialize();
  });

  afterAll(async () => {
    await dbDataSource.query(`SET FOREIGN_KEY_CHECKS=0`);
    await dbDataSource.query(`TRUNCATE users`);
    await dbDataSource.query(`ALTER TABLE users AUTO_INCREMENT = 1`);
    await dbDataSource.query(`SET FOREIGN_KEY_CHECKS=1`);
    await dbDataSource.destroy();
  });

  test("FAILED : INVAILD KAKAO TOKEN", async () => {
    await request(app).post("/users/kakao/signIn");
    expect(400);
    expect({ message: "INVALID_KAKAO_ACCESS_TOKEN" });
  });

  test("SUCCESS : SUCCESS KAKAO SIGNUP AND LOGIN", async () => {
    axios.get = jest.fn().mockReturnValue({
      data: {
        id: 1234,
        properties: {
          nickname: "테스트",
        },
        kakao_account: {
          age_range: "15~19",
          email: "testtest222@gmail.com",
        },
      },
    });
    const response = await request(app)
      .post("/users/kakao/sign-in")
      .set({ Authorization: "TEST ACCESS TOKEN" });
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("accessToken");
  });

  test("SUCCESS : SUCCESS KAKAO LOGIN", async () => {
    axios.get = jest.fn().mockReturnValue({
      data: {
        id: 1234,
        properties: {
          nickname: "테스트",
        },
        kakao_account: {
          age_range: "15~19",
          email: "testtest222@gmail.com",
        },
      },
    });
    const response = await request(app)
      .post("/users/kakao/sign-in")
      .set({ Authorization: "TEST ACCESS TOKEN" });
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("accessToken");
  });
});
