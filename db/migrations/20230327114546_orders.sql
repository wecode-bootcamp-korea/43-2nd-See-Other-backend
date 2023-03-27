-- migrate:up
CREATE TABLE orders (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      reservation_number VARCHAR(30) NOT NULL, 
      seat_number VARCHAR(30) NOT NULL,
      order_statuses_id INT NOT NULL,
      reservation_options_id INT NOT NULL,
      users_id INT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT order_status_id_fkey FOREIGN KEY (order_statuses_id) REFERENCES order_statuses(id),
      CONSTRAINT reservation_option_id_fkey FOREIGN KEY (reservation_options_id) REFERENCES reservation_options(id),
      CONSTRAINT users_id_fkey FOREIGN KEY (users_id) REFERENCES users(id),
      CONSTRAINT reservation_number_only UNIQUE (reservation_number),
      CONSTRAINT seat_number_reservation_options_only UNIQUE (seat_number, reservation_options_id)

)

-- migrate:down

DROP TABLE orders