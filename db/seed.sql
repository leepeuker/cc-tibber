CREATE TABLE executions
(
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT now(),
    commands INT NOT NULL,
    result INT NOT NULL,
    duration NUMERIC (7, 6)
);
