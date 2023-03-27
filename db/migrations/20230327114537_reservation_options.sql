-- migrate:up
CREATE TABLE reservation_options(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dates_id INT NOT NULL,
    times_id INT NOT NULL,
    movies_id INT NOT NULL,
    cinema_names_id INT NOT NULL,
    screening_rooms_id INT NOT NULL,
    hall_types_id INT NOT NULL,
    CONSTRAINT date_id_fkey FOREIGN KEY (dates_id) REFERENCES dates(id),
    CONSTRAINT time_id_fkey FOREIGN KEY (times_id) REFERENCES times(id),
    CONSTRAINT moviesss_id_fkey FOREIGN KEY (movies_id) REFERENCES movies(id),
    CONSTRAINT cinema_name_id_fkey FOREIGN KEY (cinema_names_id) REFERENCES cinema_names(id),
    CONSTRAINT screening_room_id_fkey FOREIGN KEY (screening_rooms_id) REFERENCES screening_rooms(id),
    CONSTRAINT hall_type_id_fkey FOREIGN KEY (hall_types_id) REFERENCES hall_types(id)
)

-- migrate:down
DROP TABLE reservation_options