-- migrate:up
CREATE TABLE times (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    start_time VARCHAR(50) NOT NULL
)

-- migrate:down
DROP TABLE times