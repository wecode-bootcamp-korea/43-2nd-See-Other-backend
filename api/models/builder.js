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

const upperWhereClauseBuilder = (movie, cinemaName, hallType, date) => {
  return `WHERE ro.movies_id = ${type.movieTypes[movie.toUpperCase()]}
    AND ro.cinema_names_id = ${type.cinemaNameTypes[cinemaName.toUpperCase()]}
    AND ro.hall_types_id = ${type.hallTypeTypes[hallType.toUpperCase()]}
    AND ro.dates_id = ${type.dateTypes[date.toUpperCase()]}
  `;
};

const lowerWhereClauseBuilder = (movie, cinemaName, hallType, date) => {
  return `WHERE m.id = ${type.movieTypes[movie.toUpperCase()]}
    AND r.cinema_names_id = ${type.cinemaNameTypes[cinemaName.toUpperCase()]}
    AND h.id = ${type.hallTypeTypes[hallType.toUpperCase()]}
    AND r.dates_id = ${type.dateTypes[date.toUpperCase()]}
  `;
};

module.exports = {
  movieOptionBuilder,
  upperWhereClauseBuilder,
  lowerWhereClauseBuilder,
};
