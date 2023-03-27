-- migrate:up
CREATE TABLE cinema_names (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    regions_id INT NOT NULL,
    CONSTRAINT region_id_fkey FOREIGN KEY (regions_id) REFERENCES regions(id)
)

-- migrate:down
DROP TABLE cinema_names