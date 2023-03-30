-- migrate:up
ALTER TABLE movies
  ADD COLUMN korean_name VARCHAR(20) NOT NULL,
  ADD COLUMN summary VARCHAR(500) NOT NULL;

-- migrate:down
ALTER TABLE movies
  DROP COLUMN korean_name,
  DROP COLUMN summary;