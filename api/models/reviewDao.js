const dbDataSource = require("./dataSource");

const createReview = async (userId, rating, comment, movieId) => {
  await dbDataSource.query(
    `
    INSERT INTO movie_reviews (
      users_id, rating, comment, movies_id
    ) VALUES (
      ?, ?, ?, ?
    )
    `,
    [userId, rating, comment, movieId]
  );

  return await dbDataSource.query(
    `
    UPDATE movies
    SET average_rating = (
        SELECT AVG(rating)
        FROM movie_reviews
        WHERE movies_id = ?
    )
    WHERE id = ?
    `,
    [movieId, movieId]
  );
};

const getReview = async (movieId) => {
  const result = await dbDataSource.query(
    `
    SELECT rating, comment, u.nickname
    FROM movie_reviews as mr
    JOIN users as u
    ON mr.users_id = u.id
    WHERE mr.movies_id = ?
    `,
    [movieId]
  );
  return result;
};

const updateReview = async (comment, numberOfReview) => {
  const result = await dbDataSource.query(
    `
    UPDATE movie_reviews 
    SET comment = ?
    WHERE movie_reviews.id = ?
    `,
    [comment, numberOfReview]
  );
  return result;
};

const deleteReview = async (movieId, numberOfReview) => {
  await dbDataSource.query(
    `
    DELETE FROM movie_reviews
    WHERE movie_reviews.id = ?
    `,
    [numberOfReview]
  );
  const [result] = await dbDataSource.query(
    `
    SELECT COUNT(id) as totalReviews, SUM(rating) as totalRating
    FROM movie_reviews
    WHERE movies_id = ?
    `,
    [movieId]
  );
  const averageRating = result.totalRating
    ? result.totalRating / result.totalReview
    : 0;
  await dbDataSource.query(
    `
    UPDATE movies
    SET average_rating = ?
    WHERE id = ?
    `,
    [averageRating, movieId]
  );
};

const checkUserMovie = async (userId, movieId) => {
  const [result] = await dbDataSource.query(
    `
    SELECT EXISTS (
      SELECT o.id
      FROM orders as o
      JOIN reservation_options as ro
      ON o.reservation_options_id = ro.id
      WHERE o.users_id = ?
      AND ro.movies_id = ?
    ) as ifexist;
    `,
    [userId, movieId]
  );
  return !!parseInt(result.ifexist);
};

const checkReview = async (userId, movieId) => {
  const [reviewId] = await dbDataSource.query(
    `
    SELECT EXISTS (
      SELECT mr.id
      FROM movie_reviews as mr
      WHERE mr.movies_id = ?
      AND mr.users_id = ?
      ) as ifexist
    `,
    [movieId, userId]
  );

  return !!parseInt(reviewId.exists);
};

const getNumberOfReview = async (userId, movieId) => {
  const numberOfReview = await dbDataSource.query(
    `
    SELECT id
    FROM movie_reviews as mr
    WHERE mr.movies_id = ?
    AND mr.users_id = ?
    `,
    [movieId, userId]
  );
  return numberOfReview;
};

module.exports = {
  createReview,
  getReview,
  updateReview,
  deleteReview,
  checkUserMovie,
  checkReview,
  getNumberOfReview,
};
