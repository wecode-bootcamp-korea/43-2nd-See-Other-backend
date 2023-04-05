const reservationDao = require("../models/reservationDao");
const {
  movieOptionBuilder,
  upperWhereClauseBuilder,
  lowerWhereClauseBuilder,
} = require("../models/builder");

const getOptions = async (movie, cinemaName, hallType, date) => {
  const whereClause = await movieOptionBuilder(
    movie,
    cinemaName,
    hallType,
    date
  );

  const listMovieOptions = await reservationDao.listMovieOptions(whereClause);
  const listRegionOptions = await reservationDao.listRegionOptions(whereClause);
  const listHallTypeOptions = await reservationDao.listHallTypeOptions(
    whereClause
  );
  const listDateOptions = await reservationDao.listDateOptions(whereClause);

  return {
    listMovieOptions,
    listRegionOptions,
    listHallTypeOptions,
    listDateOptions,
  };
};

const getTimes = async (movie, cinemaName, hallType, date) => {
  const upperWhereClause = await upperWhereClauseBuilder(
    movie,
    cinemaName,
    hallType,
    date
  );
  const lowerWhereClause = await lowerWhereClauseBuilder(
    movie,
    cinemaName,
    hallType,
    date
  );

  const getTimes = await reservationDao.listTimes(
    upperWhereClause,
    lowerWhereClause
  );
  return getTimes;
};

module.exports = {
  getOptions,
  getTimes,
};
