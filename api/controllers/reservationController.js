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

module.exports = {
  getOptions,
};
