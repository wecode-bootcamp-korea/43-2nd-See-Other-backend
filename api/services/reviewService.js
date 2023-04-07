const jwt = require("jsonwebtoken");

const { reviewDao } = require("../models");
const { commentValidate } = require("../utils/validate-check");

const createReview = async (accessToken, rating, comment, movieId) => {
  await commentValidate(comment);

  const userId = jwt.verify(accessToken, process.env.JWT_SECRET).id;
  const checkUserMovie = await reviewDao.checkUserMovie(userId, movieId);
  if (checkUserMovie == false) {
    const error = new Error("CANNOT_REVIEW");
    error.statusCode = 400;
    throw error;
  }

  return await reviewDao.createReview(userId, rating, comment, movieId);
};

const getReview = async (movieId) => {
  return await reviewDao.getReview(movieId);
};

const updateReview = async (comment, movieId, accessToken) => {
  await commentValidate(comment);
  const userId = jwt.verify(accessToken, process.env.JWT_SECRET).id;
  const checkReview = await reviewDao.checkReview(userId, movieId);
  if (checkReview == true) {
    const error = new Error("CANNOT_UPDATE_REVIEW");
    error.statusCode = 400;
    throw error;
  }
  const numberOfReview = (await reviewDao.getNumberOfReview(userId, movieId))[0]
    .id;
  return await reviewDao.updateReview(comment, numberOfReview);
};

const deleteReview = async (movieId, accessToken) => {
  const userId = jwt.verify(accessToken, process.env.JWT_SECRET).id;
  const checkReview = await reviewDao.checkReview(userId, movieId);
  if (checkReview == true) {
    const error = new Error("CANNOT_UPDATE_REVIEW");
    error.statusCode = 400;
    throw error;
  }
  const numberOfReview = (await reviewDao.getNumberOfReview(userId, movieId))[0]
    .id;
  return await reviewDao.deleteReview(movieId, numberOfReview);
};

module.exports = {
  createReview,
  getReview,
  updateReview,
  deleteReview,
};
