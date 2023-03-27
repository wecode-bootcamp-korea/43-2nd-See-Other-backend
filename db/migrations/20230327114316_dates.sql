-- migrate:up
CREATE TABLE dates (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    date VARCHAR(30) NOT NULL
)

-- migrate:down
DROP TABLE dates