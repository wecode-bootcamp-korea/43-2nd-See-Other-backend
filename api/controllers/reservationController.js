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

module.exports = {
  getOptions,
  getTimes,
};
