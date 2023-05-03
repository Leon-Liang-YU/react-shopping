CREATE DATABASE studentcentre

CREATE TABLE items(
    id SERIAL PRIMARY KEY,
    title TEXT,
    describe TEXT,
    image_url TEXT,
    price integer,
    available integer

);

CREATE TABLE users(
    id SERIAL PRIMARY key,
    email TEXT,
    password_digest TEXT,
    address TEXT,
    credit integer
);