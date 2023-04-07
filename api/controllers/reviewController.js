const { reviewService } = require("../services");
const { catchAsync } = require("../utils/error");

const createReview = catchAsync(async (req, res) => {
  const { rating, comment, movieId } = req.body;
  const accessToken = req.headers.authorization;

  if (!rating || !comment || !movieId) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;
    throw error;
  }

  if (rating < 1 || rating > 5) {
    const error = new Error("INVALID_RATING");
    error.statusCode = 400;
    throw error;
  }
  await reviewService.createReview(accessToken, rating, comment, movieId);
  return res.status(201).json({ message: "CREATE REVIEW SUCCESS" });
});

const getReview = catchAsync(async (req, res) => {
  const { movieId } = req.params;
  const result = await reviewService.getReview(movieId);
  return res.status(201).json({ result });
});

const updateReview = catchAsync(async (req, res) => {
  const { comment, movieId } = req.body;
  const accessToken = req.headers.authorization;
  await reviewService.updateReview(comment, movieId, accessToken);
  return res.status(201).json({ message: "UPDATE REVIEW SUCCESS" });
});

const deleteReview = catchAsync(async (req, res) => {
  const { movieId } = req.body;
  const accessToken = req.headers.authorization;
  await reviewService.deleteReview(movieId, accessToken);
  return res.status(204).send();
});

module.exports = {
  createReview,
  getReview,
  updateReview,
  deleteReview,
};
