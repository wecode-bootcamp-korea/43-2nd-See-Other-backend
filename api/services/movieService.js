const movieDao = require("../models/movieDao");

const getMovies = async (movieStatusesId, filter) => {
  const movieList = await movieDao.getMovies(movieStatusesId, filter);

  const movies = movieList.map((movie) => {
    movie.hallTypes = Array.from(new Set(movie.hallTypes));
    return movie;
  });
  return movies;
};

const getMoviedetails = async (movieId) => {
  const movieList = await movieDao.getMoviedetails(movieId);
  return movieList;
};

module.exports = {
  getMovies,
  getMoviedetails,
};
