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

const listTimes = async (upperWhereClause, lowerWhereClause) => {
  return await dbDataSource.query(
    `SELECT
      s.room_number AS screeningRooms,
      h.name AS hallTypes,
      h.total_seats AS totalSeats,
      m.running_time AS runningTime,
      (SELECT JSON_ARRAYAGG(JSON_OBJECT(
        'startTime', jt.start_time,
        'remainingSeats', jt.remaining_seats
      )) AS times
    FROM (
      SELECT t.start_time, h.total_seats - COALESCE(COUNT(rs.orders_id), 0) AS remaining_seats
      FROM times AS t
    LEFT JOIN reservation_options ro ON ro.times_id = t.id
    LEFT JOIN hall_types h ON h.id = ro.hall_types_id
    LEFT JOIN orders o ON o.reservation_options_id = ro.id
    LEFT JOIN reserved_seats rs ON rs.orders_id = o.id
    ${upperWhereClause}
    GROUP BY t.start_time, h.total_seats
          ) AS jt) AS times
    FROM
      reservation_options AS r
    JOIN hall_types AS h ON h.id = r.hall_types_id
    JOIN movies AS m ON m.id = r.movies_id
    JOIN times AS t ON t.id = r.times_id
    JOIN screening_rooms AS s ON r.screening_rooms_id = s.id
    ${lowerWhereClause}
    GROUP by s.room_number
    `
  );
};

const listSeatOptions = async (whereClause) => {
  return await dbDataSource.query(
    `SELECT
        (SELECT
          id
        FROM
          reservation_options AS ro
        ${whereClause}) AS id,
        h.total_seats AS totalSeats,
        h.total_seats - COALESCE(COUNT(rs.orders_id), 0) AS remainingSeats,
        JSON_ARRAYAGG(rs.seat) AS reservedSeats,
        h.price AS price
    FROM reservation_options AS ro
    JOIN hall_types AS h ON h.id = ro.hall_types_id
    LEFT JOIN orders AS o ON o.reservation_options_id = ro.id
    LEFT JOIN reserved_seats AS rs ON rs.orders_id = o.id
    ${whereClause}
    GROUP BY ro.id;
    `
  );
};

module.exports = {
  listMovieOptions,
  listRegionOptions,
  listHallTypeOptions,
  listDateOptions,
  listTimes,
  listSeatOptions,
};
