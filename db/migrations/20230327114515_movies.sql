-- migrate:up
CREATE TABLE movies (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    average_rating DECIMAL(5,1) NULL,
    grade INT NOT NULL,
    reservation_rate DECIMAL(5,1) NULL,
    running_time INT NOT NULL,
    opening_date VARCHAR(30) NOT NULL,
    closing_date VARCHAR(30) NOT NULL,
    movie_statuses_id INT NOt NULL,
    CONSTRAINT movie_status_id_fkey FOREIGN KEY (movie_statuses_id) REFERENCES movie_statuses(id)
)

-- migrate:down
DROP TABLE movies
