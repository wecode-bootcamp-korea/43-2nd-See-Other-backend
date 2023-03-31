const type = require("../utils/enum");

const movieOptionBuilder = (movie, cinemaName, hallType, date) => {
  const conditionList = [
    movie && `m.id = ${type.movieTypes[movie.toUpperCase()]}`,
    cinemaName && `c.id = ${type.cinemaNameTypes[cinemaName.toUpperCase()]}`,
    hallType && `h.id = ${type.hallTypeTypes[hallType.toUpperCase()]}`,
    date && `d.id = ${type.dateTypes[date.toUpperCase()]}`,
  ].filter(Boolean);

  const whereClause = conditionList.length
    ? `WHERE ${conditionList.join(" AND ")}`
    : "";

  return whereClause;
};

module.exports = { movieOptionBuilder };
