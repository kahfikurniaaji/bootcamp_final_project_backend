SELECT * FROM accounts;

SELECT * FROM employees;

TRUNCATE TABLE employees;

DROP TABLE accounts;

DROP TABLE employees;

CREATE TABLE
    employees(
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(20) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        gender VARCHAR(10) NOT NULL
    );

CREATE TABLE
    accounts(
        id VARCHAR(255) PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
    );