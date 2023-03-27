-- migrate:up
CREATE TABLE screening_rooms (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  room_number INT NOT NULL
)

-- migrate:down

DROP TABLE screening_rooms