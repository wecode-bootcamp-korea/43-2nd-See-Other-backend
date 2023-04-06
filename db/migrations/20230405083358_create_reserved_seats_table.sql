-- migrate:up
CREATE TABLE reserved_seats (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    seat VARCHAR(20) NOT NULL,
    orders_id INT NOT NULL,
    CONSTRAINT orders_id_fkey FOREIGN KEY (orders_id) REFERENCES orders(id),
    CONSTRAINT seat_orders_only UNIQUE (seat, orders_id)
)

-- migrate:down

DROP TABLE reserved_seats