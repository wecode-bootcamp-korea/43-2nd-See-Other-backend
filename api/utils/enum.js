const SocialType = Object.freeze({
  KAKAO: 1,
});

const movieTypes = Object.freeze({
  THEKID: 1,
  METROPOLIS: 2,
  SPIDERMAN: 3,
});

const cinemaNameTypes = Object.freeze({
  강남: 1,
  선릉: 2,
  일산: 3,
  수원: 4,
});

const hallTypeTypes = Object.freeze({
  IMAX: 1,
  SUITECINEMA: 2,
  CINEDECHEF: 3,
  STANDARD: 4,
});

const dateTypes = Object.freeze({
  "2023.4.7": 1,
  "2023.4.8": 2,
  "2023.4.9": 3,
});

const timeTypes = Object.freeze({
  "13:00": 1,
  "16:00": 2,
  "20:00": 3,
});

const screeningRoomTypes = Object.freeze({
  1: 1,
  2: 2,
  3: 3,
  4: 4,
});

module.exports = {
  SocialType,
  movieTypes,
  cinemaNameTypes,
  hallTypeTypes,
  dateTypes,
  timeTypes,
  screeningRoomTypes,
};
