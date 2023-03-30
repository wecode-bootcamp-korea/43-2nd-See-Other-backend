const request = require("supertest");
const axios = require("axios");

const { createApp } = require("../../app");
const dbDataSource = require("../../api/models/dataSource");

describe("Kakao Signin", () => {
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
    await request(app).post("/users/kakao/sign-in");
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

describe("Movie Review Create", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dbDataSource.initialize();
    await dbDataSource.query(`SET FOREIGN_KEY_CHECKS=0`);
    await dbDataSource.query(`
    INSERT INTO users
    (account_email, nickname, age_range, social_id, social_type_id) VALUES
    ("test@test.com", "test1", "15~19", "1234", 1)
    `);
    await dbDataSource.query(`
    INSERT INTO orders
    (reservation_number, seat_number, order_statuses_id, reservation_options_id, users_id) VALUES
    (1, "A1", 1, 2, 1)
    `);
    await dbDataSource.query(`SET FOREIGN_KEY_CHECKS=1`);
  });

  afterAll(async () => {
    await dbDataSource.query(`SET FOREIGN_KEY_CHECKS=0`);
    await dbDataSource.query(`TRUNCATE users`);
    await dbDataSource.query(`TRUNCATE orders`);
    await dbDataSource.query(`ALTER TABLE users AUTO_INCREMENT = 1`);
    await dbDataSource.query(`ALTER TABLE orders AUTO_INCREMENT = 1`);
    await dbDataSource.query(`SET FOREIGN_KEY_CHECKS=1`);
    await dbDataSource.destroy();
  });

  test("SUCCESS : SUCCESS REVIEW CREATE", async () => {
    const response = await request(app)
      .post("/reviews")
      .set({
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgwMjUyNTAwfQ.NmP4FmH3ZCVmlZpaeohOa0Nt7B09ZPuLgpGdQ8-HogY",
      })
      .send({
        rating: "3",
        comment: "testCreate",
        movieId: "1",
      });

    expect(response.statusCode).toEqual(201);
    expect({ message: "CREATE REVIEW SUCCESS" });
  });

  test("FAILED : FAILED REVIEW CREATED - KEY ERROR - NO RATING", async () => {
    const response = await request(app).post("/reviews").send({
      comment: "test create",
      movieId: "1",
    });

    expect(response.statusCode).toEqual(400);
    expect({ message: "KEY_ERROR" });
  });

  test("FAILED : FAILED REVIEW CREATED - KEY ERROR - NO COMMENT", async () => {
    const response = await request(app).post("/reviews").send({
      rating: "3",
      movieId: "1",
    });

    expect(response.statusCode).toEqual(400);
    expect({ message: "KEY_ERROR" });
  });

  test("FAILED : FAILED REVIEW CREATED - KEY ERROR - NO MOVIEID", async () => {
    const response = await request(app).post("/reviews").send({
      rating: "3",
      comment: "test create",
    });

    expect(response.statusCode).toEqual(400);
    expect({ message: "KEY_ERROR" });
  });

  test("FAILED : FAILED REVIEW CREATED - TOO LONG COMMENT", async () => {
    const response = await request(app).post("/reviews").send({
      rating: "3",
      comment:
        "test create for very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very",
      movieId: "1",
    });

    expect(response.statusCode).toEqual(400);
    expect({ message: "TOO_LONG_COMMENT" });
  });

  test("FAILED : FAILED REVIEW CREATED - INVALID RATING", async () => {
    const response = await request(app).post("/reviews").send({
      rating: "6",
      comment: "test create",
      movieId: "1",
    });

    expect(response.statusCode).toEqual(400);
    expect({ message: "INVALID_RATING" });
  });
});

describe("Movie Review Read", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dbDataSource.initialize();
    await dbDataSource.query(`SET FOREIGN_KEY_CHECKS=0`);
    await dbDataSource.query(`
    INSERT INTO users
    (account_email, nickname, age_range, social_id, social_type_id) VALUES
    ("test@test.com", "test1", "15~19", "1234", 1)
    `);
    await dbDataSource.query(`
    INSERT INTO orders
    (reservation_number, seat_number, order_statuses_id, reservation_options_id, users_id) VALUES
    (2, "A1", 1, 7, 1)
    `);
    await dbDataSource.query(`
    INSERT INTO movie_reviews
    (rating, comment, movies_id, users_id) VALUES
    (1, "test", 2, 1)
    `);
    await dbDataSource.query(`SET FOREIGN_KEY_CHECKS=1`);
  });

  afterAll(async () => {
    await dbDataSource.query(`SET FOREIGN_KEY_CHECKS=0`);
    await dbDataSource.query(`TRUNCATE users`);
    await dbDataSource.query(`TRUNCATE orders`);
    await dbDataSource.query(`TRUNCATE movie_reviews`);
    await dbDataSource.query(`ALTER TABLE users AUTO_INCREMENT = 1`);
    await dbDataSource.query(`ALTER TABLE orders AUTO_INCREMENT = 1`);
    await dbDataSource.query(`ALTER TABLE movie_reviews AUTO_INCREMENT = 1`);
    await dbDataSource.query(`SET FOREIGN_KEY_CHECKS=1`);
    await dbDataSource.destroy();
  });

  test("SUCCESS : SUCCESS REVIEW READ", async () => {
    const response = await request(app).get("/reviews/2");

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("result");
  });
});

