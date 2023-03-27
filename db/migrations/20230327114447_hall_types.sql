-- migrate:up
CREATE TABLE hall_types (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(12,4) NOT NULL,
    total_seats INT NOT NULL
)

-- migrate:down
DROP TABLE hall_types