DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

\c employee_tracker_db

CREATE TABLE departments (
    id SERIAL PRIMARY KEY, 
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(100), 
    salary DECIMAL(10,2),
    department_id INTEGER, 
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL
);