const reservationService = require("../services/reservationService");
const { catchAsync } = require("../utils/error");

const getOptions = catchAsync(async (req, res) => {
  const { movie, cinemaName, hallType, date } = req.query;

  const getOptions = await reservationService.getOptions(
    movie,
    cinemaName,
    hallType,
    date
  );
  return res.status(200).json({ getOptions });
});

const getTimes = catchAsync(async (req, res) => {
  const { movie, cinemaName, hallType, date } = req.query;

  const getTimes = await reservationService.getTimes(
    movie,
    cinemaName,
    hallType,
    date
  );
  return res.status(200).json({ getTimes });
});

const getSeats = catchAsync(async (req, res) => {
  const { movie, cinemaName, hallType, date, time, screeningRoom } = req.query;

  const getSeats = await reservationService.getSeats(
    movie,
    cinemaName,
    hallType,
    date,
    time,
    screeningRoom
  );

  return res.status(200).json({ getSeats });
});

module.exports = {
  getOptions,
  getTimes,
  getSeats,
};
