const movieService = require("../services/movieService");
const { catchAsync } = require("../utils/error");

const getMovies = catchAsync(async (req, res) => {
  const { movieStatusesId, filter } = req.query;

  if (!movieStatusesId || !filter) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  const movieList = await movieService.getMovies(movieStatusesId, filter);
  return res.status(200).json({ movieList });
});

module.exports = {
  getMovies,
};
