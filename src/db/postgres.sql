SELECT * FROM employees;

SELECT * FROM accounts;

SELECT * FROM profiles;

SELECT * FROM images;

SELECT * FROM roles;

SELECT * FROM jobs;

SELECT * FROM attendances;

TRUNCATE TABLE employees;

TRUNCATE accounts;

TRUNCATE profiles;

TRUNCATE images;

TRUNCATE roles;

TRUNCATE jobs;

TRUNCATE attendances;

DROP TABLE employees;

DROP TABLE accounts;

DROP TABLE profiles;

DROP TABLE images;

DROP TABLE roles;

DROP TABLE jobs;

DROP TABLE attendances;

CREATE TABLE
    employees(
        id VARCHAR NOT NULL PRIMARY KEY,
        job_id VARCHAR NOT NULL,
        hire_date DATE NOT NULL,
        resign_date DATE
    );

CREATE TABLE
    accounts(
        id VARCHAR NOT NULL PRIMARY KEY,
        role_id VARCHAR NOT NULL,
        username VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL
    );

CREATE TABLE
    profiles(
        id VARCHAR NOT NULL PRIMARY KEY,
        image_id VARCHAR UNIQUE,
        name VARCHAR NOT NULL,
        gender VARCHAR NOT NULL,
        birth_date DATE NOT NULL,
        phone VARCHAR UNIQUE NOT NULL,
        email VARCHAR UNIQUE,
        address VARCHAR NOT NULL
    );

CREATE TABLE
    images(
        id VARCHAR NOT NULL PRIMARY KEY,
        url VARCHAR NOT NULL UNIQUE
    );

CREATE TABLE
    roles(
        id VARCHAR NOT NULL PRIMARY KEY,
        name VARCHAR NOT NULL UNIQUE
    );

CREATE TABLE
    jobs(
        id VARCHAR NOT NULL PRIMARY KEY,
        name VARCHAR UNIQUE NOT NULL,
        salary BIGINT NOT NULL
    );

CREATE TABLE
    attendances(
        id VARCHAR NOT NULL PRIMARY KEY,
        employee_id VARCHAR NOT NULL,
        time_in TIMESTAMP,
        time_out TIMESTAMP,
        status VARCHAR NOT NULL,
        shift VARCHAR NOT NULL,
        notes TEXT
    );