/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    user_id BIGINT NOT NULL REFERENCES users(id),
    status VARCHAR(10) NOT NULL);