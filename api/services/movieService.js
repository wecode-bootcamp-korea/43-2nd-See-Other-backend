const movieDao = require("../models/movieDao");

const getMovies = async (movieStatusesId, filter) => {
  const movieList = await movieDao.getMovies(movieStatusesId, filter);

  const movies = movieList.map((movie) => {
    movie.hallTypes = Array.from(new Set(movie.hallTypes));
    return movie;
  });
  return movies;
};

module.exports = {
  getMovies,
};
