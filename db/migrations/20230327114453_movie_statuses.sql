-- migrate:up
CREATE TABLE movie_statuses (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status VARCHAR(30) NOT NULL
)

-- migrate:down

DROP TABLE movie_statuses