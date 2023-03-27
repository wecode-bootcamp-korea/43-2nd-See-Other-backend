-- migrate:up
CREATE TABLE movie_image_urls (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(300) NOT NULL,
    movies_id INT NOT NULL,
    CONSTRAINT movie_id_fkey FOREIGN KEY (movies_id) REFERENCES movies(id)
)

-- migrate:down
DROP TABLE movie_image_urls