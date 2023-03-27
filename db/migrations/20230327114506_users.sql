-- migrate:up
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  account_email VARCHAR(30) NOT NULL,
  nickname VARCHAR(30) NOT NULL,
  age_range VARCHAR(30) NOT NULL,
  social_id VARCHAR(30) NOT NULL,
  social_type_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT users_only UNIQUE (account_email)
);
-- migrate:down
DROP TABLE users;