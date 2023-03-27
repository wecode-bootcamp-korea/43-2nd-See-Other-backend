-- migrate:up
CREATE TABLE social_types (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  social_type VARCHAR(30) NOT NULL
)

-- migrate:down
DROP TABLE social_types