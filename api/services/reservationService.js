const reservationDao = require("../models/reservationDao");
const { movieOptionBuilder } = require("../models/builder");

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

module.exports = {
  getOptions,
};
