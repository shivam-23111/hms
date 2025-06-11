CREATE DATABASE IF NOT EXISTS hospitaldb;
USE hospitaldb;

-- ROLE table
CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

-- USER table
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  roleId INT NOT NULL,
  INDEX User_roleId_fkey (roleId),
  CONSTRAINT User_roleId_fkey FOREIGN KEY (roleId) REFERENCES role(id)
);

-- PATIENT table
CREATE TABLE patient (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  medicalhistory TEXT
);

-- APPOINTMENT table
CREATE TABLE appointment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patientId INT NOT NULL,
  userId INT NOT NULL,
  date DATETIME(0) NOT NULL,
  status TEXT,
  INDEX patientId (patientId),
  INDEX userId (userId),
  CONSTRAINT appointment_ibfk_1 FOREIGN KEY (patientId) REFERENCES patient(id) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT appointment_ibfk_2 FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE ON UPDATE NO ACTION
);
