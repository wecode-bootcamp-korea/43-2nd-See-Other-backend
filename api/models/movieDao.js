const dbDataSource = require("./dataSource");

const getMovies = async (movieStatusesId, filter) => {
  return await dbDataSource.query(
    `SELECT
    DISTINCT(m.id), 
    m.name,
    m.korean_name AS koreanName,
    m.summary,
    m.average_rating AS averageRate, 
    m.grade, 
    m.reservation_rate AS reservationRate, 
    m.running_time AS runningTime, 
    m.opening_date AS openingDate, 
    m.closing_date AS closingDate, 
    m.movie_statuses_id AS movieStatusesId,
    JSON_ARRAYAGG(
      h.name
    ) AS hallTypes 
  FROM 
    movies AS m
    JOIN reservation_options AS r ON m.id = r.movies_id
    JOIN hall_types AS h ON r.hall_types_id = h.id 
  WHERE m.movie_statuses_id = ?
  GROUP BY m.id
  ORDER BY ${filter} DESC
;
`,
    [movieStatusesId]
  );
};

module.exports = {
  getMovies,
};
