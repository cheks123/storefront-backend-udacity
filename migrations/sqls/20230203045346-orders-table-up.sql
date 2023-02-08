/* Replace with your SQL commands */

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    status VARCHAR(10) NOT NULL);