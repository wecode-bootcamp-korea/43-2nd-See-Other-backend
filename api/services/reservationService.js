const reservationDao = require("../models/reservationDao");
const {
  movieOptionBuilder,
  upperWhereClauseBuilder,
  lowerWhereClauseBuilder,
  movieSeatBuilder,
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

const getSeats = async (
  movie,
  cinemaName,
  hallType,
  date,
  time,
  screeningRoom
) => {
  const whereClause = await movieSeatBuilder(
    movie,
    cinemaName,
    hallType,
    date,
    time,
    screeningRoom
  );

  const getSeats = await reservationDao.listSeatOptions(whereClause);

  return getSeats;
};

const postReservation = async (
  userId,
  seatNumber,
  orderStatusesId,
  date,
  time,
  movie,
  cinemaName,
  screeningRoom,
  hallType
) => {
  const dateId = (await reservationDao.getDateId(date))[0].id;
  const timeId = (await reservationDao.getTimeId(time))[0].id;
  const movieId = (await reservationDao.getMovieId(movie))[0].id;
  const cinemaNameId = (await reservationDao.getCinemaNameId(cinemaName))[0].id;
  const screeningRoomId = (
    await reservationDao.getScreeningRoomId(screeningRoom)
  )[0].id;
  const hallTypeId = (await reservationDao.getHallTypeId(hallType))[0].id;
  const reservationOptionsId = (
    await reservationDao.getReservationOptionId(
      dateId,
      timeId,
      movieId,
      cinemaNameId,
      screeningRoomId,
      hallTypeId
    )
  )[0].id;

  const result = await reservationDao.postReservation(
    userId,
    seatNumber,
    orderStatusesId,
    reservationOptionsId,
    reservationNumber
  );
  return result;
};

const getReservation = async (userId) => {
  const result = await reservationDao.getReservation(userId);
  return result;
};

module.exports = {
  postReservation,
  getReservation,
  getOptions,
  getTimes,
  getSeats,
};
