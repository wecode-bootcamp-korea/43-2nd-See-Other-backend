const reservationService = require("../services/reservationService");
const jwt = require("jsonwebtoken");
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

const postReservation = catchAsync(async (req, res) => {
  const accessToken = req.headers.authorization;
  let seatNumber = req.body.seatNumber;
  seatNumber = JSON.stringify(seatNumber);
  const { date, time, movie, cinemaName, screeningRoom, hallType } = req.body;
  const orderStatusesId = 1;
  if (!accessToken) {
    const error = new Error("INVALID_KAKAO_ACCESS_TOKEN");
    error.statusCode = 400;
    throw error;
  }
  if (
    !seatNumber ||
    !date ||
    !time ||
    !movie ||
    !cinemaName ||
    !screeningRoom ||
    !hallType
  ) {
    const error = new Error("INVALID_INPUT");
    error.statusCode = 400;
    throw error;
  }
  const userId = (await jwt.verify(accessToken, process.env.JWT_SECRET)).id;
  await reservationService.postReservation(
    userId,
    seatNumber,
    orderStatusesId,
    date,
    time,
    movie,
    cinemaName,
    screeningRoom,
    hallType
  );
  return res.status(201).json({ message: "RESERVATION_CREATED" });
});

const getReservation = catchAsync(async (req, res) => {
  const accessToken = req.headers.authorization;
  const userId = (await jwt.verify(accessToken, process.env.JWT_SECRET)).id;
  const result = await reservationService.getReservation(userId);
  return res.status(201).json({ result });
});

module.exports = {
  postReservation,
  getReservation,
  getOptions,
  getTimes,
  getSeats,
};
