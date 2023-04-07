const dbDataSource = require("./dataSource");

const getMovies = async (movieStatusesId, filter) => {
  return await dbDataSource.query(
    `SELECT
    DISTINCT(m.id), 
    m.name,
    m.korean_name AS koreanName,
    m.summary,
    mIU.image_url AS imageUrl,
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
    JOIN movie_image_urls AS mIU ON m.id = mIU.movies_id
  WHERE m.movie_statuses_id = ?
  GROUP BY
    m.id,
    m.name,
    m.korean_name,
    m.summary,
    mIU.image_url,
    m.average_rating,
    m.grade,
    m.reservation_rate,
    m.running_time,
    m.opening_date,
    m.closing_date,
    m.movie_statuses_id
  ORDER BY ${filter} DESC
;
`,
    [movieStatusesId]
  );
};
const getMoviedetails = async (movieId) => {
  return await dbDataSource.query(
    `
    SELECT movies.korean_name as koreanName, movies.name as englishName, movies.summary, movies.average_rating as averageRating, movies.reservation_rate as reservationRate, movie_image_urls.image_url as imageUrl
    FROM movies
    JOIN movie_image_urls
    ON movie_image_urls.movies_id = movies.id
    WHERE movies.id = ?
    `,
    [movieId]
  );
};

module.exports = {
  getMovies,
  getMoviedetails,
};
