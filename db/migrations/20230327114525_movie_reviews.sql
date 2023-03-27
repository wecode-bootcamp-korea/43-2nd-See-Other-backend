-- migrate:up
CREATE TABLE movie_reviews (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    rating INT NOT NULL,
    comment VARCHAR(400) NOT NULL,
    movies_id INT NOT NULL, 
    users_id INT NOT NULL,
    CONSTRAINT movies_id_fkey FOREIGN KEY (movies_id) REFERENCES movies(id),
    CONSTRAINT user_id_fkey FOREIGN KEY (users_id) REFERENCES users(id),
    CONSTRAINT movie_reviews_only UNIQUE (movies_id, users_id)
)

-- migrate:down
DROP TABLE movie_reviews