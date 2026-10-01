-- ============================================================
-- Employee Management System - Database bootstrap script
-- ============================================================
-- This is OPTIONAL. Spring Data JPA (hibernate.ddl-auto=update)
-- will create the database and tables automatically the first
-- time you run the backend, using the URL parameter
-- "createDatabaseIfNotExist=true".
--
-- Use this script only if you prefer to create things manually,
-- or if your MySQL user does not have CREATE DATABASE privileges.
-- ============================================================

CREATE DATABASE IF NOT EXISTS ems_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE ems_db;

CREATE TABLE IF NOT EXISTS departments (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS employees (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name      VARCHAR(60)  NOT NULL,
    last_name       VARCHAR(60)  NOT NULL,
    email_id        VARCHAR(120) NOT NULL UNIQUE,
    phone_number    VARCHAR(20),
    gender          VARCHAR(10),
    date_of_birth   DATE,
    date_of_joining DATE NOT NULL,
    designation     VARCHAR(80),
    salary          DOUBLE,
    address         VARCHAR(255),
    status          VARCHAR(10) NOT NULL DEFAULT 'ACTIVE',
    department_id   BIGINT,
    CONSTRAINT fk_employee_department
        FOREIGN KEY (department_id) REFERENCES departments (id)
        ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS admins (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name   VARCHAR(100) NOT NULL,
    email_id    VARCHAR(120) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    role        VARCHAR(30)  DEFAULT 'ADMIN'
);

-- Default Admin User
INSERT INTO admins (full_name, email_id, password, role)
VALUES ('Avishkar Shinde', 'avishkarshinde0507@gmail.com', 'Avi_Shinde_0507', 'ADMIN')
ON DUPLICATE KEY UPDATE password = VALUES(password);