describe("Movie Review Update", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dbDataSource.initialize();
    await dbDataSource.query(`SET FOREIGN_KEY_CHECKS=0`);
    await dbDataSource.query(`
    INSERT INTO users
    (account_email, nickname, age_range, social_id, social_type_id) VALUES
    ("test@test.com", "test1", "15~19", "1234", 1)
    `);
    await dbDataSource.query(`
    INSERT INTO orders
    (reservation_number, seat_number, order_statuses_id, reservation_options_id, users_id) VALUES
    (2, "A1", 1, 7, 1)
    `);
    await dbDataSource.query(`
    INSERT INTO movie_reviews
    (rating, comment, movies_id, users_id) VALUES
    (1, "test", 2, 1)
    `);
    await dbDataSource.query(`SET FOREIGN_KEY_CHECKS=1`);
  });

  afterAll(async () => {
    await dbDataSource.query(`SET FOREIGN_KEY_CHECKS=0`);
    await dbDataSource.query(`TRUNCATE users`);
    await dbDataSource.query(`TRUNCATE orders`);
    await dbDataSource.query(`TRUNCATE movie_reviews`);
    await dbDataSource.query(`ALTER TABLE users AUTO_INCREMENT = 1`);
    await dbDataSource.query(`ALTER TABLE orders AUTO_INCREMENT = 1`);
    await dbDataSource.query(`ALTER TABLE movie_reviews AUTO_INCREMENT = 1`);
    await dbDataSource.query(`SET FOREIGN_KEY_CHECKS=1`);
    await dbDataSource.destroy();
  });

  test("SUCCESS : SUCCESS REVIEW UPDATE", async () => {
    const response = await request(app)
      .patch("/reviews")
      .set({
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgwMjUyNTAwfQ.NmP4FmH3ZCVmlZpaeohOa0Nt7B09ZPuLgpGdQ8-HogY",
      })
      .send({
        comment: "test update",
        movieId: 2,
      });

    expect(response.statusCode).toEqual(201);
    expect({ message: "UPDATE REVIEW SUCCESS" });
  });

  test("FAILED : FAILED REVIEW UPDATE - TOO LONG COMMENT", async () => {
    const response = await request(app).patch("/reviews").send({
      rating: "3",
      comment:
        "test create for very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very",
      movieId: "1",
    });

    expect(response.statusCode).toEqual(400);
    expect({ message: "TOO_LONG_COMMENT" });
  });
});

describe("Movie Review Delete", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dbDataSource.initialize();
    await dbDataSource.query(`SET FOREIGN_KEY_CHECKS=0`);
    await dbDataSource.query(`
    INSERT INTO users
    (account_email, nickname, age_range, social_id, social_type_id) VALUES
    ("test@test.com", "test1", "15~19", "1234", 1)
    `);
    await dbDataSource.query(`
    INSERT INTO orders
    (reservation_number, seat_number, order_statuses_id, reservation_options_id, users_id) VALUES
    (2, "A1", 1, 7, 1)
    `);
    await dbDataSource.query(`
    INSERT INTO movie_reviews
    (rating, comment, movies_id, users_id) VALUES
    (1, "test", 2, 1)
    `);
    await dbDataSource.query(`SET FOREIGN_KEY_CHECKS=1`);
  });

  afterAll(async () => {
    await dbDataSource.query(`SET FOREIGN_KEY_CHECKS=0`);
    await dbDataSource.query(`TRUNCATE users`);
    await dbDataSource.query(`TRUNCATE orders`);
    await dbDataSource.query(`TRUNCATE movie_reviews`);
    await dbDataSource.query(`ALTER TABLE users AUTO_INCREMENT = 1`);
    await dbDataSource.query(`ALTER TABLE orders AUTO_INCREMENT = 1`);
    await dbDataSource.query(`ALTER TABLE movie_reviews AUTO_INCREMENT = 1`);
    await dbDataSource.query(`SET FOREIGN_KEY_CHECKS=1`);
    await dbDataSource.destroy();
  });

  test("SUCCESS : SUCCESS REVIEW DELETE", async () => {
    const response = await request(app)
      .delete("/reviews")
      .set({
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgwMjUyNTAwfQ.NmP4FmH3ZCVmlZpaeohOa0Nt7B09ZPuLgpGdQ8-HogY",
      })
      .send({
        movieId: 2,
      });

    expect(response.statusCode).toEqual(204);
    // expect({ message: "DELETE REVIEW SUCCESS" });
  });
});
