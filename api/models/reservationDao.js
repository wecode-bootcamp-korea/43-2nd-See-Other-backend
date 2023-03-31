const dbDataSource = require("./dataSource");

const listMovieOptions = async (whereClause) => {
  return await dbDataSource.query(
    `SELECT
      r.movies_id AS id,
      m.name,
      m.korean_name AS koreanName,
      m.grade,
      mIU.image_url AS imageUrl
    FROM
      movies AS m
    JOIN reservation_options AS r ON r.movies_id = m.id
    JOIN cinema_names AS c ON r.cinema_names_id = c.id
    JOIN hall_types AS h ON r.hall_types_id = h.id
    JOIN dates AS d ON r.dates_id = d.id
    JOIN movie_image_urls AS mIU ON m.id = mIU.movies_id
    ${whereClause}
    GROUP BY r.movies_id, m.name, m.korean_name, m.grade, mIU.image_url
    `
  );
};

const listRegionOptions = async (whereClause) => {
  return await dbDataSource.query(
    `SELECT
      r.region,
      JSON_ARRAYAGG(distinct_cinemas.name) AS cinemaNames
    FROM (
      SELECT DISTINCT
        r.id AS region_id,
        r.region AS region,
        c.id AS cinema_id,
        c.name AS name
      FROM reservation_options AS ro
      JOIN cinema_names AS c ON c.id = ro.cinema_names_id
      JOIN movies AS m ON m.id = ro.movies_id
      JOIN hall_types AS h ON h.id = ro.hall_types_id
      JOIN dates AS d ON d.id = ro.dates_id
      JOIN regions AS r ON r.id = c.regions_id
      ${whereClause}
    ) AS distinct_cinemas 
    JOIN regions AS r ON r.id = distinct_cinemas.region_id
    GROUP BY r.region;
    `
  );
};

const listHallTypeOptions = async (whereClause) => {
  return await dbDataSource.query(
    `SELECT
      h.id,
      h.name
    FROM
      hall_types AS h
    JOIN reservation_options AS r ON r.hall_types_id = h.id
    JOIN movies AS m ON m.id = r.movies_id
    JOIN cinema_names AS c ON c.id = r.cinema_names_id
    JOIN dates AS d ON d.id = r.dates_id
    ${whereClause}
    GROUP BY h.id
    `
  );
};

const listDateOptions = async (whereClause) => {
  return await dbDataSource.query(
    `SELECT
      JSON_ARRAYAGG(d.date) AS dates
    FROM
      (
        SELECT DISTINCT
          d.id,
          d.date
        FROM dates AS d
        JOIN reservation_options AS ro ON d.id = ro.dates_id
        JOIN movies AS m ON m.id = ro.movies_id
        JOIN cinema_names AS c ON c.id = ro.cinema_names_id
        JOIN regions AS r ON r.id = c.regions_id
        JOIN hall_types AS h ON h.id = ro.hall_types_id
        ${whereClause}
      ) AS d
    `
  );
};

module.exports = {
  listMovieOptions,
  listRegionOptions,
  listHallTypeOptions,
  listDateOptions,
};
